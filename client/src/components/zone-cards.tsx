import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, Server, Calendar, DollarSign, User } from 'lucide-react';
import Link from 'next/link';
import { Zone } from '../../typings/zone';

// Import the Zone interface

// Props for the ZoneCard component
interface ZoneCardProps {
  zones: Zone[];
}

export default function ZoneCards({ zones }: ZoneCardProps) {
  return (
    <div className="grid-cols-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {zones?.map((zone) => (
        <Link href={`/providers/cf/${zone.id}`} key={zone.id}>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {zone.name}
              </CardTitle>
              <CardDescription>{zone.account.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Status: {zone.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Created: {new Date(zone.created_on).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Plan: {zone.plan.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Owner: {zone.owner.name || 'N/A'}</span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold">Name Servers:</h4>
                <ScrollArea className="h-20 w-full rounded-md border p-2">
                  <ul className="text-sm">
                    {zone.name_servers.map((ns, index) => (
                      <li key={index}>{ns}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Badge variant={zone.paused ? 'destructive' : 'default'}>
                {zone.paused ? 'Paused' : 'Active'}
              </Badge>
              <Badge variant="outline">{zone.type}</Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
