'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useUserRecordData } from '@/context/UserRecordDataContext';
import { EyeOffIcon, EyeIcon, PlusCircleIcon, SaveIcon, ShieldIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function CloudflareConfigPage() {
  const { user } = useAuth();
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);
  const { createUserRecordData, getUserRecordData, addIPAddress, getIPAddresses } =
    useUserRecordData();
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newIp, setNewIp] = useState('');

  useEffect(() => {
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
        setLoading(false);
      });
    }
  }, [user, getIPAddresses]);

  useEffect(() => {
    if (user) {
      getUserRecordData(user.uid, 'cf').then((data) => {
        if (data) {
          setEmail(data.email || '');
          setApiKey(data.apikey || '');
          setToken(data.token || '');
        }
      });
    }
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
      });
    }
  }, [user, getUserRecordData, getIPAddresses]);

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

  const handleAddIP = () => {
    if (user && newIp) {
      addIPAddress(user.uid, newIp);
      setNewIp('');
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
      });
    }
  };

  return (
    <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="">
        <div className="mb-8 flex-col items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
            Cloudflare Configuration
          </h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cloudflare Credentials</CardTitle>
              <CardDescription>Enter your Cloudflare account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Cloudflare email"
                  />
                </div>
                <div className="relative space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    required
                    type={showApiKey ? 'text' : 'password'}
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-7 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">{showApiKey ? 'Hide API key' : 'Show API key'}</span>
                  </Button>
                </div>
                {token && (
                  <div className="relative space-y-2">
                    <Label htmlFor="token">Token</Label>
                    <Input
                      id="token"
                      required
                      type={showToken ? 'text' : 'password'}
                      placeholder="Your token"
                      value={token}
                      readOnly
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-7 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowToken(!showToken)}
                    >
                      {showToken ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">{showToken ? 'Hide token' : 'Show token'}</span>
                    </Button>
                  </div>
                )}
                <Button onClick={() => createCFToken(email, apiKey)} className="w-full">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save and Generate Token
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IP Addresses</CardTitle>
              <CardDescription>Manage your allowed IP addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter new IP address"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                  />
                  <Button onClick={handleAddIP}>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Add IP
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Allowed IP Addresses</Label>
                  {loading ? (
                    <p>Loading...</p>
                  ) : ipAddresses.length > 0 ? (
                    <ul className="space-y-1">
                      {ipAddresses.map((ip) => (
                        <li key={ip} className="flex items-center space-x-2">
                          <ShieldIcon className="h-4 w-4 text-green-500" />
                          <span>{ip}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No IP addresses added yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-red-800">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
