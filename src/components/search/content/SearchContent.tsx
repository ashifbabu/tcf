'use client'

import React, { useState } from 'react'
import { ArrowRightLeftIcon as ArrowsRightLeftIcon, ChevronDownIcon, CalendarIcon, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import TripTypes from '../trip/TripTypes'
import LocationInput from '../location/LocationInput'
import DateInput from '../date/DateInput'
import TravelersInput from '../travelers/TravelersInput'
import FareTypes from '../fare/FareTypes'
import SearchButton from '../button/SearchButton'

interface Airport {
  city: string
  country: string
  airportName: string
  code: string
}

interface Passengers {
  adults: number
  children: number
  infants: number
}

const SearchContent = () => {
  const [fromCity, setFromCity] = useState('Dhaka')
  const [fromAirport, setFromAirport] = useState('Hazrat Shahjalal International Airport')
  const [toCity, setToCity] = useState('Chittagong')
  const [toAirport, setToAirport] = useState('Shah Amanat International')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [tripType, setTripType] = useState('One Way')
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0
  })
  const [departureDate, setDepartureDate] = useState<string>('Select date')
  const [returnDate, setReturnDate] = useState<string>('Select date')

  // Example suggestions
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
    }
  ]

  const swapLocations = () => {
    setFromCity(toCity)
    setFromAirport(toAirport)
    setToCity(fromCity)
    setToAirport(fromAirport)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getPassengerSummary = () => {
    const total = passengers.adults + passengers.children + passengers.infants
    return `${total} Traveler${total > 1 ? 's' : ''}`
  }

  const handleTripTypeChange = (type: string) => {
    setTripType(type)
    if (type === 'One Way') {
      setReturnDate('Select date')
    }
  }

  const handleDepartureDateChange = (newDate: string) => {
    setDepartureDate(newDate)
  }

  const handleReturnDateChange = (newDate: string) => {
    setReturnDate(newDate)
  }

  const handlePassengersUpdate = (newPassengers: Passengers) => {
    setPassengers(newPassengers)
  }

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for flights...')
    toggleCollapse()
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-6 space-y-6">
      {isCollapsed ? (
        <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800  rounded-none p-4 shadow-sm">
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
              <span>{departureDate} {tripType !== 'One Way' && returnDate !== 'Select date' && `- ${returnDate}`}</span>
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
          <TripTypes selectedType={tripType} onSelect={handleTripTypeChange} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Location Selection */}
            <div className="lg:col-span-5">
              <div className="relative grid grid-rows-2 gap-0">
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
                    "absolute right-20 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 rounded-full",
                    "w-8 h-8",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "flex items-center justify-center",
                    "hover:bg-gray-50 dark:hover:bg-gray-700",
                    "focus:outline-none focus:ring-2 focus:ring-gray-400",
                    "shadow-sm"
                  )}  
                >
                  <ArrowsRightLeftIcon 
                    className="h-4 w-4 text-gray-500" 
                    style={{ transform: 'rotate(90deg)' }}
                  />
                </button>
              </div>
            </div>
            
            {/* Date Selection */}
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
            
            {/* Travelers Selection */}
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
  )
}

export default SearchContent