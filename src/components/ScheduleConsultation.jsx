// src/components/ScheduleConsultation.jsx
import React, { useState } from 'react';
import { Videocam, CalendarToday, AccessTime, Close, Star, StarHalf, StarOutline } from '@mui/icons-material';

const ScheduleConsultation = ({ treatment, onScheduled, onClose }) => {
  // State variables
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [consultationDetails, setConsultationDetails] = useState(null);
  
  // Mock data for available doctors
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Dental Surgery',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4.8,
      experience: '12 years',
      consultationFee: '$75',
      languages: ['English', 'Spanish'],
      availability: ['Monday', 'Wednesday', 'Friday']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cosmetic Surgery',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.9,
      experience: '15 years',
      consultationFee: '$90',
      languages: ['English', 'Mandarin'],
      availability: ['Tuesday', 'Thursday', 'Saturday']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Ophthalmology',
      photo: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 4.7,
      experience: '10 years',
      consultationFee: '$70',
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: ['Monday', 'Tuesday', 'Thursday']
    }
  ];
  
  // Filter doctors based on treatment if provided
  const filteredDoctors = treatment 
    ? doctors.filter(doctor => {
        // Match doctors with relevant specialties for the treatment
        const specialtyMap = {
          'Dental Implants': ['Dental Surgery'],
          'Cosmetic Surgery': ['Cosmetic Surgery', 'Plastic Surgery'],
          'Eye Surgery': ['Ophthalmology'],
          'Heart Surgery': ['Cardiology', 'Cardiac Surgery'],
          'Hip Replacement': ['Orthopedic Surgery'],
          'Weight Loss Surgery': ['Bariatric Surgery']
        };
        
        return specialtyMap[treatment.name]?.includes(doctor.specialty) || false;
      })
    : doctors;
  
  // Available time slots
  const availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];
  
  // Function to render star ratings
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="text-yellow-400" fontSize="small" />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-400" fontSize="small" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={`empty-${i}`} className="text-yellow-400" fontSize="small" />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  // Handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  // Handle time selection
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  
  // Handle scheduling confirmation
  const handleSchedule = () => {
    // Generate a meeting code
    const meetingCode = 'VC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Create consultation details
    const details = {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      meetingCode: meetingCode,
      duration: 30, // minutes
      status: 'pending', // Add status field to track doctor confirmation
      treatment: treatment ? treatment.name : null // Add treatment information
    };
    
    setConsultationDetails(details);
    setConfirmDialogOpen(true);
  };
  
  // Handle final confirmation
  const handleConfirm = () => {
    setConfirmDialogOpen(false);
    
    // Call the onScheduled callback with the consultation details
    if (onScheduled) {
      onScheduled(consultationDetails);
    }
  };
  
  // Generate available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for simplicity
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };
  
  const availableDates = getAvailableDates();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Schedule Video Consultation</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <Close />
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">
        Consult with a specialist before your treatment to discuss your medical history, treatment options, and any concerns you may have.
      </p>
      
      {/* If treatment is provided, show it in the header */}
      {treatment && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            You're scheduling a consultation about <strong>{treatment.name}</strong>. 
            The doctor will be prepared to discuss this specific treatment with you.
          </p>
        </div>
      )}
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-700">
          Please note: Your selected time is a request. The doctor will need to confirm the appointment. You'll receive a notification once the doctor confirms.
        </p>
      </div>
      
      {/* Doctor Selection */}
      <h3 className="text-xl font-medium mb-4">Select a Doctor</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredDoctors.map((doctor) => (
          <div 
            key={doctor.id}
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
              selectedDoctor?.id === doctor.id ? 'border-blue-500 ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="p-4">
              <div className="flex mb-3">
                <img 
                  src={doctor.photo} 
                  alt={doctor.name}
                  className="w-14 h-14 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="font-medium">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  {renderRating(doctor.rating)}
                </div>
              </div>
              
              <div className="border-t border-gray-100 my-2 pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Experience:</span>
                  <span>{doctor.experience}</span>
                </div>
                
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Fee:</span>
                  <span>{doctor.consultationFee}</span>
                </div>
                
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang) => (
                      <span 
                        key={lang}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available on:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availability.map((day) => (
                      <span 
                        key={day}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 border-t">
              <button 
                className={`w-full py-1.5 rounded text-sm ${
                  selectedDoctor?.id === doctor.id
                    ? 'bg-blue-600 text-white'
                    : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => handleDoctorSelect(doctor)}
              >
                {selectedDoctor?.id === doctor.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Date and Time Selection */}
      {selectedDoctor && (
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">Select Date and Time</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={selectedDate}
                onChange={handleDateChange}
              >
                <option value="">Select a date</option>
                {availableDates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={selectedTime}
                onChange={handleTimeChange}
                disabled={!selectedDate}
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {!selectedDate && (
                <p className="text-xs text-gray-500 mt-1">Please select a date first</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule Button */}
      <div className="flex justify-end mt-6">
        <button 
          className={`flex items-center px-4 py-2 rounded ${
            !selectedDoctor || !selectedDate || !selectedTime
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={!selectedDoctor || !selectedDate || !selectedTime}
          onClick={handleSchedule}
        >
          <Videocam className="mr-2" />
          Schedule Consultation
        </button>
      </div>
      
      {/* Confirmation Dialog */}
      {confirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Consultation Request</h3>
            
            {consultationDetails && (
              <div>
                <p className="mb-3">
                  You are requesting a video consultation with:
                </p>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={consultationDetails.doctor.photo} 
                    alt={consultationDetails.doctor.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{consultationDetails.doctor.name}</h4>
                    <p className="text-sm text-gray-600">{consultationDetails.doctor.specialty}</p>
                  </div>
                </div>
                
                {/* Show treatment information if available */}
                {consultationDetails.treatment && (
                  <div className="mb-3 p-2 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Treatment:</strong> {consultationDetails.treatment}
                    </p>
                  </div>
                )}
                
                <div className="border-t border-b py-3 my-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <CalendarToday fontSize="small" className="text-blue-600 mr-2" />
                      <span className="text-sm">
                        {new Date(consultationDetails.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                                        <div className="flex items-center">
                      <AccessTime fontSize="small" className="text-blue-600 mr-2" />
                      <span className="text-sm">
                        {consultationDetails.time} ({consultationDetails.duration} minutes)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    The doctor will need to confirm this time. You'll receive a notification once confirmed.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-sm">
                    Meeting Code: <strong>{consultationDetails.meetingCode}</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    You'll need this code to join the consultation. It will also be sent to your email.
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  By confirming, you agree to the consultation fee of {consultationDetails.doctor.consultationFee} which will be added to your total treatment cost.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => setConfirmDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleConfirm}
                  >
                    Request Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleConsultation;

