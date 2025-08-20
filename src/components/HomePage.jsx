import React from 'react';
import { Heart, Star, Plane, Hotel, Car, Shield } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Morocco',
    city: 'Casablanca',
    flag: '🇲🇦',
    savings: '70%',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa1Rs5LhMh3KKAfLNR4lSmyRM6suxxNbosw&s',
    specialties: ['Dental', 'Cosmetic', 'Orthopedic'],
    avgCost: '$2,500',
    rating: 4.8,
    hospitals: 12
  },
  {
    id: 2,
    name: 'Tunisia',
    city: 'Tunis',
    flag: '🇹🇳',
    savings: '65%',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ76ylHXRwYY97LNQcaXmgaFCqzH4SUWm1CSw&s',
    specialties: ['Cosmetic', 'Dental', 'Cardiology'],
    avgCost: '$2,800',
    rating: 4.7,
    hospitals: 8
  },
  {
    id: 3,
    name: 'Egypt',
    city: 'Cairo',
    flag: '🇪🇬',
    savings: '75%',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D9%87%D9%88%D9%84_-_%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D9%87.JPG/1024px-%D8%A7%D8%A8%D9%88_%D8%A7%D9%84%D9%87%D9%88%D9%84_-_%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D9%87.JPG',
    specialties: ['Eye Surgery', 'Dental', 'Orthopedic'],
    avgCost: '$2,200',
    rating: 4.6,
    hospitals: 15
  },
];

const HomePage = ({ setCurrentView }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            World-Class Healthcare at Affordable Prices
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Combine quality medical treatment with an unforgettable vacation experience. Save up to 75% on medical procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentView('treatments')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Treatments
            </button>
            <button 
              onClick={() => setCurrentView('destinations')}
              className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Destinations
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">70</div>
            <div className="text-gray-600">Partner Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">75%</div>
            <div className="text-gray-600">Cost Savings</div>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Complete Medical Tourism Solution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <Plane className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flight Booking</h3>
            <p className="text-gray-600">Best prices on international flights to your medical destination</p>
          </div>
          <div className="text-center p-6">
            <Hotel className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Accommodation</h3>
            <p className="text-gray-600">Recovery-friendly hotels near medical facilities</p>
          </div>
          <div className="text-center p-6">
            <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transportation</h3>
            <p className="text-gray-600">Airport transfers and medical facility transport</p>
          </div>
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Medical Care</h3>
            <p className="text-gray-600">Certified hospitals with international standards</p>
          </div>
        </div>
      </div>
    </div>

    {/* Popular Destinations */}
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map(dest => (
            <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{dest.flag} {dest.name}</h3>
                  <span className="text-green-600 font-semibold">Save {dest.savings}</span>
                </div>
                <p className="text-gray-600 mb-4">{dest.city} • {dest.hospitals} hospitals</p>
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{dest.rating} rating</span>
                </div>
                <button 
                  onClick={() => {setCurrentView('destinations');}}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore {dest.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
