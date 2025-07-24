'use client';

import React, { useState } from 'react';
import Header from '../src/components/Header'
import DestinationsPage from '../src/components/DestinationsPage'
import TreatmentsPage from '../src/components/TreatmentsPage'
import BookingPage from '../src/components/BookingPage'
import Footer from '../src/components/Footer'
import HomePage from '../src/components/HomePage'

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const destinations = [
    {
      id: 1,
      name: 'Morocco',
      city: 'Casablanca',
      flag: '🇲🇦',
      savings: '70%',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73073?w=300&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1583137119882-c4b20fa2c3bb?w=300&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73073?w=300&h=200&fit=crop',
      specialties: ['Eye Surgery', 'Dental', 'Orthopedic'],
      avgCost: '$2,200',
      rating: 4.6,
      hospitals: 15
    },
  ];

  const treatments = [
    { id: 1, name: 'Dental Implants', icon: 'Activity', category: 'Dental', price: '$1,200', duration: '3-5 days' },
    { id: 2, name: 'Cosmetic Surgery', icon: 'Scissors', category: 'Cosmetic', price: '$3,500', duration: '7-10 days' },
    { id: 3, name: 'Eye Surgery', icon: 'Activity', category: 'Ophthalmology', price: '$2,000', duration: '2-3 days' },
    { id: 4, name: 'Heart Surgery', icon: 'Heart', category: 'Cardiology', price: '$8,000', duration: '10-14 days' },
    { id: 5, name: 'Hip Replacement', icon: 'Users', category: 'Orthopedic', price: '$4,500', duration: '5-7 days' },
    { id: 6, name: 'Weight Loss Surgery', icon: 'Activity', category: 'Bariatric', price: '$5,000', duration: '3-5 days' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {currentView === 'home' && <HomePage setCurrentView={setCurrentView} />}
      {currentView === 'destinations' && (
        <DestinationsPage
          destinations={destinations}
          setSelectedDestination={setSelectedDestination}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'treatments' && (
        <TreatmentsPage
          treatments={treatments}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedTreatment={setSelectedTreatment}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'booking' && (
        <BookingPage
          selectedTreatment={selectedTreatment}
          selectedDestination={selectedDestination}
          setCurrentView={setCurrentView}
            destinations={destinations}
        />
      )}

      <Footer />
    </div>
  );
}
