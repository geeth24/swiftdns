'use client';

import React, { useState, useEffect } from 'react';
import { PlusIcon, RefreshCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { DNSRecord, DNSType, useUserRecordData } from '@/context/UserRecordDataContext';

export default function DNSManagement() {
  const { user } = useAuth();
  const { getDNSRecords, addDNSRecord, updateDNSRecord, getDNSTypes, addDNSType } =
    useUserRecordData();
  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([]);
  const [dnsTypes, setDnsTypes] = useState<DNSType[]>([]);
  const [newRecord, setNewRecord] = useState<DNSRecord>({ type: '', name: '', value: '' });
  const [newDNSType, setNewDNSType] = useState<DNSType>({ type: 'A' });

  useEffect(() => {
    const fetchDNSData = async () => {
      if (user) {
        const records = await getDNSRecords(user.uid);
        const types = await getDNSTypes();
        setDnsRecords(records);
        setDnsTypes(types);
      }
    };
    fetchDNSData();
  }, [user]);

  const handleAddDNSRecord = async () => {
    if (user && newRecord.type && newRecord.name) {
      await addDNSRecord(user.uid, newRecord);
      setNewRecord({ type: '', name: '', value: '' });
      setDnsRecords(await getDNSRecords(user.uid));
    }
  };

  const handleAddDNSType = async () => {
    if (user && newDNSType.type) {
      await addDNSType(newDNSType);
      setNewDNSType({ type: '' });
      setDnsTypes(await getDNSTypes());
    }
  };

  const handleUpdateDNSRecord = async (id: string) => {
    if (user) {
      await updateDNSRecord(user.uid, id, { value: 'new-value' });
      setDnsRecords(await getDNSRecords(user.uid));
    }
  };

  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>§ Records · local</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>provider-agnostic draft store</span>
          <span className="ml-auto">{dnsRecords.length} records</span>
        </div>

        <div className="mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            ¶ DNS
          </p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Draft records <br />
            before you <span className="italic text-primary">commit.</span>
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Panel title="¶ 01 — new type" subtitle="Register a custom record type.">
              <div className="space-y-4">
                <StackField label="Type code">
                  <Input
                    value={newDNSType.type}
                    onChange={(e) =>
                      setNewDNSType({
                        type: e.target.value as '' | 'A' | 'CNAME' | 'AAAA' | 'TXT',
                      })
                    }
                    placeholder="A · CNAME · AAAA · TXT"
                    className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </StackField>
                <Button
                  onClick={handleAddDNSType}
                  size="sm"
                  className="h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                >
                  <PlusIcon className="mr-1.5 size-4" strokeWidth={1.5} />
                  Add type
                </Button>
              </div>
            </Panel>

            <Panel title="¶ 02 — new record" subtitle="Save a draft record locally.">
              <div className="space-y-4">
                <StackField label="Type">
                  <Select
                    value={newRecord.type}
                    onValueChange={(v) => setNewRecord({ ...newRecord, type: v })}
                  >
                    <SelectTrigger className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus:ring-0">
                      <SelectValue placeholder="Select" />
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
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                    placeholder="www"
                    className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </StackField>
                <StackField label="Value">
                  <Input
                    value={newRecord.value}
                    onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                    placeholder="192.0.2.42"
                    className="h-10 rounded-none border-0 border-b border-border/80 bg-transparent px-0 font-mono text-[13px] shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </StackField>
                <Button
                  onClick={handleAddDNSRecord}
                  size="sm"
                  className="h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                >
                  <PlusIcon className="mr-1.5 size-4" strokeWidth={1.5} />
                  Add record
                </Button>
              </div>
            </Panel>
          </div>

          <Panel title="¶ 03 — stored" subtitle={`${dnsRecords.length} draft records.`}>
            {dnsRecords.length === 0 ? (
              <div className="py-8 text-center font-serif text-sm italic text-muted-foreground">
                No records yet.
              </div>
            ) : (
              <ul className="divide-y divide-border/60">
                {dnsRecords.map((record) => (
                  <li
                    key={record.id}
                    className="flex items-center justify-between gap-3 py-3 font-mono text-[12px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex min-w-[44px] justify-center rounded border border-border bg-background px-1.5 py-0.5 text-[10px] tracking-wider">
                        {record.type}
                      </span>
                      <span className="text-foreground">{record.name}</span>
                      <span className="text-muted-foreground">→ {record.value}</span>
                    </div>
                    <Button
                      onClick={() => handleUpdateDNSRecord(record.id!)}
                      variant="ghost"
                      size="sm"
                      className="h-7 rounded-full px-2 font-mono text-[10px] uppercase tracking-[0.18em]"
                    >
                      <RefreshCcwIcon className="mr-1 size-3" strokeWidth={1.5} />
                      Update
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </section>
    </main>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-6">
      <div className="mb-5 border-b border-border/60 pb-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/80">{subtitle}</p>
      </div>
      {children}
    </div>
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
