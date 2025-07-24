import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold">MediTravel</span>
          </div>
          <p className="text-gray-300">
            Your trusted partner for affordable, quality medical care worldwide.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Medical Treatments</li>
            <li>Travel Booking</li>
            <li>Accommodation</li>
            <li>Transportation</li>
            <li>Insurance</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Destinations</h3>
          <ul className="space-y-2 text-gray-300">
            <li>🇲🇦 Morocco</li>
            <li>🇹🇳 Tunisia</li>
            <li>🇪🇬 Egypt</li>
            <li>🇹🇷 Turkey</li>
            <li>🇲🇽 Mexico</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>info@meditravel.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 MediTravel. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
);

export default Footer;
