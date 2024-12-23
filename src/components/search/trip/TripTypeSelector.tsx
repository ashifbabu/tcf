// SearchContent.tsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRightLeftIcon as ArrowsRightLeftIcon,
  ChevronDownIcon,
  CalendarIcon,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

/** Import the TripTypes component (with the new union type) */
const TripTypes = dynamic(() => import('../trip/TripTypes'));
/** Import the type so we can use it for our state. */
import type { TripType } from '../trip/TripTypes';

const LocationInput = dynamic(() => import('../location/LocationInput'));
const DateInput = dynamic(() => import('../date/DateInput'));
const TravelersInput = dynamic(() => import('../travelers/TravelersInput'));
const FareTypes = dynamic(() => import('../fare/FareTypes'));
const SearchButton = dynamic(() => import('../button/SearchButton'));

interface Airport {
  city: string;
  country: string;
  airportName: string;
  code: string;
}

interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

const SearchContent = () => {
  // For Trip Type, we use the same union: 'One Way' | 'Round Trip' | 'Multi City'
  const [tripType, setTripType] = useState<TripType>('One Way');

  // ... other states remain the same
  const [fromCity, setFromCity] = useState('Dhaka');
  const [fromAirport, setFromAirport] = useState('Hazrat Shahjalal International Airport');
  const [toCity, setToCity] = useState('Chittagong');
  const [toAirport, setToAirport] = useState('Shah Amanat International');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [passengers, setPassengers] = useState<Passengers>({ adults: 1, children: 0, infants: 0 });
  const [departureDate, setDepartureDate] = useState<string>('Select date');
  const [returnDate, setReturnDate] = useState<string>('Select date');

  const suggestions: Airport[] = [
    {
      city: 'Dhaka',
      country: 'Bangladesh',
      airportName: 'Hazrat Shahjalal International Airport',
      code: 'DAC'
    },
    {
      city: 'Chittagong',
      country: 'Bangladesh',
      airportName: 'Shah Amanat International',
      code: 'CGP'
    },
    {
      city: "Cox's Bazar",
      country: 'Bangladesh',
      airportName: "Cox's Bazar",
      code: 'CXB'
    }
  ];

  // Swap the from/to inputs
  const swapLocations = () => {
    setFromCity((prev) => {
      return toCity;
    });
    setFromAirport((prev) => {
      return toAirport;
    });
    setToCity((prev) => {
      return fromCity;
    });
    setToAirport((prev) => {
      return fromAirport;
    });
  };

  // Toggle collapsed state
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Return summary of passenger counts
  const getPassengerSummary = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    return `${total} Traveler${total > 1 ? 's' : ''}`;
  };

  // If user picks "One Way", we reset the return date
  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    if (type === 'One Way') {
      setReturnDate('Select date');
    }
  };

  // Date change handlers
  const handleDepartureDateChange = (newDate: string) => {
    setDepartureDate(newDate);
  };
  const handleReturnDateChange = (newDate: string) => {
    setReturnDate(newDate);
  };

  const handleSearch = () => {
    console.log('Searching for flights...');
    toggleCollapse();
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-6 space-y-6">
      {isCollapsed ? (
        /* Collapsed: Show summary */
        <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{fromCity}</span>
              <ArrowsRightLeftIcon className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{toCity}</span>
            </div>
            <button
              onClick={toggleCollapse}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span>Modify</span>
              <ChevronDownIcon className="h-5 w-5 ml-1" />
            </button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {departureDate}{' '}
                {tripType !== 'One Way' && returnDate !== 'Select date' && `- ${returnDate}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowsRightLeftIcon className="h-4 w-4" />
              <span>{tripType}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{getPassengerSummary()}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Expanded: Full form */
        <>
          {/*
            TripTypes now expects: 
              selectedType={tripType} 
              onSelect={(type: TripType) => void}
          */}
          <TripTypes selectedType={tripType} onSelect={handleTripTypeChange} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                <LocationInput
                  type="from"
                  value={fromCity}
                  subValue={fromAirport}
                  onChange={setFromCity}
                  suggestions={suggestions}
                />
                <button
                  type="button"
                  onClick={swapLocations}
                  className={cn(
                    'rounded-full w-8 h-8 bg-white dark:bg-gray-800',
                    'border border-gray-200 dark:border-gray-700',
                    'flex items-center justify-center',
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm'
                  )}
                >
                  <ArrowsRightLeftIcon
                    className="h-4 w-4 text-gray-500"
                    style={{ transform: 'rotate(90deg)' }}
                  />
                </button>
                <LocationInput
                  type="to"
                  value={toCity}
                  subValue={toAirport}
                  onChange={setToCity}
                  suggestions={suggestions}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-0 h-full">
                <DateInput
                  type="departure"
                  value={departureDate}
                  onChange={(date) => handleDepartureDateChange(date.toLocaleDateString())}
                  subValue=""
                />
                <DateInput
                  type="return"
                  value={returnDate}
                  onChange={(date) => handleReturnDateChange(date.toLocaleDateString())}
                  subValue=""
                  disabled={tripType === 'One Way'}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <TravelersInput
                value={getPassengerSummary()}
                subValue="Economy"
                onClick={() => console.log('Open travelers modal')}
              />
            </div>
          </div>

          <FareTypes />

          <div className="flex justify-center w-full">
            <SearchButton onClick={handleSearch} isCollapsed={isCollapsed} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchContent;