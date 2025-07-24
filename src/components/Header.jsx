import React from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = ({ setCurrentView, mobileMenuOpen, setMobileMenuOpen }) => (
  <header className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">MediTravel</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => setCurrentView('home')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
            Home
          </button>
          <button onClick={() => setCurrentView('destinations')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
            Destinations
          </button>
          <button onClick={() => setCurrentView('treatments')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
            Treatments
          </button>
          <button onClick={() => setCurrentView('booking')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
            Book Now
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-blue-600">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
    {mobileMenuOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <button onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</button>
          <button onClick={() => { setCurrentView('destinations'); setMobileMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Destinations</button>
          <button onClick={() => { setCurrentView('treatments'); setMobileMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Treatments</button>
          <button onClick={() => { setCurrentView('booking'); setMobileMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Book Now</button>
        </div>
      </div>
    )}
  </header>
);

export default Header;
