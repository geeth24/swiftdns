import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DNSRecords } from '../../typings/dns';

export default function CFDNSRecords({ records }: { records: DNSRecords }) {
  const handleAddRecord = () => {
    // Implement the logic to add a new record here
    // This could open a modal or navigate to a new page
    console.log('Add new record clicked');
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>DNS Records</CardTitle>
          <CardDescription>Viewing {records.length} DNS records</CardDescription>
        </CardHeader>
      </Card>

      {/* <div className="mb-6 flex w-full justify-end">
        <Button onClick={handleAddRecord} variant="default">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Record
        </Button>
      </div> */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>TTL</TableHead>
            <TableHead>Proxied</TableHead>
            <TableHead>Created On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.name}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.content}</TableCell>
              <TableCell>{record.ttl === 1 ? 'Auto' : record.ttl}</TableCell>
              <TableCell>
                <Badge variant={record.proxied ? 'default' : 'secondary'}>
                  {record.proxied ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
              <TableCell>{new Date(record.created_on).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
