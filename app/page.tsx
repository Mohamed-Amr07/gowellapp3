'use client';

import React, { useState, useEffect } from 'react';
import Header from '../src/components/Header'
import DestinationsPage from '../src/components/DestinationsPage'
import TreatmentsPage from '../src/components/TreatmentsPage'
import BookingPage from '../src/components/BookingPage'
import Footer from '../src/components/Footer'
import HomePage from '../src/components/HomePage'
import VideoConsultation from '../src/components/VideoConsultation'
import ConsultationDashboard from '../src/components/ConsultationDashboard'
import ConsultationReminder from '../src/components/ConsultationReminder'
import DestinationList from '../pages/api/flights/DestinationList';
import TreatmentList from '../pages/api/flights/TreatmentList';
import FlightCalculator from '../pages/api/flights/FlightCalculator';

// Add environment variables for API keys (in a real app, these would be in .env files)
if (typeof window !== 'undefined') {
  window.process = {
    ...window.process,
    env: {
      ...window.process?.env,
      NEXT_PUBLIC_AMADEUS_API_KEY: 'YOUR_AMADEUS_API_KEY',
      NEXT_PUBLIC_AMADEUS_API_SECRET: 'YOUR_AMADEUS_API_SECRET'
    }
  };
}

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [bookingReference, setBookingReference] = useState('');
  const [meetingCode, setMeetingCode] = useState('');
  const [consultationData, setConsultationData] = useState(null);
  const [upcomingConsultation, setUpcomingConsultation] = useState(null);
  const [showReminder, setShowReminder] = useState(false);

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
      hospitals: 12,
      airportCode: 'CMN'
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
      hospitals: 8,
      airportCode: 'TUN'
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
      hospitals: 15,
      airportCode: 'CAI'
    },
    {
      id: 4,
      name: 'Turkey',
      city: 'Istanbul',
      flag: '🇹🇷',
      savings: '60%',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=300&h=200&fit=crop',
      specialties: ['Hair Transplant', 'Cosmetic', 'Dental'],
      avgCost: '$3,200',
      rating: 4.9,
      hospitals: 25,
      airportCode: 'IST'
    },
    {
      id: 5,
      name: 'Mexico',
      city: 'Cancun',
      flag: '🇲🇽',
      savings: '68%',
      image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=300&h=200&fit=crop',
      specialties: ['Dental', 'Cosmetic', 'Bariatric'],
      avgCost: '$2,600',
      rating: 4.5,
      hospitals: 10,
      airportCode: 'CUN'
    }
  ];

  const treatments = [
    { id: 1, name: 'Dental Implants', icon: 'Activity', category: 'Dental', price: '$1,200', duration: '3-5 days' },
    { id: 2, name: 'Cosmetic Surgery', icon: 'Scissors', category: 'Cosmetic', price: '$3,500', duration: '7-10 days' },
    { id: 3, name: 'Eye Surgery', icon: 'Activity', category: 'Ophthalmology', price: '$2,000', duration: '2-3 days' },
    { id: 4, name: 'Heart Surgery', icon: 'Heart', category: 'Cardiology', price: '$8,000', duration: '10-14 days' },
    { id: 5, name: 'Hip Replacement', icon: 'Users', category: 'Orthopedic', price: '$4,500', duration: '5-7 days' },
    { id: 6, name: 'Weight Loss Surgery', icon: 'Activity', category: 'Bariatric', price: '$5,000', duration: '3-5 days' },
  ];

    // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bookingReference: 'MT123456'
  };
  
  // Check for upcoming consultations
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const checkForUpcomingConsultations = () => {
      // Mock upcoming consultation
      const mockConsultation = {
        id: 'c1',
        doctorName: 'Dr. Sarah Smith',
        doctorSpecialty: 'Dental Surgery',
        doctorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
        date: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        time: new Date().getHours() + ':' + (new Date().getMinutes() + 10).toString().padStart(2, '0'),
        duration: 30, // minutes
        meetingCode: 'VC-ABC123',
        status: 'scheduled',
        notes: 'Pre-treatment consultation for dental implants'
      };
      
      setUpcomingConsultation(mockConsultation);
      setShowReminder(true);
    };
    
    // Check on load and then every 5 minutes
    checkForUpcomingConsultations();
    const timer = setInterval(checkForUpcomingConsultations, 5 * 60 * 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle joining a consultation
  const handleJoinConsultation = (consultation) => {
    setMeetingCode(consultation.meetingCode);
    setConsultationData({
      doctorId: consultation.doctorName,
      patientName: userData.name,
      scheduledTime: new Date(consultation.date).toISOString()
    });
    setCurrentView('videoConsultation');
  };
  
  // Handle dismissing the reminder
  const handleDismissReminder = () => {
    setShowReminder(false);
  };

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
      {currentView === 'consultations' && (
        <ConsultationDashboard
          bookingReference={userData.bookingReference}
          patientName={userData.name}
        />
      )}
    {currentView === 'videoConsultation' && (
      <VideoConsultation
        bookingReference={meetingCode}
        doctorId={consultationData?.doctor?.name}
        patientName={consultationData?.patientName}
        scheduledTime={consultationData?.scheduledTime}
      />
    )}

      {/* Consultation Reminder */}
      {showReminder && (
        <ConsultationReminder
          consultation={upcomingConsultation}
          onJoin={handleJoinConsultation}
          onDismiss={handleDismissReminder}
        />
      )}

      <Footer />
    </div>
  );
}
