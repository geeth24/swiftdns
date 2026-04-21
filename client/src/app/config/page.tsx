'use client';

import React, { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon, PlusIcon, ShieldIcon, Trash2Icon, SaveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useUserRecordData } from '@/context/UserRecordDataContext';

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
  const [saving, setSaving] = useState(false);
  const [newIp, setNewIp] = useState('');

  useEffect(() => {
    if (user) {
      getIPAddresses(user.uid).then((ips) => {
        setIpAddresses(ips);
        setLoading(false);
      });
      getUserRecordData(user.uid, 'cf').then((data) => {
        if (data) {
          setEmail(data.email || '');
          setApiKey(data.apikey || '');
          setToken(data.token || '');
        }
      });
    }
  }, [user]);

  const createCFToken = async () => {
    setSaving(true);
    setError(null);
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
    } finally {
      setSaving(false);
    }
  };

  const handleAddIP = () => {
    if (user && newIp) {
      addIPAddress(user.uid, newIp);
      setNewIp('');
      getIPAddresses(user.uid).then(setIpAddresses);
    }
  };

  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>§ Config</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>Cloudflare · credentials + presets</span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${token ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
            {token ? 'Token configured' : 'Not configured'}
          </span>
        </div>

        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ 01 — credentials
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              Link your <span className="italic text-primary">Cloudflare</span> account.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              SwiftDNS exchanges your API key for a scoped DNS token. The token is the only
              thing stored — and only in your own Firebase profile.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="rounded-lg border border-border/60 bg-card p-6">
              <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>api · cloudflare</span>
                <span>encrypted at rest</span>
              </div>

              <div className="space-y-5">
                <FieldRow label="Email" htmlFor="cf-email">
                  <Input
                    id="cf-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </FieldRow>

                <FieldRow label="Global API key" htmlFor="cf-key">
                  <div className="relative">
                    <Input
                      id="cf-key"
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="••••••••••••••••"
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
                </FieldRow>

                {token && (
                  <FieldRow label="Scoped token" htmlFor="cf-token">
                    <div className="relative">
                      <Input
                        id="cf-token"
                        readOnly
                        type={showToken ? 'text' : 'password'}
                        value={token}
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
                  </FieldRow>
                )}

                <Button
                  onClick={createCFToken}
                  disabled={saving || !email || !apiKey}
                  className="h-11 w-full rounded-full font-mono text-xs uppercase tracking-[0.18em]"
                >
                  <SaveIcon className="mr-2 size-4" strokeWidth={1.5} />
                  {saving ? 'Generating…' : 'Generate scoped token'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t border-border/60 pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ 02 — IP presets
            </p>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              Save the IPs <br />
              you use <span className="italic text-primary">again and again.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your home IP, your server IP, your Railway deploy. Save them once, select them
              from a dropdown when adding records.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-border/60 bg-card p-5">
              <Label
                htmlFor="new-ip"
                className="mb-3 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                Add address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="new-ip"
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                  placeholder="192.0.2.42"
                  className="h-10 flex-1 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                />
                <Button
                  onClick={handleAddIP}
                  disabled={!newIp}
                  size="sm"
                  className="h-10 rounded-full px-4 font-mono text-xs uppercase tracking-[0.18em]"
                >
                  <PlusIcon className="mr-1 size-4" strokeWidth={1.5} />
                  Add
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border/60 bg-card">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Saved addresses</span>
                <span>{ipAddresses.length} total</span>
              </div>
              {loading ? (
                <div className="p-6 font-mono text-[11px] text-muted-foreground">Loading…</div>
              ) : ipAddresses.length > 0 ? (
                <ul className="divide-y divide-border/60">
                  {ipAddresses.map((ip, i) => (
                    <li
                      key={ip}
                      className="flex items-center justify-between px-4 py-3 font-mono text-[13px]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <ShieldIcon className="size-3.5 text-primary" strokeWidth={1.5} />
                        <span className="text-foreground">{ip}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center font-serif text-sm italic text-muted-foreground">
                  No addresses yet — add one above.
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-10 border-l-2 border-destructive bg-destructive/5 px-4 py-3 font-mono text-xs text-destructive">
            ! {error}
          </div>
        )}
      </section>
    </main>
  );
}

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}
