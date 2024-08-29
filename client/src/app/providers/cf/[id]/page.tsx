'use client';
import React, { useEffect } from 'react';
import { DNSRecords } from '../../../../../typings/dns';
import CFDNSRecords from '@/components/cf-dns-records';
import { useAuth } from '@/context/AuthContext';
import { useUserRecordData } from '@/context/UserRecordDataContext';

function Page({ params: { id } }: { params: { id: string } }) {
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
          let userRecords = await getUserRecordData(user?.uid as string, 'cf');

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('api-token', userRecords?.token as string);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cf/zones/${id}/dns_records`,
            {
              method: 'GET',
              headers: headers,
              cache: 'no-cache',
            },
          );

          if (!response.ok) {
            throw new Error('Failed to fetch records');
          }
          const data = await response.json();
          setRecords(data);
          setLoading(false);
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [id]);

  return (
    <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <CFDNSRecords records={records} />
    </div>
  );
}

export default Page;
