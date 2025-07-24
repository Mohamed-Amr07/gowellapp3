import React from 'react';
import { Search, Activity, Scissors, Heart, Users } from 'lucide-react';

const TreatmentsPage = ({ treatments, searchQuery, setSearchQuery, setSelectedTreatment, setCurrentView }) => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Available Treatments</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {treatments
          .filter(treatment => treatment.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(treatment => {
            const IconComponent = treatment.icon;
            return (
              <div key={treatment.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{treatment.name}</h3>
                    <span className="text-sm text-gray-600">{treatment.category}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Starting from:</span>
                    <span className="font-semibold text-green-600">{treatment.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{treatment.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedTreatment(treatment); setCurrentView('booking'); }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book This Treatment
                </button>
              </div>
            );
          })}
      </div>
    </div>
  </div>
);

export default TreatmentsPage;
