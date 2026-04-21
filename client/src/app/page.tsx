import Link from 'next/link';
import { ArrowUpRight, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const records = [
  { type: 'A', name: '@', content: '192.0.2.42', ttl: 'auto', proxied: true },
  { type: 'A', name: 'api', content: '192.0.2.42', ttl: 'auto', proxied: true },
  { type: 'CNAME', name: 'www', content: 'cname.vercel-dns.com', ttl: '300', proxied: false },
  { type: 'MX', name: '@', content: 'aspmx.l.google.com', ttl: '3600', proxied: false },
  { type: 'TXT', name: '_dmarc', content: 'v=DMARC1; p=reject;', ttl: 'auto', proxied: false },
];

const presets = [
  { label: 'home', value: '192.0.2.42', count: 7 },
  { label: 'prod-api', value: '203.0.113.9', count: 3 },
  { label: 'vercel', value: 'cname.vercel-dns.com', count: 12 },
  { label: 'gsuite', value: 'aspmx.l.google.com', count: 9 },
];

const columns = [
  {
    id: '01',
    kicker: 'PRESETS',
    title: 'Save it once.',
    body: 'Every IP, CNAME target, and MX host you use more than once lives in a named preset. Apply it to any zone with a click.',
  },
  {
    id: '02',
    kicker: 'MULTI-ZONE',
    title: 'Push to many.',
    body: 'Own ten domains? Route the same MX and SPF records across all of them in one motion. Diff before you commit.',
  },
  {
    id: '03',
    kicker: 'INSTANT',
    title: 'See it propagate.',
    body: 'Cloudflare pushes global in seconds. Watch the record go live, then move on with your afternoon.',
  },
];

export default function Page() {
  return (
    <main className="relative overflow-hidden bg-background pt-16 text-foreground">
      <GridBackdrop />

      <section className="relative mx-auto max-w-[1320px] px-6 pb-24 pt-12 lg:px-12 lg:pt-20">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Issue 02 · 2026</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>Cloudflare · DNS Ops</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            All systems nominal
          </span>
          <span className="ml-auto hidden md:inline">v2.0 · build 42.apr</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-primary">●</span> A calm layer over Cloudflare DNS
            </p>

            <h1 className="font-serif text-[15vw] leading-[0.88] tracking-[-0.02em] text-foreground sm:text-[11vw] lg:text-[8.2vw] xl:text-[118px]">
              Records,
              <br />
              <span className="italic text-primary">without</span> the
              <br />
              copy-paste.
            </h1>

            <div className="mt-10 grid max-w-2xl gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                ¶ 01 — premise
              </div>
              <p className="text-[17px] leading-relaxed text-foreground/80">
                SwiftDNS is a thin, fast interface over Cloudflare. Save the addresses and
                names you already use — your home IP, your SPF record, your Vercel CNAME —
                and push them across any zone in a single motion.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-12 rounded-full px-7 font-mono text-xs uppercase tracking-[0.18em]"
                >
                  Begin <ArrowUpRight className="ml-1 size-4" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link href="/providers/cf">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-full px-5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70 hover:bg-transparent hover:text-foreground"
                >
                  Read the tour
                  <CornerDownRight className="ml-1.5 size-3.5" strokeWidth={1.5} />
                </Button>
              </Link>
            </div>
          </div>

          <aside className="relative lg:col-span-5 lg:pl-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-3xl"
            />

            <Card className="relative overflow-hidden rounded-lg border-border/60 bg-card/70 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-foreground/20" />
                    <span className="size-2 rounded-full bg-foreground/20" />
                    <span className="size-2 rounded-full bg-primary/80" />
                  </div>
                  <span className="ml-2">zone · example.com</span>
                </div>
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-full border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  <span className="size-1 rounded-full bg-primary" />
                  synced 3s ago
                </Badge>
              </div>

              <CardContent className="p-0">
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
                      <TableHead className="h-9 w-[56px] text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        TTL
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((r, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-muted/40">
                        <TableCell className="py-2.5">
                          <span className="inline-flex min-w-[44px] justify-center rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-foreground">
                            {r.type}
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-[13px] text-foreground">
                          {r.name}
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate py-2.5 font-mono text-[13px] text-muted-foreground">
                          {r.content}
                        </TableCell>
                        <TableCell className="py-2.5 text-right font-mono text-[11px] text-muted-foreground">
                          {r.ttl}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>5 records</span>
                <span>NS · cloudflare</span>
              </div>
            </Card>

            <div className="mt-4 rounded-lg border border-dashed border-border/60 p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Presets · applied across zones</span>
                <span>{presets.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <span
                    key={p.label}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 py-1 pl-1 pr-2.5 font-mono text-[11px] text-foreground transition-colors hover:border-primary/60"
                  >
                    <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">
                      {p.count}×
                    </span>
                    <span className="text-foreground">{p.label}</span>
                    <span className="text-muted-foreground">· {p.value}</span>
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-12 lg:py-24">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-border/60 pb-6">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                § Features
              </p>
              <h2 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Three ideas, executed <span className="italic text-primary">quietly.</span>
              </h2>
            </div>
            <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
              Pg. 03 / 07
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 md:grid-cols-3">
            {columns.map((col) => (
              <article
                key={col.id}
                className="group relative flex flex-col justify-between bg-background p-8 transition-colors hover:bg-muted/40"
              >
                <div className="mb-16 flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {col.kicker}
                  </span>
                  <span className="font-serif text-2xl italic text-muted-foreground/50">
                    {col.id}
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-3xl leading-tight text-foreground">
                    {col.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{col.body}</p>
                </div>
                <div className="mt-8 h-px w-8 bg-primary transition-all duration-300 group-hover:w-16" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-border/60 pb-6">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                § Demo · Bulk edit
              </p>
              <h2 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Change ten zones <span className="italic text-primary">at once.</span>
              </h2>
            </div>
            <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
              Pg. 04 / 07
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
            <Card className="relative overflow-hidden rounded-lg border-border/60 bg-card/70 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Preview: apply preset <span className="text-foreground">`home`</span> → 7 zones
                </div>
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-full border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  dry run
                </Badge>
              </div>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="h-9 w-[44px]" />
                      <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        Zone
                      </TableHead>
                      <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        Record
                      </TableHead>
                      <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        Before
                      </TableHead>
                      <TableHead className="h-9 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        After
                      </TableHead>
                      <TableHead className="h-9 w-[60px] text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { zone: 'geeth.dev', rec: 'A @', before: '10.0.0.1', after: '192.0.2.42', status: 'update' },
                      { zone: 'rad.sh', rec: 'A api', before: '10.0.0.1', after: '192.0.2.42', status: 'update' },
                      { zone: 'dns.ops', rec: 'A @', before: '—', after: '192.0.2.42', status: 'new' },
                      { zone: 'swiftdns.io', rec: 'A home', before: '192.0.2.42', after: '192.0.2.42', status: 'skip' },
                      { zone: 'radsoft.co', rec: 'A @', before: '203.0.113.2', after: '192.0.2.42', status: 'update' },
                      { zone: 'ops.radsoft', rec: 'A api', before: '—', after: '192.0.2.42', status: 'new' },
                      { zone: 'lab.geeth.dev', rec: 'A @', before: '10.0.0.1', after: '192.0.2.42', status: 'update' },
                    ].map((r, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-muted/40">
                        <TableCell className="py-2.5">
                          <span className={`inline-block size-2 rounded-full ${
                            r.status === 'new'
                              ? 'bg-primary'
                              : r.status === 'update'
                                ? 'bg-primary/50'
                                : 'bg-muted-foreground/30'
                          }`} />
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-[13px] text-foreground">
                          {r.zone}
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-[12px] text-muted-foreground">
                          {r.rec}
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-[12px] text-muted-foreground line-through decoration-muted-foreground/50">
                          {r.before}
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-[12px] text-foreground">
                          {r.after}
                        </TableCell>
                        <TableCell className="py-2.5 text-right font-mono text-[10px] uppercase tracking-wider">
                          <span className={
                            r.status === 'new'
                              ? 'text-primary'
                              : r.status === 'update'
                                ? 'text-foreground'
                                : 'text-muted-foreground/60'
                          }>
                            {r.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>5 updates · 2 new · 0 conflicts</span>
                <span className="text-primary">apply → ⏎</span>
              </div>
            </Card>

            <Card className="relative flex flex-col justify-between overflow-hidden rounded-lg border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 shadow-xl">
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Workflow
                </p>
                <h3 className="font-serif text-3xl leading-tight text-foreground">
                  Pick a preset. <br />
                  Pick your zones. <br />
                  <span className="italic text-primary">Ship it.</span>
                </h3>
              </div>
              <ol className="mt-8 space-y-4 font-mono text-[12px]">
                {[
                  ['01', 'Save the IP once as a named preset'],
                  ['02', 'Select the zones it should apply to'],
                  ['03', 'Review the diff — nothing is touched until you say so'],
                  ['04', 'Commit. Cloudflare propagates in seconds.'],
                ].map(([n, t]) => (
                  <li key={n} className="flex gap-3">
                    <span className="text-primary">{n}</span>
                    <span className="text-foreground/80">{t}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-border/60 pb-6">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                § Demo · Preset manager
              </p>
              <h2 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A small <span className="italic text-primary">address book</span> for DNS.
              </h2>
            </div>
            <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
              Pg. 05 / 07
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
            <div className="rounded-lg border border-border/60 bg-background p-5 font-mono text-[12px] leading-relaxed shadow-xl">
              <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>~/swiftdns · presets</span>
                <span className="text-primary">●</span>
              </div>
              <pre className="whitespace-pre-wrap text-foreground/90">
<span className="text-muted-foreground">$</span> swiftdns preset add{'\n'}
  <span className="text-primary">name</span>     home{'\n'}
  <span className="text-primary">type</span>     A{'\n'}
  <span className="text-primary">content</span>  192.0.2.42{'\n'}
  <span className="text-primary">note</span>     &quot;home office, comcast&quot;{'\n\n'}
<span className="text-muted-foreground">✓</span> saved · id <span className="text-foreground">prs_01h...</span>{'\n\n'}
<span className="text-muted-foreground">$</span> swiftdns preset apply home{' '}
  <span className="text-primary">--zones</span> &quot;*.radsoft.*&quot;{'\n'}
<span className="text-muted-foreground">›</span> 7 zones matched · 5 changed · 0 conflicts{'\n'}
<span className="text-muted-foreground">›</span> applied in <span className="text-primary">0.42s</span>{'\n'}
<span className="inline-block h-[14px] w-[7px] translate-y-[2px] animate-[caret_1s_steps(1)_infinite] bg-primary" />
              </pre>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { name: 'home', type: 'A', value: '192.0.2.42', zones: 7, note: 'home office, comcast' },
                { name: 'prod-api', type: 'A', value: '203.0.113.9', zones: 3, note: 'railway us-east' },
                { name: 'vercel', type: 'CNAME', value: 'cname.vercel-dns.com', zones: 12, note: 'all marketing sites' },
                { name: 'gsuite', type: 'MX', value: 'aspmx.l.google.com', zones: 9, note: 'workspace mx' },
                { name: 'dmarc-strict', type: 'TXT', value: 'v=DMARC1; p=reject', zones: 9, note: 'policy' },
                { name: 'spf-default', type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', zones: 9, note: 'spf' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="group flex flex-col justify-between rounded-lg border border-border/60 bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex min-w-[44px] justify-center rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                          {p.type}
                        </span>
                        <span className="font-mono text-[13px] text-foreground">{p.name}</span>
                      </div>
                      <p className="mt-2 truncate font-mono text-[12px] text-muted-foreground">
                        {p.value}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      {p.zones} zones
                    </span>
                  </div>
                  <p className="mt-4 border-t border-border/40 pt-3 font-serif text-[14px] italic text-muted-foreground">
                    &ldquo;{p.note}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/60">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                ¶ Closing
              </p>
              <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                Stop typing <br />
                the same IP <br />
                <span className="italic text-primary">twice.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end lg:col-span-7">
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/80">
                It&rsquo;s a small tool for a small annoyance. Bring your Cloudflare token,
                save a few presets, and never copy-paste an A record again.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-12 rounded-full px-8 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    Sign in with Cloudflare
                    <ArrowUpRight className="ml-2 size-4" strokeWidth={1.5} />
                  </Button>
                </Link>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  No account · token only
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-y border-border/60 bg-muted/30">
          <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-12">
                <span>A · 192.0.2.42</span>
                <span className="text-primary">◆</span>
                <span>CNAME · www → cname.vercel-dns.com</span>
                <span className="text-primary">◆</span>
                <span>MX · aspmx.l.google.com</span>
                <span className="text-primary">◆</span>
                <span>TXT · v=DMARC1; p=reject;</span>
                <span className="text-primary">◆</span>
                <span>NS · cloudflare</span>
                <span className="text-primary">◆</span>
                <span>AAAA · 2606:4700::6812:1a1a</span>
                <span className="text-primary">◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] opacity-40" />
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
    </div>
  );
}
