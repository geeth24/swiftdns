import CFDNSRecordsPage from '@/components/cf-dns-records-page';
import React from 'react';

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CFDNSRecordsPage id={id} />;
}

export default Page;
