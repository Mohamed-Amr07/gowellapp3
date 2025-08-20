import React, { useState, useEffect } from 'react';
import { Plane, Calendar, Users, Search, Loader } from 'lucide-react';
import axios from 'axios';

// Generate mock flights for fallback
const generateMockFlights = (origin, destination, date, passengers) => {
  if (!origin || !destination || !date) return [];
  
  // Generate airport codes if needed
  const originCode = origin.length <= 3 ? origin : origin.substring(0, 3).toUpperCase();
  const destCode = destination.length <= 3 ? destination : destination.substring(0, 3).toUpperCase();
  
  // Generate random flight times
  const departureDate = new Date(date);
  const morningDeparture = new Date(departureDate);
  morningDeparture.setHours(7 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60), 0);
  
  const afternoonDeparture = new Date(departureDate);
  afternoonDeparture.setHours(12 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60), 0);
  
  const eveningDeparture = new Date(departureDate);
  eveningDeparture.setHours(17 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60), 0);
  
  // Generate arrival times (2-8 hours later)
  const getArrivalTime = (departure) => {
    const arrival = new Date(departure);
    arrival.setHours(arrival.getHours() + 2 + Math.floor(Math.random() * 6));
    return arrival;
  };
  
  const morningArrival = getArrivalTime(morningDeparture);
  const afternoonArrival = getArrivalTime(afternoonDeparture);
  const eveningArrival = getArrivalTime(eveningDeparture);
  
  // Generate prices
  const basePrice = 200 + Math.floor(Math.random() * 800);
  
  // Generate airlines
  const airlines = ['AA', 'DL', 'UA', 'BA', 'LH', 'AF', 'EK', 'QR', 'TK', 'EY'];
  
  return [
    {
      id: 'flight-1',
      price: {
        total: (basePrice - 50).toFixed(2),
        currency: 'USD'
      },
      validatingAirlineCodes: [airlines[Math.floor(Math.random() * airlines.length)]],
      itineraries: [
        {
          duration: `PT${Math.floor((morningArrival - morningDeparture) / (1000 * 60 * 60))}H${Math.floor(((morningArrival - morningDeparture) % (1000 * 60 * 60)) / (1000 * 60))}M`,
          segments: [
            {
              departure: {
                iataCode: originCode,
                at: morningDeparture.toISOString()
              },
              arrival: {
                iataCode: destCode,
                at: morningArrival.toISOString()
              }
            }
          ]
        }
      ]
    },
    {
      id: 'flight-2',
      price: {
        total: basePrice.toFixed(2),
        currency: 'USD'
      },
      validatingAirlineCodes: [airlines[Math.floor(Math.random() * airlines.length)]],
      itineraries: [
        {
          duration: `PT${Math.floor((afternoonArrival - afternoonDeparture) / (1000 * 60 * 60))}H${Math.floor(((afternoonArrival - afternoonDeparture) % (1000 * 60 * 60)) / (1000 * 60))}M`,
          segments: [
            {
              departure: {
                iataCode: originCode,
                at: afternoonDeparture.toISOString()
              },
              arrival: {
                iataCode: destCode,
                at: afternoonArrival.toISOString()
              }
            }
          ]
        }
      ]
    },
    {
      id: 'flight-3',
      price: {
        total: (basePrice + 75).toFixed(2),
        currency: 'USD'
      },
      validatingAirlineCodes: [airlines[Math.floor(Math.random() * airlines.length)]],
      itineraries: [
        {
          duration: `PT${Math.floor((eveningArrival - eveningDeparture) / (1000 * 60 * 60))}H${Math.floor(((eveningArrival - eveningDeparture) % (1000 * 60 * 60)) / (1000 * 60))}M`,
          segments: [
            {
              departure: {
                iataCode: originCode,
                at: eveningDeparture.toISOString()
              },
              arrival: {
                iataCode: destCode,
                at: eveningArrival.toISOString()
              }
            }
          ]
        }
      ]
    }
  ];
};

// Mock airport suggestions
const getMockAirportSuggestions = (query) => {
  const airports = [
    { id: 'JFK', name: 'John F. Kennedy International Airport', iataCode: 'JFK', cityName: 'New York', countryName: 'United States' },
    { id: 'LGA', name: 'LaGuardia Airport', iataCode: 'LGA', cityName: 'New York', countryName: 'United States' },
    { id: 'LAX', name: 'Los Angeles International Airport', iataCode: 'LAX', cityName: 'Los Angeles', countryName: 'United States' },
    { id: 'LHR', name: 'Heathrow Airport', iataCode: 'LHR', cityName: 'London', countryName: 'United Kingdom' },
    { id: 'CDG', name: 'Charles de Gaulle Airport', iataCode: 'CDG', cityName: 'Paris', countryName: 'France' },
    { id: 'FRA', name: 'Frankfurt Airport', iataCode: 'FRA', cityName: 'Frankfurt', countryName: 'Germany' },
    { id: 'IST', name: 'Istanbul Airport', iataCode: 'IST', cityName: 'Istanbul', countryName: 'Turkey' },
    { id: 'CAI', name: 'Cairo International Airport', iataCode: 'CAI', cityName: 'Cairo', countryName: 'Egypt' },
    { id: 'CMN', name: 'Mohammed V International Airport', iataCode: 'CMN', cityName: 'Casablanca', countryName: 'Morocco' },
    { id: 'TUN', name: 'Tunis Carthage International Airport', iataCode: 'TUN', cityName: 'Tunis', countryName: 'Tunisia' },
    { id: 'CUN', name: 'Cancún International Airport', iataCode: 'CUN', cityName: 'Cancún', countryName: 'Mexico' }
  ];
  
  return airports.filter(airport => 
    airport.name.toLowerCase().includes(query.toLowerCase()) || 
    airport.iataCode.toLowerCase().includes(query.toLowerCase()) ||
    airport.cityName.toLowerCase().includes(query.toLowerCase()) ||
    airport.countryName.toLowerCase().includes(query.toLowerCase())
  );
};

const FlightSearchComponent = ({ onFlightSelect, departureCountry, departureCity, destination, passengers = 1 }) => {
  const [loading, setLoading] = useState(false);
  const [flightResults, setFlightResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: passengers
  });
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [error, setError] = useState(null);

  // Helper function to get placeholder airport codes
  const getAirportCodePlaceholder = (location) => {
    const codes = {
      'New York': 'JFK',
      'Los Angeles': 'LAX',
      'London': 'LHR',
      'Paris': 'CDG',
      'Morocco': 'CMN',
      'Casablanca': 'CMN',
      'Tunisia': 'TUN',
      'Tunis': 'TUN',
      'Egypt': 'CAI',
      'Cairo': 'CAI',
      'Turkey': 'IST',
      'Istanbul': 'IST',
      'Mexico': 'MEX'
    };
    return codes[location] || '';
  };

  // Pre-fill based on props if available
  useEffect(() => {
    if (departureCity && departureCountry) {
      setOriginQuery(`${departureCity}, ${departureCountry}`);
      setSearchParams(prev => ({
        ...prev,
        originLocationCode: getAirportCodePlaceholder(departureCity) || getAirportCodePlaceholder(departureCountry)
      }));
    }
    
    if (destination) {
      setDestQuery(destination);
      setSearchParams(prev => ({
        ...prev,
        destinationLocationCode: getAirportCodePlaceholder(destination)
      }));
    }
    
    if (passengers) {
      setSearchParams(prev => ({
        ...prev,
        adults: passengers
      }));
    }
    
    // Set default departure date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSearchParams(prev => ({
      ...prev,
      departureDate: tomorrow.toISOString().split('T')[0]
    }));
  }, [departureCity, departureCountry, destination, passengers]);

  const handleOriginSearch = (query) => {
    setOriginQuery(query);
    if (query.length < 2) {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
      return;
    }
    
    const suggestions = getMockAirportSuggestions(query);
    setOriginSuggestions(suggestions);
    setShowOriginSuggestions(true);
  };

  const handleDestSearch = (query) => {
    setDestQuery(query);
    if (query.length < 2) {
      setDestSuggestions([]);
      setShowDestSuggestions(false);
      return;
    }
    
    const suggestions = getMockAirportSuggestions(query);
    setDestSuggestions(suggestions);
    setShowDestSuggestions(true);
  };

  const selectOrigin = (suggestion) => {
    setOriginQuery(`${suggestion.name} (${suggestion.iataCode})`);
    setSearchParams(prev => ({
      ...prev,
      originLocationCode: suggestion.iataCode
    }));
    setShowOriginSuggestions(false);
  };

  const selectDestination = (suggestion) => {
    setDestQuery(`${suggestion.name} (${suggestion.iataCode})`);
    setSearchParams(prev => ({
      ...prev,
      destinationLocationCode: suggestion.iataCode
    }));
    setShowDestSuggestions(false);
  };

  const handleSearch = () => {
    if (!searchParams.originLocationCode || !searchParams.destinationLocationCode || !searchParams.departureDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Use mock data
    setTimeout(() => {
      const mockFlights = generateMockFlights(
        searchParams.originLocationCode,
        searchParams.destinationLocationCode,
        searchParams.departureDate,
        searchParams.adults
      );
      setFlightResults(mockFlights);
      setLoading(false);
    }, 1500);
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Find Your Flight</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Origin */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or airport"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={originQuery}
              onChange={(e) => handleOriginSearch(e.target.value)}
              onFocus={() => originSuggestions.length > 0 && setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
            />
          </div>
          {showOriginSuggestions && originSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
              {originSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOrigin(suggestion)}
                >
                  <div className="font-medium">{suggestion.name} ({suggestion.iataCode})</div>
                  <div className="text-sm text-gray-600">{suggestion.cityName}, {suggestion.countryName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or airport"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={destQuery}
              onChange={(e) => handleDestSearch(e.target.value)}
              onFocus={() => destSuggestions.length > 0 && setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
            />
          </div>
          {showDestSuggestions && destSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
              {destSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectDestination(suggestion)}
                >
                  <div className="font-medium">{suggestion.name} ({suggestion.iataCode})</div>
                  <div className="text-sm text-gray-600">{suggestion.cityName}, {suggestion.countryName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="9"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.adults}
              onChange={(e) => setSearchParams(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <Loader className="h-5 w-5 mr-2 animate-spin" /> : <Search className="h-5 w-5 mr-2" />}
          Search Flights
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {/* Flight Results */}
      {flightResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Flights</h3>
          <div className="space-y-4">
            {flightResults.map((flight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {flight.itineraries.map((itinerary, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">
                        {itinerary.segments[0].departure.iataCode} → {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
                      </div>
                      <div className="text-gray-600">
                        Duration: {formatDuration(itinerary.duration)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold">
                          {formatDateTime(itinerary.segments[0].departure.at)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(itinerary.segments[0].departure.at)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {itinerary.segments[0].departure.iataCode}
                        </div>
                      </div>
                      <div className="flex-1 border-t border-gray-300 mx-4 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                          {itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} stop(s)` : 'Direct'}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {formatDateTime(itinerary.segments[itinerary.segments.length - 1].arrival.at)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(itinerary.segments[itinerary.segments.length - 1].arrival.at)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
                        </div>
                      </div>
                    </div>
                    
                    {/* Show connection details if there are multiple segments */}
                    {itinerary.segments.length > 1 && (
                      <div className="mt-2 pl-4 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">Connections:</p>
                        {itinerary.segments.map((segment, idx) => (
                          idx > 0 && (
                            <div key={idx} className="text-xs text-gray-500 mt-1">
                              {itinerary.segments[idx-1].arrival.iataCode} • 
                              {' '}Connection time: {
                                Math.round((new Date(segment.departure.at) - new Date(itinerary.segments[idx-1].arrival.at)) / 60000)
                              } min
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <div>
                    <div className="text-sm text-gray-600">
                      Operated by: {flight.validatingAirlineCodes.join(', ')}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      ${parseFloat(flight.price.total).toFixed(2)}
                      <span className="text-sm font-normal text-gray-600"> per person</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: ${(parseFloat(flight.price.total) * searchParams.adults).toFixed(2)} for {searchParams.adults} {searchParams.adults === 1 ? 'passenger' : 'passengers'}
                    </div>
                  </div>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    onClick={() => onFlightSelect(flight)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {loading && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <Loader className="h-6 w-6 text-blue-600 animate-spin" />
            <span>Searching for the best flights...</span>
          </div>
        </div>
      )}
      
      {!loading && flightResults.length === 0 && searchParams.departureDate && !error && (
        <div className="mt-8 text-center text-gray-600">
          <p>Enter your search criteria and click "Search Flights" to find available flights.</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearchComponent;
