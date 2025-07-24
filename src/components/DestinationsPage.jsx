import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

const DestinationsPage = ({ destinations, setSelectedDestination, setCurrentView }) => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Medical Tourism Destinations</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <img src={dest.image} alt={dest.name} className="w-full md:w-48 h-48 md:h-auto object-cover" />
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold">{dest.flag} {dest.name}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save {dest.savings}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{dest.city} • {dest.hospitals} partner hospitals</p>
                <div className="flex items-center mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{dest.rating} average rating</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">Avg cost: {dest.avgCost}</span>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-2">
                    {dest.specialties.map(specialty => (
                      <span key={specialty} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedDestination(dest); setCurrentView('booking'); }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Book Treatment in {dest.name}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DestinationsPage;
