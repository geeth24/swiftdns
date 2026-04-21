import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Zone } from '@/typings/zone';

interface ZoneCardProps {
  zone: Zone;
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  const live = zone.status === 'active' && !zone.paused;
  const created = new Date(zone.created_on).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/providers/cf/${zone.id}`}>
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span
                className={`size-1.5 rounded-full ${
                  live ? 'bg-primary' : 'bg-muted-foreground/40'
                }`}
              />
              {zone.paused ? 'paused' : zone.status}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {zone.type}
            </span>
          </div>

          <h3 className="mb-1 truncate font-serif text-3xl leading-tight tracking-tight text-foreground">
            {zone.name}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {zone.account.name}
          </p>
        </div>

        <div className="mt-6 space-y-2 border-t border-border/60 pt-4 font-mono text-[11px]">
          <Row label="plan" value={zone.plan.name} />
          <Row label="owner" value={zone.owner.name || '—'} />
          <Row label="created" value={created} />
          <Row label="ns" value={`${zone.name_servers?.[0] ?? 'cloudflare'}`} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Open records
          </span>
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            strokeWidth={1.5}
          />
        </div>
      </article>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="truncate text-foreground">{value}</span>
    </div>
  );
}
