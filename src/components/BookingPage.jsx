import React, { useState, useEffect } from 'react';
import FlightSearchComponent from '../components/FlightSearchComponent';
import HotelSearchComponent from '../components/HotelSearchComponent';
import ScheduleConsultation from '../components/ScheduleConsultation';
import { 
  Videocam, 
  CalendarToday, 
  AccessTime, 
  HourglassEmpty, 
  CheckCircle, 
  Update, 
  Cancel 
} from '@mui/icons-material';
import { Avatar } from '@mui/material';

// List of countries with major cities that have airports
const countriesWithCities = {
  // North America
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Dallas', 'Atlanta', 'Boston', 'Seattle', 'Denver', 'Las Vegas', 'Orlando', 'Washington DC', 'Philadelphia', 'Phoenix', 'Houston', 'San Diego', 'Detroit', 'Minneapolis', 'Portland'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Quebec City', 'Halifax', 'Winnipeg', 'Victoria'],
  
  // EU Countries
  'Austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz'],
  'Belgium': ['Brussels', 'Antwerp', 'Liege', 'Charleroi', 'Ghent'],
  'Bulgaria': ['Sofia', 'Varna', 'Burgas', 'Plovdiv'],
  'Croatia': ['Zagreb', 'Dubrovnik', 'Split', 'Zadar', 'Pula'],
  'Cyprus': ['Larnaca', 'Paphos'],
  'Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Karlovy Vary'],
  'Denmark': ['Copenhagen', 'Billund', 'Aalborg', 'Aarhus'],
  'Estonia': ['Tallinn', 'Tartu'],
  'Finland': ['Helsinki', 'Tampere', 'Oulu', 'Rovaniemi'],
  'France': ['Paris', 'Nice', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Nantes', 'Strasbourg', 'Montpellier', 'Lille'],
  'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Düsseldorf', 'Stuttgart', 'Cologne', 'Nuremberg', 'Leipzig', 'Dresden'],
  'Greece': ['Athens', 'Thessaloniki', 'Heraklion', 'Rhodes', 'Corfu'],
  'Hungary': ['Budapest', 'Debrecen'],
  'Ireland': ['Dublin', 'Cork', 'Shannon', 'Knock'],
  'Italy': ['Rome', 'Milan', 'Venice', 'Naples', 'Florence', 'Bologna', 'Catania', 'Turin', 'Palermo', 'Bari'],
  'Latvia': ['Riga'],
  'Lithuania': ['Vilnius', 'Kaunas'],
  'Luxembourg': ['Luxembourg City'],
  'Malta': ['Malta International Airport'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'Eindhoven', 'Groningen', 'Maastricht'],
  'Poland': ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Katowice', 'Poznan'],
  'Portugal': ['Lisbon', 'Porto', 'Faro', 'Funchal'],
  'Romania': ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi'],
  'Slovakia': ['Bratislava', 'Kosice'],
  'Slovenia': ['Ljubljana'],
  'Spain': ['Madrid', 'Barcelona', 'Malaga', 'Valencia', 'Seville', 'Palma de Mallorca', 'Bilbao', 'Alicante', 'Gran Canaria', 'Tenerife'],
  'Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Luleå'],
  
  // Gulf Countries
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Medina', 'Mecca'],
  'Qatar': ['Doha'],
  'Kuwait': ['Kuwait City'],
  'Bahrain': ['Manama'],
  'Oman': ['Muscat', 'Salalah']
};

// Destination countries with flag emojis
const destinationCountries = [
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Egypt', flag: '🇪🇬' },
];



 
  const BookingPage = ({ selectedTreatment, selectedDestination, setCurrentView, destinations }) => {

      const getFlightCost = (country, city, destination) => {
    // Base cost calculation
    let baseCost = 500;
    
    // Adjust based on destination
    if (destination === 'Turkey') baseCost += 300;
    else if (destination === 'Mexico') baseCost += 400;
    else if (destination === 'Morocco') baseCost += 600;
    else if (destination === 'Tunisia') baseCost += 550;
    else if (destination === 'Egypt') baseCost += 650;
    else if (destination === 'Thailand') baseCost += 800;
    else if (destination === 'India') baseCost += 750;
    else if (destination === 'Costa Rica') baseCost += 550;
    else if (destination === 'Brazil') baseCost += 650;
    else if (destination === 'Colombia') baseCost += 600;
    
    // Adjust based on departure location
    // North America
    if (country === 'United States') baseCost += 200;
    else if (country === 'Canada') baseCost += 250;
    
    // EU Countries
    else if (['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 
              'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 
              'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 
              'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 
              'Spain', 'Sweden'].includes(country)) {
      baseCost += 150;
    }
    
    // Gulf Countries
    else if (['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].includes(country)) {
      baseCost += 350;
    }
    
    return baseCost;
  };

  const calculateTotalCost = () => {
    let total = 0;
    
    // Treatment cost
    const treatmentCosts = {
      'Dental Implants': 1200,
      'Cosmetic Surgery': 3500,
      'Eye Surgery': 2000,
      'Heart Surgery': 8000,
      'Hip Replacement': 4500,
      'Weight Loss Surgery': 5000
    };
    total += treatmentCosts[formData.treatment] || 2500;
    
    // Flight cost
    if (selectedFlight) {
      total += parseFloat(selectedFlight.price.total) * formData.passengers;
    } else {
      total += getFlightCost(formData.departureCountry, formData.departureCity, formData.destination) * formData.passengers;
    }
    
    // Accommodation cost
    let nights = 0;
    if (formData.duration === '3-5') nights = 4;
    else if (formData.duration === '7-10') nights = 8;
    else if (formData.duration === '14') nights = 14;
    else if (formData.duration === '21') nights = 21;
    
    if (selectedHotel) {
      total += selectedHotel.price * nights;
    } else {
      const accommodationRates = {
        'standard': 80,
        'deluxe': 150,
        'suite': 250,
        'recovery': 120
      };
      total += nights * (accommodationRates[formData.accommodation] || 80);
    }
    
    // Transportation & support
    total += 300;
    
    // Insurance
    if (formData.insurance) {
      total += 250;
    }
    
    return total;
  };

  // All state variables must be defined at the top level of your component
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    treatment: selectedTreatment ? selectedTreatment.name : '',
    destination: selectedDestination ? selectedDestination.name : '',
    departureCountry: '',
    departureCity: '',
    date: '',
    duration: '',
    passengers: 1,
    accommodation: 'standard',
    insurance: false
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [bookingReference, setBookingReference] = useState('');
  
  // Consultation-related state
  const [showConsultation, setShowConsultation] = useState(false);
  const [consultationScheduled, setConsultationScheduled] = useState(false);
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [consultationStatus, setConsultationStatus] = useState('none'); // 'none', 'pending', 'confirmed', 'rejected', 'alternative'
  const [meetingCode, setMeetingCode] = useState('');
  const [consultationData, setConsultationData] = useState(null);

  // Use useEffect for side effects
  useEffect(() => {
    if (selectedTreatment) {
      setFormData(prev => ({ ...prev, treatment: selectedTreatment.name }));
    }
    if (selectedDestination) {
      setFormData(prev => ({ ...prev, destination: selectedDestination.name }));
    }
  }, [selectedTreatment, selectedDestination]);

  
  // Add another useEffect to update available cities when departure country changes
  useEffect(() => {
    if (formData.departureCountry && countriesWithCities[formData.departureCountry]) {
      setAvailableCities(countriesWithCities[formData.departureCountry]);
    } else {
      setAvailableCities([]);
    }
  }, [formData.departureCountry]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));

      // If changing departure country, reset the city
    if (name === 'departureCountry') {
      setFormData(prevData => ({
        ...prevData,
        departureCity: ''
      }));
    }
  };

  // This function is for direct value changes without an event object
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

      // If changing departure country, reset the city
      if (name === 'departureCountry') {
        setFormData(prevData => ({
          ...prevData,
          departureCity: ''
        }));
      }
    };

  // Handle next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle flight selection
  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    handleNextStep();
  };

  // Handle hotel selection
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    handleNextStep();
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // Generate a booking reference
    const reference = 'MT' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(reference);
    
    // In a real app, you would save the booking to your database here
    
    // Move to confirmation step
    setStep(7);
  };
  
  // Function to handle scheduling a consultation
  const handleScheduleConsultation = () => {
    setShowConsultation(true);
  };

  // Function to handle when a consultation is scheduled
  const handleConsultationScheduled = (details) => {
    setConsultationDetails(details);
    setConsultationScheduled(true);
    setConsultationStatus('pending');
    setShowConsultation(false);
    
    // In a real app, you would send this request to your backend
    // For demo purposes, we'll simulate a doctor response after a delay
    simulateDoctorResponse(details);
  };

  // Function to simulate doctor response
  const simulateDoctorResponse = (details) => {
    // Simulate a delay (3-10 seconds) for the doctor to respond
    const responseTime = 3000 + Math.random() * 7000;
    
    setTimeout(() => {
      // 80% chance of confirmation, 20% chance of rejection/reschedule
      const isConfirmed = Math.random() < 0.8;
      
      if (isConfirmed) {
        setConsultationStatus('confirmed');
        // In a real app, you would send a notification to the user
        alert(`Good news! ${details.doctor.name} has confirmed your consultation for ${new Date(details.date).toLocaleDateString()} at ${details.time}.`);
      } else {
        // Doctor suggests an alternative time
        const alternativeTime = details.time === '09:00' ? '10:00' : '09:00';
        const updatedDetails = {
          ...details,
          time: alternativeTime,
          alternativeOffered: true
        };
        
        setConsultationDetails(updatedDetails);
        setConsultationStatus('alternative');
        
        // Show alternative time dialog
        alert(`${details.doctor.name} is not available at your requested time. They suggested ${alternativeTime} instead. Please check your booking to accept or decline.`);
      }
    }, responseTime);
  };

  // Function to calculate time until consultation
  const getTimeUntilConsultation = () => {
    if (!consultationDetails) return '';
    
    const consultDate = new Date(consultationDetails.date);
    const [hours, minutes] = consultationDetails.time.split(':').map(Number);
    consultDate.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = consultDate - now;
    
    if (diffMs < 0) return 'Consultation has passed';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}, ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}, ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };

  // Function to check if consultation is joinable (within 15 minutes of start time)
  const isConsultationJoinable = () => {
    if (!consultationDetails || consultationStatus !== 'confirmed') return false;
    
    const consultDate = new Date(consultationDetails.date);
    const [hours, minutes] = consultationDetails.time.split(':').map(Number);
    consultDate.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = consultDate - now;
    
    // Joinable if less than 15 minutes until start or up to 30 minutes after start
    return diffMs < 15 * 60 * 1000 && diffMs > -30 * 60 * 1000;
  };

  // Function to join consultation
  const joinConsultation = () => {
    if (!isConsultationJoinable()) return;
    
    // In a real app, you would redirect to the video consultation page
    setCurrentView('videoConsultation');
    // You would also pass the consultation details to the video consultation component
    setMeetingCode(consultationDetails.meetingCode);
    setConsultationData({
      doctorId: consultationDetails.doctor.name,
      patientName: 'Your Name', // Replace with actual patient name
      scheduledTime: new Date(consultationDetails.date).toISOString()
    });
  };

  // Function to add to calendar
  const addToCalendar = () => {
    if (!consultationDetails) return;
    
    const consultDate = new Date(consultationDetails.date);
    const [hours, minutes] = consultationDetails.time.split(':').map(Number);
    consultDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(consultDate);
    endDate.setMinutes(endDate.getMinutes() + consultationDetails.duration);
    
    const title = `Medical Consultation with ${consultationDetails.doctor.name}`;
    const details = `Video consultation for your medical treatment. Meeting code: ${consultationDetails.meetingCode}`;
    
    // Create calendar URL (works with Google Calendar)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${consultDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(details)}`;
    
    // Open calendar in new tab
    window.open(calendarUrl, '_blank');
  };


  // If showing the consultation scheduling component
  if (showConsultation) {
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto">
          <button 
            className="mb-4 px-4 py-2 bg-gray-300 rounded flex items-center"
            onClick={() => setShowConsultation(false)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Booking
          </button>

        {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-90vh overflow-auto">
            <ScheduleConsultation
              onScheduled={handleConsultationScheduled}
              onClose={() => setShowConsultation(false)}
            />
          </div>
        </div>
      )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Medical Tourism Booking</h1>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className={`flex flex-col items-center ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {i}
              </div>
              <div className="text-xs">
                {i === 1 && 'Treatment'}
                {i === 2 && 'Flights'}
                {i === 3 && 'Accommodation'}
                {i === 4 && 'Travel Details'}
                {i === 5 && 'Add-ons'}
                {i === 6 && 'Confirm'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Step 1: Treatment & Destination */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Treatment & Destination</h2>
            {/* Treatment */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Treatment Type</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
              >
                <option value="">Select treatment</option>
                <option value="Dental Implants">Dental Implants</option>
                <option value="Cosmetic Surgery">Cosmetic Surgery</option>
                <option value="Eye Surgery">Eye Surgery</option>
                <option value="Heart Surgery">Heart Surgery</option>
                <option value="Hip Replacement">Hip Replacement</option>
                <option value="Weight Loss Surgery">Weight Loss Surgery</option>
              </select>
            </div>
            {/* Destination */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Destination</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              >
                <option value="">Select destination</option>
                {destinationCountries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Departure Country */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Departure Country</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.departureCountry}
                onChange={(e) => handleInputChange('departureCountry', e.target.value)}
              >
                <option value="">Select country</option>
                <optgroup label="North America">
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </optgroup>
                <optgroup label="European Union">
                  {Object.keys(countriesWithCities)
                    .filter(country => 
                      ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 
                      'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 
                      'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 
                      'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 
                      'Spain', 'Sweden'].includes(country))
                    .sort()
                    .map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))
                  }
                </optgroup>
                <optgroup label="Gulf Countries">
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                </optgroup>
              </select>
            </div>
            {/* Departure City */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Departure City</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.departureCity}
                onChange={(e) => handleInputChange('departureCity', e.target.value)}
                disabled={!formData.departureCountry}
              >
                <option value="">Select city</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {!formData.departureCountry && (
                <p className="text-sm text-gray-500 mt-1">Please select a country first</p>
              )}
            </div>
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(2)}
              disabled={!formData.treatment || !formData.destination || !formData.departureCountry || !formData.departureCity}
            >
              Next
            </button>
          </div>
        )}
        
        {/* Step 2: Flight Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Your Flight</h2>
            <FlightSearchComponent
              onFlightSelect={handleFlightSelect}
              departureCountry={formData.departureCountry}
              departureCity={formData.departureCity}
              destination={formData.destination}
              passengers={formData.passengers}
            />
            
            {selectedFlight && (
              <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                <h3 className="font-semibold text-green-800">Flight Selected</h3>
                <p className="text-green-700">
                  From: {selectedFlight.itineraries[0].segments[0].departure.iataCode} at {new Date(selectedFlight.itineraries[0].segments[0].departure.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-green-700">
                  To: {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode} at {new Date(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-green-700">
                  Price: ${selectedFlight.price.total} per person
                </p>
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setStep(3)}
              >
                Continue to Accommodation
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Accommodation Selection */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Your Accommodation</h2>
            <HotelSearchComponent
              destination={formData.destination}
              checkInDate={formData.date}
              checkOutDate={formData.date ? new Date(new Date(formData.date).getTime() + (formData.duration === '3-5' ? 4 : formData.duration === '7-10' ? 8 : formData.duration === '14' ? 14 : 21) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''}
              guests={formData.passengers}
              onHotelSelect={handleHotelSelect}
              accommodationType={formData.accommodation}
            />
            
            {selectedHotel && (
              <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                <h3 className="font-semibold text-green-800">Accommodation Selected</h3>
                <p className="text-green-700">
                  {selectedHotel.name}, {selectedHotel.location}
                </p>
                <p className="text-green-700">
                  ${selectedHotel.price} per night
                </p>
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setStep(4)}
              >
                Continue to Travel Details
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Travel Details */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Travel Details</h2>
            {/* Date */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Preferred Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-2"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {/* Duration */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Duration</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              >
                <option value="">Select duration</option>
                <option value="3-5">3-5 days</option>
                <option value="7-10">1 week</option>
                <option value="14">2 weeks</option>
                <option value="21">3 weeks</option>
              </select>
            </div>
            {/* Passengers */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Number of Travelers</label>
              <input
                type="number"
                min={1}
                max={10}
                className="w-full border border-gray-300 rounded p-2"
                value={formData.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
              />
            </div>
            {/* Accommodation Type (if no hotel selected) */}
            {!selectedHotel && (
              <div className="mb-4">
                <label className="block mb-1 font-medium">Accommodation Type</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                >
                  <option value="standard">Standard Hotel</option>
                  <option value="deluxe">Deluxe Hotel</option>
                  <option value="suite">Suite</option>
                  <option value="recovery">Recovery Center</option>
                </select>
              </div>
            )}
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(5)}
              disabled={!formData.date || !formData.duration}
            >
              Next
            </button>
            {/* Back Button */}
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setStep(3)}
            >
              Back
            </button>
          </div>
        )}
        
        {/* Step 5: Additional Services */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
            
            {/* Insurance */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5"
                  checked={formData.insurance}
                  onChange={(e) => handleInputChange('insurance', e.target.checked)}
                />
                <span>Travel & Medical Insurance ($250)</span>
              </label>
              <p className="text-sm text-gray-600 ml-7 mt-1">
                Comprehensive insurance covering medical emergencies, trip cancellation, and personal belongings.
              </p>
            </div>
            
            {/* Transportation Services */}
            <div className="p-4 bg-blue-50 rounded mb-4">
              <h3 className="font-medium text-blue-800 mb-2">Included Services</h3>
              <ul className="list-disc pl-5 text-blue-700">
                <li>Airport pickup and drop-off</li>
                <li>Transportation to medical facility</li>
                <li>24/7 support from local representative</li>
                <li>Translation services during medical consultations</li>
              </ul>
            </div>
            
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(6)}
            >
              Review Booking
            </button>
            {/* Back Button */}
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setStep(4)}
            >
              Back
            </button>
          </div>
        )}
        
        {/* Step 6: Booking Summary - Add the consultation button here */}
        {step === 6 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Treatment Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Treatment:</div>
                <div>{formData.treatment}</div>
                <div className="text-gray-600">Destination:</div>
                <div>
                  {destinationCountries.find(c => c.name === formData.destination)?.flag || ''} {formData.destination}
                </div>
                <div className="text-gray-600">Date:</div>
                <div>{formData.date}</div>
                <div className="text-gray-600">Duration:</div>
                <div>
                  {formData.duration === '3-5' ? '3-5 days' : 
                   formData.duration === '7-10' ? '1 week' : 
                   formData.duration === '14' ? '2 weeks' : 
                   formData.duration === '21' ? '3 weeks' : ''}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Travel Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Departure:</div>
                <div>{formData.departureCity}, {formData.departureCountry}</div>
                <div className="text-gray-600">Travelers:</div>
                <div>{formData.passengers}</div>
              </div>
              
              {selectedFlight && (
                <div className="mt-3 border-t pt-3">
                  <h4 className="font-medium">Selected Flight</h4>
                  <div className="text-sm">
                    <p>From: {selectedFlight.itineraries[0].segments[0].departure.iataCode} at {new Date(selectedFlight.itineraries[0].segments[0].departure.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p>To: {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode} at {new Date(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p>Price: ${selectedFlight.price.total} per person</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Accommodation</h3>
              {selectedHotel ? (
                <div>
                  <p className="font-medium">{selectedHotel.name}</p>
                  <p>{selectedHotel.location}</p>
                  <p>${selectedHotel.price} per night</p>
                </div>
              ) : (
                <div>
                  <p>{formData.accommodation === 'standard' ? 'Standard Hotel' : 
                      formData.accommodation === 'deluxe' ? 'Deluxe Hotel' : 
                      formData.accommodation === 'suite' ? 'Suite' : 
                      'Recovery Center'}</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Additional Services</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Insurance:</div>
                <div>{formData.insurance ? 'Yes' : 'No'}</div>
                <div className="text-gray-600">Transportation:</div>
                <div>Included</div>
                <div className="text-gray-600">Support Services:</div>
                <div>Included</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Cost Breakdown</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Treatment:</div>
                <div>${
                  formData.treatment === 'Dental Implants' ? '1,200' :
                  formData.treatment === 'Cosmetic Surgery' ? '3,500' :
                  formData.treatment === 'Eye Surgery' ? '2,000' :
                  formData.treatment === 'Heart Surgery' ? '8,000' :
                  formData.treatment === 'Hip Replacement' ? '4,500' :
                  formData.treatment === 'Weight Loss Surgery' ? '5,000' : '2,500'
                }</div>
                
                <div className="text-gray-600">Flight:</div>
                <div>${selectedFlight ? 
                  (parseFloat(selectedFlight.price.total) * formData.passengers).toFixed(2) : 
                  (getFlightCost(formData.departureCountry, formData.departureCity, formData.destination) * formData.passengers).toFixed(2)
                }</div>
                
                <div className="text-gray-600">Accommodation:</div>
                <div>${
                  selectedHotel ? 
                  (selectedHotel.price * (
                    formData.duration === '3-5' ? 4 : 
                    formData.duration === '7-10' ? 8 : 
                    formData.duration === '14' ? 14 : 21
                  )).toFixed(2) : 
                  ((formData.accommodation === 'standard' ? 80 : 
                    formData.accommodation === 'deluxe' ? 150 : 
                    formData.accommodation === 'suite' ? 250 : 120) * (
                    formData.duration === '3-5' ? 4 : 
                    formData.duration === '7-10' ? 8 : 
                    formData.duration === '14' ? 14 : 21
                  )).toFixed(2)
                }</div>
                
                <div className="text-gray-600">Transportation & Support:</div>
                <div>$300.00</div>
                
                {formData.insurance && (
                  <>
                    <div className="text-gray-600">Insurance:</div>
                    <div>$250.00</div>
                  </>
                )}
                
                <div className="font-medium text-gray-800 border-t mt-2 pt-2">Total:</div>
                <div className="font-medium text-gray-800 border-t mt-2 pt-2">${calculateTotalCost().toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Pre-Treatment Consultation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a video consultation with a specialist doctor to discuss your treatment before your trip.
              </p>

              {consultationScheduled ? (
                <div className="bg-green-100 p-4 rounded-md">
                  <p className="font-medium text-green-800 mb-2">
                    Consultation Scheduled!
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-green-700 mb-3">
                    <div className="flex items-center">
                      <CalendarToday fontSize="small" className="mr-1" />
                      <span>Date:</span>
                    </div>
                    <div>{new Date(consultationDetails.date).toLocaleDateString()}</div>
                    
                    <div className="flex items-center">
                      <AccessTime fontSize="small" className="mr-1" />
                      <span>Time:</span>
                    </div>
                    <div>{consultationDetails.time}</div>
                    
                    <div>Doctor:</div>
                    <div>{consultationDetails.doctor.name}</div>
                    
                    <div>Specialty:</div>
                    <div>{consultationDetails.doctor.specialty}</div>
                    
                    <div>Meeting Code:</div>
                    <div>{consultationDetails.meetingCode}</div>
                  </div>
                  
                  <p className="text-xs text-green-700 italic mb-3">
                    You'll receive a reminder email 30 minutes before your consultation.
                  </p>
                  
                  <button
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={addToCalendar}
                  >
                    Add to Calendar
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleScheduleConsultation}
                >
                  <Videocam className="mr-2" />
                  Schedule Video Consultation
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setStep(5)}
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
        
        {/* Step 7: Booking Confirmation */}
      {step === 7 && (
        <div className="text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          
          <h2 className="text-2xl font-semibold mb-4">Booking Confirmed!</h2>
          <p className="mb-2">Thank you for choosing our medical tourism service.</p>
          <p className="mb-6">Your booking reference is: <span className="font-bold">{bookingReference}</span></p>
          
          {!consultationScheduled && (
            <div className="max-w-md mx-auto mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Pre-Treatment Consultation</h3>
              <p className="mb-4">Schedule a video consultation with a specialist to discuss your treatment plan before your trip.</p>
              <button 
                className="flex items-center justify-center w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleScheduleConsultation}
              >
                <Videocam className="mr-2" />
                Schedule Video Consultation
              </button>
            </div>
          )}
          
          {consultationScheduled && (
            <div className="max-w-md mx-auto mb-6 p-4 bg-blue-50 rounded-lg text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">Your Video Consultation</h3>
                {consultationStatus === 'pending' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <HourglassEmpty fontSize="small" className="mr-1" style={{ fontSize: '14px' }} />
                    Awaiting Doctor Confirmation
                  </span>
                )}
                {consultationStatus === 'confirmed' && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <CheckCircle fontSize="small" className="mr-1" style={{ fontSize: '14px' }} />
                    Confirmed
                  </span>
                )}
                {consultationStatus === 'alternative' && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Update fontSize="small" className="mr-1" style={{ fontSize: '14px' }} />
                    Alternative Time Offered
                  </span>
                )}
                {consultationStatus === 'rejected' && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Cancel fontSize="small" className="mr-1" style={{ fontSize: '14px' }} />
                    Needs Rescheduling
                  </span>
                )}
              </div>
              
              {consultationStatus === 'pending' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                  <p className="text-sm text-yellow-700">
                    Your consultation request has been sent to {consultationDetails.doctor.name}. 
                    You'll receive a notification once they confirm the appointment time.
                  </p>
                </div>
              )}
              
                            {consultationStatus === 'alternative' && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                  <p className="text-sm text-blue-700 mb-2">
                    {consultationDetails.doctor.name} suggested an alternative time: <strong>{consultationDetails.time}</strong> on the same day.
                  </p>
                  <div className="flex gap-2">
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => {
                        setConsultationStatus('confirmed');
                        setConsultationDetails({
                          ...consultationDetails,
                          alternativeOffered: false
                        });
                        alert(`Consultation confirmed for ${new Date(consultationDetails.date).toLocaleDateString()} at ${consultationDetails.time}.`);
                      }}
                    >
                      Accept Time
                    </button>
                    <button 
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                      onClick={() => {
                        setConsultationStatus('rejected');
                        alert(`You declined the alternative time. Please try scheduling again with a different time or doctor.`);
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
              
              {consultationStatus === 'rejected' && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4">
                  <p className="text-sm text-red-700 mb-2">
                    The doctor was unavailable at your requested time. Please schedule a new consultation.
                  </p>
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    onClick={handleScheduleConsultation}
                  >
                    Reschedule
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center">
                  <CalendarToday fontSize="small" className="mr-1" />
                  <span className="font-medium">Date:</span>
                </div>
                <div>{new Date(consultationDetails.date).toLocaleDateString()}</div>
                
                <div className="flex items-center">
                  <AccessTime fontSize="small" className="mr-1" />
                  <span className="font-medium">Time:</span>
                </div>
                <div>{consultationDetails.time}</div>
                
                <div className="font-medium">Doctor:</div>
                <div className="flex items-center">
                  <Avatar 
                    src={consultationDetails.doctor.photo} 
                    alt={consultationDetails.doctor.name}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  {consultationDetails.doctor.name}
                </div>
                
                <div className="font-medium">Specialty:</div>
                <div>{consultationDetails.doctor.specialty}</div>
                
                {consultationStatus === 'confirmed' && (
                  <>
                    <div className="font-medium">Meeting Code:</div>
                    <div className="font-mono">{consultationDetails.meetingCode}</div>
                  </>
                )}
              </div>
              
              {consultationStatus === 'confirmed' && (
                <>
                  <div className="bg-white p-3 rounded-md mb-4">
                    <p className="font-medium mb-1">Time until consultation:</p>
                    <p className="text-lg font-bold text-blue-600">{getTimeUntilConsultation()}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`flex items-center px-4 py-2 ${
                        isConsultationJoinable() 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white rounded-md transition-colors`}
                      onClick={joinConsultation}
                      disabled={!isConsultationJoinable()}
                    >
                      <Videocam className="mr-2" />
                      {isConsultationJoinable() ? 'Join Consultation' : 'Join (Not Available Yet)'}
                    </button>
                    
                    <button
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      onClick={addToCalendar}
                    >
                      Add to Calendar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              // Reset the form and go back to step 1
              setStep(1);
              setFormData({
                treatment: '',
                destination: '',
                departureCountry: '',
                departureCity: '',
                date: '',
                duration: '',
                passengers: 1,
                accommodation: 'standard',
                insurance: false
              });
              setSelectedFlight(null);
              setSelectedHotel(null);
              setBookingReference('');
              // Note: We're not resetting consultation details so the user can still join it
            }}
          >
            Book Another Trip
          </button>
        </div>
      )}

      {/* Schedule Consultation Modal */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-90vh overflow-auto">
            <ScheduleConsultation
              onScheduled={handleConsultationScheduled}
              onClose={() => setShowConsultation(false)}
            />
          </div>
        </div>
      )}
    </div>
        </div>
  );
};

export default BookingPage;
