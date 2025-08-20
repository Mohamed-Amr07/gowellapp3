import React, { useState } from 'react';
import ScheduleConsultation from './ScheduleConsultation';
import { Videocam } from '@mui/icons-material';

const TreatmentsPage = ({ setSelectedTreatment, setCurrentView }) => {
  const [showConsultation, setShowConsultation] = useState(false);
  const [consultationTreatment, setConsultationTreatment] = useState(null);
  const [consultationScheduled, setConsultationScheduled] = useState(false);
  const [consultationDetails, setConsultationDetails] = useState(null);

  // Medical treatments data
  const treatments = [
    {
      id: 1,
      name: 'Dental Implants',
      description: 'Replace missing teeth with permanent, natural-looking implants that function like real teeth.',
      image: '/images/treatments/dental-implants.jpg',
      benefits: [
        'Permanent solution for missing teeth',
        'Prevents bone loss in the jaw',
        'Looks and functions like natural teeth',
        'No adhesives or removal needed'
      ],
      destinations: ['Turkey', 'Mexico', 'Thailand'],
      savingsPercentage: '50-70%',
      averageCost: '$1,200 per implant',
      homeCost: '$3,000-$4,500 per implant',
      recoveryTime: '5-7 days abroad, then follow-up care at home',
      procedures: ['Single tooth implant', 'Multiple teeth implants', 'Full mouth reconstruction']
    },
    {
      id: 2,
      name: 'Cosmetic Surgery',
      description: 'Enhance your appearance with procedures performed by experienced, board-certified surgeons.',
      image: '/images/treatments/cosmetic-surgery.jpg',
      benefits: [
        'Significant cost savings',
        'Private, discreet recovery',
        'Combine with a vacation',
        'Access to top international surgeons'
      ],
      destinations: ['Turkey', 'Brazil', 'Thailand', 'Mexico'],
      savingsPercentage: '40-80%',
      averageCost: '$3,500-$8,000',
      homeCost: '$10,000-$20,000',
      recoveryTime: '7-14 days',
      procedures: ['Rhinoplasty', 'Breast augmentation', 'Facelift', 'Liposuction', 'Tummy tuck']
    },
    {
      id: 3,
      name: 'Eye Surgery',
      description: 'Correct vision problems and eye conditions with advanced surgical techniques.',
      image: '/images/treatments/eye-surgery.jpg',
      benefits: [
        'Improved vision without glasses',
        'Quick recovery time',
        'Advanced technology',
        'Experienced ophthalmologists'
      ],
      destinations: ['Turkey', 'India', 'Mexico'],
      savingsPercentage: '50-60%',
      averageCost: '$1,500-$2,000 per eye',
      homeCost: '$3,000-$4,500 per eye',
      recoveryTime: '2-5 days',
      procedures: ['LASIK', 'Cataract surgery', 'Refractive lens exchange', 'Corneal transplant']
    },
    {
      id: 4,
      name: 'Heart Surgery',
      description: 'Receive life-saving cardiac procedures at internationally accredited hospitals.',
      image: '/images/treatments/heart-surgery.jpg',
      benefits: [
        'JCI-accredited facilities',
        'No waiting lists',
        'Comprehensive care packages',
        'Significant cost savings'
      ],
      destinations: ['India', 'Turkey', 'Thailand'],
      savingsPercentage: '50-70%',
      averageCost: '$10,000-$15,000',
      homeCost: '$70,000-$200,000',
      recoveryTime: '10-14 days abroad, then follow-up care at home',
      procedures: ['Coronary artery bypass', 'Heart valve replacement', 'Angioplasty', 'Pacemaker implantation']
    },
    {
      id: 5,
      name: 'Hip Replacement',
      description: 'Restore mobility and reduce pain with total hip replacement surgery.',
      image: '/images/treatments/hip-replacement.jpg',
      benefits: [
        'Shorter waiting times',
        'Same implant brands as in the US/EU',
        'Comprehensive rehabilitation',
        'Significant cost savings'
      ],
      destinations: ['India', 'Thailand', 'Mexico', 'Turkey'],
      savingsPercentage: '60-80%',
      averageCost: '$8,000-$12,000',
      homeCost: '$30,000-$50,000',
      recoveryTime: '14-21 days',
      procedures: ['Total hip replacement', 'Hip resurfacing', 'Minimally invasive hip replacement']
    },
    {
      id: 6,
      name: 'Weight Loss Surgery',
      description: 'Achieve significant weight loss with bariatric procedures performed by specialized surgeons.',
      image: '/images/treatments/weight-loss-surgery.jpg',
      benefits: [
        'Significant long-term weight loss',
        'Improvement in obesity-related conditions',
        'Comprehensive pre and post-op care',
        'Supportive recovery environment'
      ],
      destinations: ['Mexico', 'Turkey', 'India', 'Thailand'],
      savingsPercentage: '50-70%',
      averageCost: '$5,000-$9,000',
      homeCost: '$15,000-$25,000',
      recoveryTime: '7-10 days',
      procedures: ['Gastric sleeve', 'Gastric bypass', 'Gastric band', 'Duodenal switch']
    }
  ];

  // Handle consultation scheduling
  const handleScheduleConsultation = (treatment) => {
    setConsultationTreatment(treatment);
    setShowConsultation(true);
  };

  // Handle when a consultation is scheduled
  const handleConsultationScheduled = (details) => {
    setConsultationDetails(details);
    setConsultationScheduled(true);
    setShowConsultation(false);
    
    // Show confirmation message
    alert(`Your consultation for ${consultationTreatment.name} has been scheduled. You'll receive a confirmation once the doctor approves the time.`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Medical Treatments</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {treatment.image ? (
                  <img 
                    src={treatment.image} 
                    alt={treatment.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Medical+Treatment';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-blue-500 font-medium">{treatment.name}</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{treatment.name}</h2>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-1">Popular Destinations:</h3>
                  <div className="flex flex-wrap gap-1">
                    {treatment.destinations.map((destination) => (
                      <span 
                        key={destination} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Savings:</span>
                    <span className="ml-1 font-medium text-green-600">{treatment.savingsPercentage}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Recovery:</span>
                    <span className="ml-1">{treatment.recoveryTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Abroad Cost:</span>
                    <span className="ml-1 font-medium">{treatment.averageCost}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Home Cost:</span>
                    <span className="ml-1 line-through text-gray-500">{treatment.homeCost}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => handleScheduleConsultation(treatment)}
                  >
                    <Videocam className="mr-2" />
                    Schedule Video Consultation
                  </button>
                  
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => {
                      setSelectedTreatment(treatment);
                      setCurrentView('booking');
                    }}
                  >
                    Book This Treatment
                  </button>
                  
                  <button
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedTreatment(treatment);
                      setCurrentView('treatment-detail');
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Consultation Modal */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-90vh overflow-auto">
            <ScheduleConsultation
              treatment={consultationTreatment}
              onScheduled={handleConsultationScheduled}
              onClose={() => setShowConsultation(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentsPage;
