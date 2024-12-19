import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import TripTypes from '../search/trip/TripTypes';
import LocationInput from '../search/location/LocationInput';
import DateInput from '../search/date/DateInput';
import TravelersInput from '../search/travelers/TravelersInput';
import FareTypes from '../search/fare/FareTypes';
import SearchButton from '../search/button/SearchButton';

interface Airport {
  city: string;
  country: string;
  airportName: string;
  code: string;
}

const FlightSearch: React.FC = () => {
  const [fromCity, setFromCity] = useState('Dhaka');
  const [fromAirport, setFromAirport] = useState('Hazrat Shahjalal International Airport');
  const [toCity, setToCity] = useState('Chittagong');
  const [toAirport, setToAirport] = useState('Shah Amanat International');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const suggestions: Airport[] = [
    {
      city: "Dhaka",
      country: "Bangladesh",
      airportName: "Hazrat Shahjalal International Airport",
      code: "DAC"
    },
    {
      city: "Chittagong",
      country: "Bangladesh",
      airportName: "Shah Amanat International",
      code: "CGP"
    },
    {
      city: "Cox's Bazar",
      country: "Bangladesh",
      airportName: "Cox's Bazar",
      code: "CXB"
    },
  ];

  const swapLocations = () => {
    setFromCity(toCity);
    setFromAirport(toAirport);
    setToCity(fromCity);
    setToAirport(fromAirport);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-6 space-y-6">
      {isCollapsed ? (
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">{fromCity}</span> to <span className="font-semibold">{toCity}</span>
          </div>
          <button
            onClick={toggleCollapse}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span>Modify</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <TripTypes />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <div className="relative grid grid-rows-2 gap-4">
                <LocationInput
                  type="from"
                  value={fromCity}
                  subValue={fromAirport}
                  onChange={setFromCity}
                  suggestions={suggestions}
                />
                <LocationInput
                  type="to"
                  value={toCity}
                  subValue={toAirport}
                  onChange={setToCity}
                  suggestions={suggestions}
                />
                <button
                  type="button"
                  onClick={swapLocations}
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full",
                    "w-8 h-8",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "flex items-center justify-center",
                    "hover:bg-gray-50 dark:hover:bg-gray-700",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-4">
                <DateInput
                  type="departure"
                  value="Select date"
                  subValue=""
                />
                <DateInput
                  type="return"
                  value="Select date"
                  subValue=""
                />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <TravelersInput
                value="1 Traveler"
                subValue="Economy"
                onClick={() => console.log('Open travelers modal')}
              />
            </div>
          </div>

          <FareTypes />
          
          <div className="mt-6 flex justify-center">
            <SearchButton onClick={toggleCollapse} isCollapsed={isCollapsed} />
          </div>
        </>
      )}
    </div>
  );
};

export default FlightSearch;

