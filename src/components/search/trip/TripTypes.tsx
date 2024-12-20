'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { useTripType } from '@/hooks/use-trip-type';

interface TripTypesProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const TripTypes: React.FC<TripTypesProps> = ({ selectedType, onSelect }) => {
  const tripTypes = [
    { id: 'oneWay', label: 'One Way' },
    { id: 'roundTrip', label: 'Round Trip' },
    { id: 'multiCity', label: 'Multi City' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {tripTypes.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`flex items-center gap-2 ${selectedType === id ? 'selected' : ''}`}
        >
          <div className={cn(
            "w-4 h-4 rounded-full border-2",
            selectedType === id ? 'bg-blue-500' : 'bg-gray-200'
          )} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TripTypes;