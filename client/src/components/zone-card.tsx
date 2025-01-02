import React from 'react';
import Link from 'next/link';
import { Globe, Server, Calendar, DollarSign, User } from 'lucide-react';
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
import { Zone } from '@/typings/zone';

interface ZoneCardProps {
  zone: Zone;
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  return (
    <Link href={`/providers/cf/${zone.id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5 text-primary" />
            {zone.name}
          </CardTitle>
          <CardDescription>{zone.account.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <InfoItem icon={Server} label="Status" value={zone.status} />
            <InfoItem
              icon={Calendar}
              label="Created"
              value={new Date(zone.created_on).toLocaleDateString()}
            />
            <InfoItem icon={DollarSign} label="Plan" value={zone.plan.name} />
            <InfoItem icon={User} label="Owner" value={zone.owner.name || 'N/A'} />
          </div>
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-semibold">Name Servers:</h4>
            <ScrollArea className="h-20 w-full rounded-md border p-2">
              <ul className="text-sm">
                {zone.name_servers.map((ns, index) => (
                  <li key={index} className="text-muted-foreground">
                    {ns}
                  </li>
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
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">
        <span className="font-medium">{label}:</span> {value}
      </span>
    </div>
  );
}
