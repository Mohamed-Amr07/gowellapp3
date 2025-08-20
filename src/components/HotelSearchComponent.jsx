import React, { useState, useEffect } from 'react';
import { Building, Calendar, Users, Search, Loader, Star, MapPin, Wifi, Coffee, Utensils, Dumbbell } from 'lucide-react';

// Generate mock hotels
const generateMockHotels = (destination, checkInDate, checkOutDate, guests, accommodationType) => {
  if (!destination) return [];
  
  // Base hotel data
  const hotelTypes = {
    'standard': {
      priceRange: [70, 120],
      stars: [3, 4],
      amenities: ['Free WiFi', 'Breakfast available', 'Air conditioning']
    },
    'deluxe': {
      priceRange: [130, 200],
      stars: [4, 5],
      amenities: ['Free WiFi', 'Breakfast included', 'Air conditioning', 'Pool', 'Fitness center']
    },
    'suite': {
      priceRange: [220, 350],
      stars: [5],
      amenities: ['Free WiFi', 'Breakfast included', 'Air conditioning', 'Pool', 'Fitness center', 'Spa', 'Room service']
    },
    'recovery': {
      priceRange: [100, 150],
      stars: [3, 4],
      amenities: ['Free WiFi', 'Medical staff on-site', 'Special diet menu', 'Wheelchair accessible', 'Transfer to medical facilities']
    }
  };
  
  // Hotel names by destination
  const hotelNamesByDestination = {
    'Turkey': ['Grand Istanbul Hotel', 'Bosphorus Palace', 'Anatolia Suites', 'Izmir Beach Resort', 'Cappadocia Cave Hotel'],
    'Mexico': ['Cancun Paradise', 'Mexico City Plaza', 'Riviera Maya Resort', 'Cabo San Lucas Suites', 'Puerto Vallarta Inn'],
    'Morocco': ['Marrakech Riad', 'Casablanca Luxury Hotel', 'Fes Heritage Palace', 'Tangier Bay Hotel', 'Atlas Mountain Lodge'],
    'Tunisia': ['Tunis Carthage Hotel', 'Hammamet Beach Resort', 'Sousse Palace', 'Djerba Island Suites', 'Monastir Bay Hotel'],
    'Egypt': ['Cairo Pyramid View', 'Luxor Heritage Hotel', 'Sharm El Sheikh Resort', 'Alexandria Sea View', 'Hurghada Beach Palace']
  };
  
  // Get hotel names for the selected destination
  const hotelNames = hotelNamesByDestination[destination] || ['Grand Hotel', 'City Center Inn', 'Plaza Suites', 'Beach Resort', 'Mountain View Lodge'];
  
  // Get hotel type configuration
  const typeConfig = hotelTypes[accommodationType] || hotelTypes.standard;
  
  // Generate random hotels
  return hotelNames.map((name, index) => {
    const priceRange = typeConfig.priceRange;
    const price = Math.floor(priceRange[0] + Math.random() * (priceRange[1] - priceRange[0]));
    const stars = typeConfig.stars[Math.floor(Math.random() * typeConfig.stars.length)];
    
    // Select random amenities
    const allAmenities = [...typeConfig.amenities];
    const selectedAmenities = [];
    const numAmenities = Math.min(allAmenities.length, 3 + Math.floor(Math.random() * 3));
    
    for (let i = 0; i < numAmenities; i++) {
      const randomIndex = Math.floor(Math.random() * allAmenities.length);
      selectedAmenities.push(allAmenities[randomIndex]);
      allAmenities.splice(randomIndex, 1);
    }
    
    return {
      id: `hotel-${index + 1}`,
      name: name,
      location: `${destination}`,
      price: price,
      stars: stars,
      image: `https://source.unsplash.com/300x200/?hotel,${index}`,
      amenities: selectedAmenities,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      reviewCount: Math.floor(50 + Math.random() * 200)
    };
  });
};

const HotelSearchComponent = ({ onHotelSelect, destination, checkInDate, checkOutDate, guests = 1, accommodationType = 'standard' }) => {
  const [loading, setLoading] = useState(false);
  const [hotelResults, setHotelResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    destination: destination || '',
    checkInDate: checkInDate || '',
    checkOutDate: checkOutDate || '',
    guests: guests,
    accommodationType: accommodationType
  });
  const [error, setError] = useState(null);

  // Pre-fill based on props if available
  useEffect(() => {
    if (destination) {
      setSearchParams(prev => ({
        ...prev,
        destination
      }));
    }
    
    if (checkInDate) {
      setSearchParams(prev => ({
        ...prev,
        checkInDate
      }));
    }
    
    if (checkOutDate) {
      setSearchParams(prev => ({
        ...prev,
        checkOutDate
      }));
    }
    
    if (guests) {
      setSearchParams(prev => ({
        ...prev,
        guests
      }));
    }
    
    if (accommodationType) {
      setSearchParams(prev => ({
        ...prev,
        accommodationType
      }));
    }
    
    // Set default check-in date to tomorrow if not provided
    if (!checkInDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSearchParams(prev => ({
        ...prev,
        checkInDate: tomorrow.toISOString().split('T')[0]
      }));
    }
    
    // Set default check-out date to 3 days after check-in if not provided
    if (!checkOutDate && checkInDate) {
      const checkOut = new Date(checkInDate);
      checkOut.setDate(checkOut.getDate() + 3);
      setSearchParams(prev => ({
        ...prev,
        checkOutDate: checkOut.toISOString().split('T')[0]
      }));
    } else if (!checkOutDate) {
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 4);
      setSearchParams(prev => ({
        ...prev,
        checkOutDate: checkOut.toISOString().split('T')[0]
      }));
    }
  }, [destination, checkInDate, checkOutDate, guests, accommodationType]);

  const handleSearch = () => {
    if (!searchParams.destination || !searchParams.checkInDate || !searchParams.checkOutDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Use mock data
    setTimeout(() => {
      const mockHotels = generateMockHotels(
        searchParams.destination,
        searchParams.checkInDate,
        searchParams.checkOutDate,
        searchParams.guests,
        searchParams.accommodationType
      );
      setHotelResults(mockHotels);
      setLoading(false);
    }, 1500);
  };

  // Auto-search when component mounts if all required fields are filled
  useEffect(() => {
    if (searchParams.destination && searchParams.checkInDate && searchParams.checkOutDate) {
      handleSearch();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Find Your Accommodation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or country"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.destination}
              onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
              disabled={!!destination}
            />
          </div>
        </div>
        
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.checkInDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, checkInDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              disabled={!!checkInDate}
            />
          </div>
        </div>
        
        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.checkOutDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, checkOutDate: e.target.value }))}
              min={searchParams.checkInDate}
              disabled={!!checkOutDate}
            />
          </div>
        </div>
        
        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="10"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchParams.guests}
              onChange={(e) => setSearchParams(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            />
          </div>
        </div>
        
        {/* Accommodation Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none"
              value={searchParams.accommodationType}
              onChange={(e) => setSearchParams(prev => ({ ...prev, accommodationType: e.target.value }))}
            >
              <option value="standard">Standard Hotel</option>
              <option value="deluxe">Deluxe Hotel</option>
              <option value="suite">Suite</option>
              <option value="recovery">Recovery Center</option>
            </select>
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
          Search Accommodations
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {/* Hotel Results */}
      {hotelResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Accommodations</h3>
          <div className="space-y-4">
            {hotelResults.map((hotel) => (
              <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Hotel+Image";
                      }}
                    />
                  </div>
                  <div className="p-4 md:w-2/3 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{hotel.name}</h4>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{hotel.location}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {hotel.rating}/5 ({hotel.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">${hotel.price}</div>
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Amenities</h5>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded">
                            {amenity === 'Free WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                            {amenity === 'Breakfast included' && <Coffee className="h-3 w-3 mr-1" />}
                            {amenity === 'Breakfast available' && <Coffee className="h-3 w-3 mr-1" />}
                            {amenity === 'Fitness center' && <Dumbbell className="h-3 w-3 mr-1" />}
                            {amenity === 'Room service' && <Utensils className="h-3 w-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 flex justify-end">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        onClick={() => onHotelSelect(hotel)}
                      >
                        Select
                      </button>
                    </div>
                  </div>
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
            <span>Searching for the best accommodations...</span>
          </div>
        </div>
      )}
      
      {!loading && hotelResults.length === 0 && searchParams.destination && !error && (
        <div className="mt-8 text-center text-gray-600">
          <p>Enter your search criteria and click "Search Accommodations" to find available options.</p>
        </div>
      )}
    </div>
  );
};

export default HotelSearchComponent;
