import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const providers = [
  {
    slug: 'cf',
    name: 'Cloudflare',
    href: '/providers/cf',
    status: 'live',
    description: 'Read zones, manage DNS records, push presets across every domain you own.',
    stats: { records: '∞', latency: '< 1s', regions: '330+' },
  },
  {
    slug: 'vercel',
    name: 'Vercel',
    href: '/providers/vercel',
    status: 'soon',
    description: 'Manage DNS on Vercel-owned domains from the same interface.',
    stats: { records: '—', latency: '—', regions: '—' },
  },
];

export default function ProvidersPage() {
  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>§ Providers</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>Pick a registrar</span>
          <span className="ml-auto">{providers.length} total</span>
        </div>

        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ¶ 01 — choose
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Where is the <br />
              zone <span className="italic text-primary">hosted?</span>
            </h1>
          </div>
          <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
            Pg. 01 / 01
          </span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 md:grid-cols-2">
          {providers.map((p) => {
            const live = p.status === 'live';
            const content = (
              <article
                className={`group relative flex min-h-[320px] flex-col justify-between bg-background p-8 transition-colors ${
                  live ? 'hover:bg-muted/40' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    /{p.slug}
                  </span>
                  <Badge
                    variant="outline"
                    className={`gap-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${
                      live ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        live ? 'bg-primary' : 'bg-muted-foreground/40'
                      }`}
                    />
                    {p.status}
                  </Badge>
                </div>

                <div>
                  <h2 className="mb-3 font-serif text-5xl leading-none tracking-tight text-foreground">
                    {p.name}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-border/60 pt-5">
                  <div className="grid grid-cols-3 gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <div>
                      <div className="text-foreground/80">{p.stats.records}</div>
                      <div>records</div>
                    </div>
                    <div>
                      <div className="text-foreground/80">{p.stats.latency}</div>
                      <div>latency</div>
                    </div>
                    <div>
                      <div className="text-foreground/80">{p.stats.regions}</div>
                      <div>regions</div>
                    </div>
                  </div>
                  {live && (
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
              </article>
            );

            return live ? (
              <Link key={p.slug} href={p.href}>
                {content}
              </Link>
            ) : (
              <div key={p.slug}>{content}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
