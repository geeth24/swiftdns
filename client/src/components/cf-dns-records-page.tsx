'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DNSRecords } from '@/typings/dns';
import CFDNSRecords from '@/components/cf-dns-records';
import { useAuth } from '@/context/AuthContext';
import { useUserRecordData } from '@/context/UserRecordDataContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type CFDNSRecordsPageProps = {
  id: string;
};

function CFDNSRecordsPage({ id }: CFDNSRecordsPageProps) {
  const [records, setRecords] = React.useState<DNSRecords>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useAuth();
  const { getUserRecordData } = useUserRecordData();

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        if (user) {
          const userRecords = await getUserRecordData(user?.uid as string, 'cf');
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('api-token', userRecords?.token as string);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cf/zones/${id}/dns_records`,
            { method: 'GET', headers, cache: 'no-cache' },
          );
          if (!response.ok) throw new Error('Failed to fetch records');
          const data = await response.json();
          setRecords(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [id]);

  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link
            href="/providers/cf"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" strokeWidth={1.5} />
            Zones
          </Link>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span className="truncate">zone · {id}</span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            {loading ? 'loading' : `${records.length} records`}
          </span>
        </div>

        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ Records
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              The <span className="italic text-primary">full</span> table.
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="border-l-2 border-destructive bg-destructive/5 px-4 py-3 font-mono text-xs text-destructive">
            ! {error}
          </div>
        ) : (
          <CFDNSRecords records={records} />
        )}
      </section>
    </main>
  );
}

export default CFDNSRecordsPage;
