'use client';

import React, { useEffect, useState } from 'react';
import ZoneCards from '@/components/zone-cards';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Zone } from '../../../../typings/zone';
import { Button } from '@/components/ui/button';
import { GearIcon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DNSType, useUserRecordData } from '@/context/UserRecordDataContext';
import { EyeOffIcon, EyeIcon, PlusIcon } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import SwiftDNSLogo from '@/components/swiftdns-logo';

export default function Page() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { createUserRecordData, getUserRecordData, getDNSTypes, getIPAddresses } =
    useUserRecordData();
  const [isOpen, setIsOpen] = useState(false);
  const [quickSheetOpen, setQuickSheetOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [dnsTypes, setDnsTypes] = useState<DNSType[]>([]);
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);

  const [dnsRecord, setDnsRecord] = useState({
    type: 'CNAME',
    name: '',
    content: '',
    ttl: 1,
    proxied: false,
    zone: '',
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDnsRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setDnsRecord((prev) => ({ ...prev, type: value }));
  };

  const handleSelectZoneChange = (value: string) => {
    setDnsRecord((prev) => ({ ...prev, zone: value }));
  };

  const handleSelectContentChange = (value: string) => {
    setDnsRecord((prev) => ({ ...prev, content: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setDnsRecord((prev) => ({ ...prev, proxied: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(dnsRecord);
    addDNSRecord(dnsRecord);
    setQuickSheetOpen(false);
  };

  useEffect(() => {
    const fetchZones = async () => {
      setLoading(true);
      if (user) {
        try {
          let records = await getUserRecordData(user?.uid as string, 'cf');

          if (records) {
            setRecordsToState(records);
          }
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          console.log('Token:', token);
          headers.append('api-token', records?.token as string);
          let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cf/zones`, {
            method: 'GET',
            headers: headers,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setZones(data);
        } catch (error: any) {
          console.error('Fetch error:', error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user found');
        setLoading(false);
      }
    };

    fetchZones();
    getDNSTypes().then((types) => setDnsTypes(types));
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
      });
    }
  }, [user]);

  const setRecordsToState = (data: any) => {
    setEmail(data.email);
    setApiKey(data.apikey);
    setToken(data.token);
  };

  const createCFToken = async (email: string, apiKey: string) => {
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('api-email', email);
      headers.append('api-key', apiKey);
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cf/user/tokens`, {
        method: 'POST',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (user) {
        createUserRecordData(user.uid, 'cf', { email, apikey: apiKey, token: data.value });
      }
      setToken(data.value);
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      setError(error.message);
    }
  };

  const addDNSRecord = async (record: any) => {
    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('api-token', token);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cf/zones/${record.zone}/dns_records`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            type: record.type,
            name: record.name,
            content: record.content,
            ttl: record.ttl,
            proxied: record.proxied,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      router.push(`/providers/cf/${record.zone}`);
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
            Cloudflare Zones
          </h1>
          <div className="flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="lg">
                  <GearIcon className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Add your email API key here. This key will be used for email notifications.
                  </SheetDescription>
                </SheetHeader>
                <div className="mb-2 space-y-2">
                  <Label htmlFor="email-api-key" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                  />
                </div>
                <div className="relative mb-2 space-y-2">
                  <Label htmlFor="api-key" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    required
                    type={showApiKey ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-2 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showApiKey ? 'Hide API key' : 'Show API key'}</span>
                  </Button>
                </div>
                {token && (
                  <div className="relative space-y-2">
                    <Label htmlFor="api-key" className="text-right">
                      Token
                    </Label>
                    <Input
                      id="api-key"
                      required
                      type={showToken ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-2 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowToken(!showToken)}
                    >
                      {showToken ? (
                        <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showToken ? 'Hide token' : 'Show token'}</span>
                    </Button>
                  </div>
                )}
                <div className="flex flex-col">
                  <Button onClick={() => createCFToken(email, apiKey)} className="mt-4">
                    Save
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={quickSheetOpen} onOpenChange={setQuickSheetOpen}>
              <SheetTrigger asChild>
                <Button size="lg" variant="outline">
                  <SwiftDNSLogo className="w-24" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>SwiftDNS</SheetTitle>
                  <SheetDescription>
                    Quickly add a new DNS record to your Cloudflare account.
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={handleSelectChange} defaultValue={dnsRecord.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dnsTypes.map((type) => (
                          <SelectItem key={type.type} value={type.type}>
                            {type.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={dnsRecord.name}
                      onChange={handleInputChange}
                      placeholder="e.g. www"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>

                    {dnsRecord.type === 'CNAME' ? (
                      <Input
                        id="content"
                        name="content"
                        value={dnsRecord.content}
                        onChange={handleInputChange}
                        placeholder="e.g. example.com"
                      />
                    ) : (
                      <Select
                        onValueChange={handleSelectContentChange}
                        defaultValue={dnsRecord.content}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select record content" />
                        </SelectTrigger>
                        <SelectContent>
                          {ipAddresses.map((ip) => (
                            <SelectItem key={ip} value={ip}>
                              {ip}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Zone</Label>
                    <Select onValueChange={handleSelectZoneChange} defaultValue={dnsRecord.zone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select record content" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ttl">TTL</Label>
                    <Input
                      id="ttl"
                      name="ttl"
                      type="number"
                      value={dnsRecord.ttl}
                      onChange={handleInputChange}
                      min="1"
                    />
                    <p className="text-sm text-muted-foreground">1 is auto</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="proxied"
                      checked={dnsRecord.proxied}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="proxied">Proxied</Label>
                  </div>
                  <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Add DNS Record
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {zones.length > 0 ? (
              <ZoneCards zones={zones} />
            ) : (
              <>
                <div className="text-muted-foreground">No zones found</div>
                {error && <div className="text-muted-foreground">{error}</div>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
