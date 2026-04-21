# SwiftDNS · client

A calm layer over Cloudflare DNS. Save the IPs and names you already use, and push them across any zone in one click.

## Develop

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 15 · React 19
- shadcn/ui · Tailwind 3 · Instrument Serif / JetBrains Mono
- Firebase (auth + preset store)
- FastAPI backend in `../xapi`

## Env

- `NEXT_PUBLIC_SITE_URL` — canonical site origin (used for SEO metadata, sitemap, robots).
