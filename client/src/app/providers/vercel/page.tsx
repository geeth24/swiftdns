import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VercelPage() {
  return (
    <main className="relative min-h-dvh bg-background pt-14 text-foreground">
      <section className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link
            href="/providers"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" strokeWidth={1.5} />
            Providers
          </Link>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>vercel · soon</span>
        </div>

        <div className="flex min-h-[50dvh] flex-col items-start justify-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            § Vercel
          </p>
          <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
            Not <span className="italic text-primary">yet.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Vercel DNS support is next on the list. If you manage domains on Vercel and want
            this sooner, open an issue — it helps me prioritize.
          </p>
          <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ETA · soon · maybe summer 2026
          </div>
        </div>
      </section>
    </main>
  );
}
