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

/**
 * Dynamically import subcomponents (if you’re using Next.js + dynamic import).
 * Alternatively, you can import them directly if you want server/client stubbing.
 */
const TripTypes = dynamic(() => import('../trip/TripTypes'), {
  // optional: loading: () => <p>Loading trip types...</p>
});
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
  // States
  const [tripType, setTripType] = useState<TripType>('One Way');
  const [fromCity, setFromCity] = useState('Dhaka');
  const [fromAirport, setFromAirport] = useState('Hazrat Shahjalal International Airport');
  const [toCity, setToCity] = useState('Chittagong');
  const [toAirport, setToAirport] = useState('Shah Amanat International');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0
  });

  const [departureDate, setDepartureDate] = useState('Select date');
  const [returnDate, setReturnDate] = useState('Select date');

  // Sample location suggestions
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

  // Swap "From" and "To" inputs
  const swapLocations = () => {
    const oldFromCity = fromCity;
    const oldFromAirport = fromAirport;
    setFromCity(toCity);
    setFromAirport(toAirport);
    setToCity(oldFromCity);
    setToAirport(oldFromAirport);
  };

  // Toggle collapsed/expanded
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Return a string like "1 Traveler" or "3 Travelers"
  const getPassengerSummary = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    return `${total} Traveler${total > 1 ? 's' : ''}`;
  };

  // If user selects "One Way," reset return date
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

  // On "Search" button click
  const handleSearch = () => {
    console.log('Searching for flights...');
    toggleCollapse();
  };

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-6 space-y-6">
      {/* If collapsed, show a summary */}
      {isCollapsed ? (
        <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 rounded p-4 shadow-sm">
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
                {departureDate}
                {tripType !== 'One Way' && returnDate !== 'Select date'
                  ? ` - ${returnDate}`
                  : ''}
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
        <>
          {/* 
            1) The TripTypes radio group 
            (One Way / Round Trip / Multi City)
          */}
          <TripTypes selectedType={tripType} onSelect={handleTripTypeChange} />

          {/* 2) Main layout: 3 columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* 
              Column 1: 
              From & To stacked vertically, with an absolute swap button in the middle. 
              Also the invisible placeholder to prevent layout shift. 
            */}
            <div className="lg:col-span-5">
              <div
                className="
                  relative
                  grid
                  grid-rows-2
                  gap-0
                  min-h-[140px]
                "
              >
                {/* FROM location (first row) */}
                <LocationInput
                  type="from"
                  value={fromCity}
                  subValue={fromAirport}
                  onChange={setFromCity}
                  suggestions={suggestions}
                />
                {/* TO location (second row) */}
                <LocationInput
                  type="to"
                  value={toCity}
                  subValue={toAirport}
                  onChange={setToCity}
                  suggestions={suggestions}
                />

                {/* Invisible placeholder so no CLS on the absolute button */}
                <div
                  className="
                    invisible
                    absolute
                    z-0
                    w-8
                    h-8
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                  aria-hidden="true"
                />

                {/* SWAP button */}
                <button
                  type="button"
                  onClick={swapLocations}
                  className={cn(
                    'absolute z-10 w-8 h-8',
                    'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    'rounded-full bg-white dark:bg-gray-800',
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
              </div>
            </div>

            {/* Column 2: Date Pickers */}
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

            {/* Column 3: Passengers & cabin class */}
            <div className="lg:col-span-3">
              <TravelersInput
                value={getPassengerSummary()}
                subValue="Economy"
                onClick={() => console.log('Open travelers modal')}
              />
            </div>
          </div>

          {/* Fare Types */}
          <FareTypes />

          {/* Search button */}
          <div className="flex justify-center w-full">
            <SearchButton onClick={handleSearch} isCollapsed={isCollapsed} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchContent;