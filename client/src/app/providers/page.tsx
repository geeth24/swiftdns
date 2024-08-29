import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

function Page() {
  return (
    <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
        <Link href="/providers/cf">
          <Card className="p-6">
            <CardTitle className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
              Cloudflare
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your Cloudflare zones and manage DNS records
            </CardDescription>
          </Card>
        </Link>
        <Link href="/providers/vercel" className="pointer-events-none opacity-50">
          <Card className="p-6">
            <CardTitle className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
              Vercel
            </CardTitle>
            <CardDescription className="text-muted-foreground">Coming soon</CardDescription>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Page;
