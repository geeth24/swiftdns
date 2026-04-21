import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DNSRecords } from '../typings/dns';

export default function CFDNSRecords({ records }: { records: DNSRecords }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          {records.length} records
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          live · cloudflare
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead className="h-9 w-[72px] font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Type
            </TableHead>
            <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Name
            </TableHead>
            <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Target
            </TableHead>
            <TableHead className="h-9 w-[72px] text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              TTL
            </TableHead>
            <TableHead className="h-9 w-[80px] text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Proxied
            </TableHead>
            <TableHead className="h-9 w-[110px] text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="border-border/40 hover:bg-muted/40">
              <TableCell className="py-2.5">
                <span className="inline-flex min-w-[44px] justify-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-foreground">
                  {record.type}
                </span>
              </TableCell>
              <TableCell className="py-2.5 font-mono text-[13px] text-foreground">
                {record.name}
              </TableCell>
              <TableCell className="max-w-[280px] truncate py-2.5 font-mono text-[13px] text-muted-foreground">
                {record.content}
              </TableCell>
              <TableCell className="py-2.5 text-right font-mono text-[11px] text-muted-foreground">
                {record.ttl === 1 ? 'auto' : record.ttl}
              </TableCell>
              <TableCell className="py-2.5 text-right font-mono text-[11px]">
                <span
                  className={
                    record.proxied ? 'text-primary' : 'text-muted-foreground/60'
                  }
                >
                  {record.proxied ? '● on' : '○ off'}
                </span>
              </TableCell>
              <TableCell className="py-2.5 text-right font-mono text-[11px] text-muted-foreground">
                {new Date(record.created_on).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
