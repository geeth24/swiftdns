import React from 'react';
import ZoneCard from './zone-card';
import { Zone } from '@/typings/zone';

interface ZoneCardsProps {
  zones: Zone[];
}

export default function ZoneCards({ zones }: ZoneCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {zones?.map((zone) => <ZoneCard key={zone.id} zone={zone} />)}
    </div>
  );
}
