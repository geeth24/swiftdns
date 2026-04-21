'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, PlusIcon, SettingsIcon, ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ZoneCards from '@/components/zone-cards';
import { useAuth } from '@/context/AuthContext';
import { DNSType, useUserRecordData } from '@/context/UserRecordDataContext';
import { Zone } from '../../../typings/zone';

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
  const [search, setSearch] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDNSRecord(dnsRecord);
    setQuickSheetOpen(false);
  };

  useEffect(() => {
    const fetchZones = async () => {
      setLoading(true);
      if (user) {
        try {
          const records = await getUserRecordData(user.uid, 'cf');
          if (records) {
            setEmail(records.email ?? '');
            setApiKey(records.apikey ?? '');
            setToken(records.token ?? '');
          }
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('api-token', records?.token as string);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cf/zones`, {
            method: 'GET',
            headers,
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          setZones(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchZones();
    getDNSTypes().then(setDnsTypes);
    if (user) {
      getIPAddresses(user.uid).then(setIpAddresses);
    }
  }, [user]);

  const createCFToken = async (email: string, apiKey: string) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('api-email', email);
      headers.append('api-key', apiKey);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cf/user/tokens`, {
        method: 'POST',
        headers,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (user) {
        createUserRecordData(user.uid, 'cf', { email, apikey: apiKey, token: data.value });
      }
      setToken(data.value);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addDNSRecord = async (record: any) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('api-token', token);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cf/zones/${record.zone}/dns_records`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            type: record.type,
            name: record.name,
            content: record.content,
            ttl: record.ttl,
            proxied: record.proxied,
          }),
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      router.push(`/providers/cf/${record.zone}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filtered = zones.filter((z) =>
    z.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>§ Cloudflare · zones</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>Issue 02 · 2026</span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                token ? 'bg-primary' : 'bg-muted-foreground/40'
              }`}
            />
            {token ? `${zones.length} zones` : 'Not configured'}
          </span>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ Zones
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Every domain, <br />
              <span className="italic text-primary">at a glance.</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Sheet open={quickSheetOpen} onOpenChange={setQuickSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                >
                  <ZapIcon className="mr-1.5 size-3.5" strokeWidth={1.5} />
                  Quick record
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader className="space-y-2 border-b border-border/60 pb-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    § Quick · new record
                  </p>
                  <SheetTitle className="font-serif text-3xl leading-tight">
                    Add a <span className="italic text-primary">record.</span>
                  </SheetTitle>
                  <SheetDescription className="font-mono text-[11px]">
                    Push a new record directly to Cloudflare.
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <StackField label="Type">
                    <Select
                      onValueChange={(v) => setDnsRecord((p) => ({ ...p, type: v }))}
                      defaultValue={dnsRecord.type}
                    >
                      <SelectTrigger className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus:ring-0">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dnsTypes.map((t) => (
                          <SelectItem key={t.type} value={t.type}>
                            {t.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </StackField>

                  <StackField label="Name">
                    <Input
                      id="name"
                      name="name"
                      value={dnsRecord.name}
                      onChange={handleInputChange}
                      placeholder="www"
                      className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                    />
                  </StackField>

                  <StackField label="Content">
                    {dnsRecord.type === 'CNAME' ? (
                      <Input
                        id="content"
                        name="content"
                        value={dnsRecord.content}
                        onChange={handleInputChange}
                        placeholder="example.com"
                        className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                      />
                    ) : (
                      <Select
                        onValueChange={(v) =>
                          setDnsRecord((p) => ({ ...p, content: v }))
                        }
                        defaultValue={dnsRecord.content}
                      >
                        <SelectTrigger className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus:ring-0">
                          <SelectValue placeholder="Select saved IP" />
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
                  </StackField>

                  <StackField label="Zone">
                    <Select
                      onValueChange={(v) => setDnsRecord((p) => ({ ...p, zone: v }))}
                      defaultValue={dnsRecord.zone}
                    >
                      <SelectTrigger className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus:ring-0">
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map((z) => (
                          <SelectItem key={z.id} value={z.id}>
                            {z.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </StackField>

                  <StackField label="TTL · 1 = auto">
                    <Input
                      id="ttl"
                      name="ttl"
                      type="number"
                      value={dnsRecord.ttl}
                      onChange={handleInputChange}
                      min={1}
                      className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                    />
                  </StackField>

                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <Label
                      htmlFor="proxied"
                      className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                    >
                      Proxied
                    </Label>
                    <Switch
                      id="proxied"
                      checked={dnsRecord.proxied}
                      onCheckedChange={(c) => setDnsRecord((p) => ({ ...p, proxied: c }))}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-full font-mono text-xs uppercase tracking-[0.18em]"
                  >
                    <PlusIcon className="mr-1.5 size-4" strokeWidth={1.5} />
                    Add record
                  </Button>
                </form>
              </SheetContent>
            </Sheet>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-full border-border/60 px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                >
                  <SettingsIcon className="mr-1.5 size-3.5" strokeWidth={1.5} />
                  Creds
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader className="space-y-2 border-b border-border/60 pb-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    § Credentials
                  </p>
                  <SheetTitle className="font-serif text-3xl leading-tight">
                    Cloudflare <span className="italic text-primary">link.</span>
                  </SheetTitle>
                  <SheetDescription className="font-mono text-[11px]">
                    Email + global key → scoped DNS token.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-5">
                  <StackField label="Email">
                    <Input
                      id="settings-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                    />
                  </StackField>
                  <StackField label="API key">
                    <div className="relative">
                      <Input
                        id="settings-key"
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 pr-8 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                      >
                        {showApiKey ? (
                          <EyeOffIcon className="size-4" strokeWidth={1.5} />
                        ) : (
                          <EyeIcon className="size-4" strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </StackField>
                  {token && (
                    <StackField label="Token">
                      <div className="relative">
                        <Input
                          id="settings-token"
                          type={showToken ? 'text' : 'password'}
                          value={token}
                          readOnly
                          className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 pr-8 font-mono text-[13px] text-primary shadow-none focus-visible:border-primary focus-visible:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() => setShowToken(!showToken)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                        >
                          {showToken ? (
                            <EyeOffIcon className="size-4" strokeWidth={1.5} />
                          ) : (
                            <EyeIcon className="size-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </StackField>
                  )}
                  <Button
                    onClick={() => createCFToken(email, apiKey)}
                    className="h-11 w-full rounded-full font-mono text-xs uppercase tracking-[0.18em]"
                  >
                    Save + generate
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4 border-b border-border/60 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Filter
          </span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="example.com"
            className="h-8 flex-1 rounded-none border-0 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:ring-0"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {filtered.length} / {zones.length}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : filtered.length > 0 ? (
          <ZoneCards zones={filtered} />
        ) : (
          <div className="rounded-lg border border-dashed border-border/60 p-12 text-center">
            <p className="font-serif text-2xl italic text-muted-foreground">
              {zones.length === 0
                ? 'No zones linked yet.'
                : 'Nothing matches that filter.'}
            </p>
            {error && (
              <p className="mt-3 font-mono text-[11px] text-destructive">! {error}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function StackField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
