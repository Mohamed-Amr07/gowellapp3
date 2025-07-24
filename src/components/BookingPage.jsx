import React, { useState } from 'react';

const departureCountries = [
  { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Boston'], region: 'North America', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'], region: 'North America', flag: '🇨🇦' },
  { code: 'UK', name: 'United Kingdom', cities: ['London', 'Manchester', 'Edinburgh'], region: 'Europe', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'], region: 'Europe', flag: '🇩🇪' },
  { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice'], region: 'Europe', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', cities: ['Rome', 'Milan', 'Naples', 'Venice'], region: 'Europe', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville'], region: 'Europe', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', cities: ['Amsterdam', 'Rotterdam', 'The Hague'], region: 'Europe', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', cities: ['Brussels', 'Antwerp', 'Ghent'], region: 'Europe', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', cities: ['Zurich', 'Geneva', 'Basel'], region: 'Europe', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', cities: ['Vienna', 'Salzburg', 'Innsbruck'], region: 'Europe', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', cities: ['Stockholm', 'Gothenburg', 'Malmö'], region: 'Europe', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', cities: ['Oslo', 'Bergen', 'Trondheim'], region: 'Europe', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', cities: ['Copenhagen', 'Aarhus', 'Odense'], region: 'Europe', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', cities: ['Helsinki', 'Tampere', 'Turku'], region: 'Europe', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', cities: ['Warsaw', 'Krakow', 'Gdansk'], region: 'Europe', flag: '🇵🇱' },
  { code: 'IE', name: 'Ireland', cities: ['Dublin', 'Cork', 'Galway'], region: 'Europe', flag: '🇮🇪' },
  { code: 'AE', name: 'United Arab Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'], region: 'Gulf Countries', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'], region: 'Gulf Countries', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', cities: ['Doha', 'Al Wakrah', 'Al Rayyan'], region: 'Gulf Countries', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', cities: ['Kuwait City', 'Al Ahmadi', 'Hawalli'], region: 'Gulf Countries', flag: '🇰🇼' },
  { code: 'BH', name: 'Bahrain', cities: ['Manama', 'Muharraq', 'Riffa'], region: 'Gulf Countries', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'], region: 'Gulf Countries', flag: '🇴🇲' },
  { code: 'JO', name: 'Jordan', cities: ['Amman', 'Irbid', 'Aqaba'], region: 'Gulf Countries', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', cities: ['Beirut', 'Tripoli', 'Sidon'], region: 'Gulf Countries', flag: '🇱🇧' },
  { code: 'IQ', name: 'Iraq', cities: ['Baghdad', 'Basra', 'Erbil', 'Mosul'], region: 'Gulf Countries', flag: '🇮🇶' },
];

const treatments = [
  // your treatments data here
];

const getFlightCost = (fromCountry, fromCity, toCountry, toCity) => {
  const baseCosts = {
    'Morocco': { 'North America': 800, 'Europe': 250, 'Gulf Countries': 400 },
    'Tunisia': { 'North America': 850, 'Europe': 280, 'Gulf Countries': 450 },
    'Egypt': { 'North America': 900, 'Europe': 350, 'Gulf Countries': 300 },
    'Turkey': { 'North America': 750, 'Europe': 200, 'Gulf Countries': 350 },
    'Mexico': { 'North America': 400, 'Europe': 700, 'Gulf Countries': 950 }
  };
  const fromCountryData = departureCountries.find(c => c.name === fromCountry);
  const region = fromCountryData ? fromCountryData.region : 'Europe';
  return baseCosts[toCountry] ? baseCosts[toCountry][region] : 500;
};

const BookingPage = ({ selectedTreatment, selectedDestination, setCurrentView, destinations }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    treatment: selectedTreatment?.name || '',
    destination: selectedDestination?.name || '',
    departureCountry: '',
    departureCity: '',
    date: '',
    duration: '',
    passengers: 1,
    accommodation: 'standard',
    insurance: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedDepartureCountry = departureCountries.find(c => c.name === formData.departureCountry);

  const calculateTotalCost = () => {
    let total = 0;
    const treatmentCosts = {
      'Dental Implants': 1200,
      'Cosmetic Surgery': 3500,
      'Eye Surgery': 2000,
      'Heart Surgery': 8000,
      'Hip Replacement': 4500,
      'Weight Loss Surgery': 5000
    };
    total += treatmentCosts[formData.treatment] || 2500;

    if (formData.departureCountry && formData.destination) {
      const flightCost = getFlightCost(formData.departureCountry, formData.departureCity, formData.destination);
      total += flightCost * formData.passengers;
    }

    const accommodationCosts = {
      'standard': 80,
      'deluxe': 150,
      'suite': 250,
      'recovery': 120
    };

    const nights = formData.duration === '3-5' ? 4 : formData.duration === '7-10' ? 8 :
                   formData.duration === '14' ? 14 : formData.duration === '21' ? 21 : 7;

    total += (accommodationCosts[formData.accommodation] || 80) * nights;

    if (formData.insurance) {
      total += 250;
    }

    total += 300; // support/services

    return total;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Book Your Medical Journey</h1>
        {/* Step 1: Select Treatment & Destination */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Treatment & Destination</h2>
            {/* Treatment */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Treatment</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
              >
                <option value="">Select Treatment</option>
                {['Dental Implants', 'Cosmetic Surgery', 'Eye Surgery', 'Heart Surgery', 'Hip Replacement', 'Weight Loss Surgery'].map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
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
                <option value="">Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.name}>{dest.flag} {dest.name}</option>
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
                <option value="">Select your country</option>
                {['North America', 'Europe', 'Gulf Countries'].map((region) => (
                  <optgroup key={region} label={region}>
                    {departureCountries.filter(c => c.region === region).map((country) => (
                      <option key={country.code} value={country.name}>{country.flag} {country.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            {/* Departure City */}
            {formData.departureCountry && (
              <div className="mb-4">
                <label className="block mb-1 font-medium">Departure City</label>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={formData.departureCity}
                  onChange={(e) => handleInputChange('departureCity', e.target.value)}
                >
                  <option value="">Select your city</option>
                  {departureCountries
                    .find(c => c.name === formData.departureCountry)
                    ?.cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </select>
              </div>
            )}
            {/* Estimated Flight Cost */}
            {formData.departureCountry && formData.destination && (
              <div className="mb-4 p-4 bg-blue-50 rounded">
                <p className="text-sm text-blue-900">
                  Estimated Flight Cost per person: ${getFlightCost(formData.departureCountry, formData.departureCity, formData.destination)}
                </p>
              </div>
            )}
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        )}
        {/* Step 2: Travel Details */}
        {step === 2 && (
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
            {/* Accommodation */}
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
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(3)}
            >
              Next
            </button>
            {/* Back Button */}
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </div>
        )}
        {/* Step 3: Additional Services */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
            {/* Insurance */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="insurance"
                checked={formData.insurance}
                onChange={(e) => handleInputChange('insurance', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="insurance">Travel & Medical Insurance (+$250)</label>
            </div>
            {/* Next Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(4)}
            >
              Next
            </button>
            {/* Back Button */}
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setStep(2)}
            >
              Back
            </button>
          </div>
        )}
        {/* Step 4: Summary & Confirmation */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p><strong>Treatment:</strong> {formData.treatment}</p>
              <p><strong>Destination:</strong> {formData.destination}</p>
              <p><strong>Departure:</strong> {formData.departureCity}, {formData.departureCountry}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Duration:</strong> {formData.duration} days</p>
              <p><strong>Travelers:</strong> {formData.passengers}</p>
              <p><strong>Accommodation:</strong> {formData.accommodation}</p>
              <p><strong>Insurance:</strong> {formData.insurance ? 'Yes' : 'No'}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
              <ul className="list-disc list-inside">
                <li>
                  Treatment: ${ ( ( { 'Dental Implants': 1200, 'Cosmetic Surgery': 3500, 'Eye Surgery': 2000, 'Heart Surgery': 8000, 'Hip Replacement': 4500, 'Weight Loss Surgery': 5000 } )[formData.treatment] || 2500 ).toLocaleString() }
                </li>
                <li>
                  Flights ({formData.passengers}): ${ getFlightCost(formData.departureCountry, formData.departureCity, formData.destination) * formData.passengers }
                </li>
                <li>
                  Accommodation ({formData.accommodation}): ${ ( (formData.duration === '3-5' ? 4 : formData.duration === '7-10' ? 8 : formData.duration === '14' ? 14 : 21) ) * (formData.accommodation === 'deluxe' ? 150 : formData.accommodation === 'suite' ? 250 : formData.accommodation === 'recovery' ? 120 : 80) }
                </li>
                <li>Transportation & Support: $300</li>
                {formData.insurance && <li>Travel Insurance: $250</li>}
              </ul>
            </div>
            <h3 className="text-xl font-semibold mb-2">Total Cost: ${calculateTotalCost().toLocaleString()}</h3>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => alert('Booking Confirmed!')}
            >
              Confirm Booking
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
      </div>
    </div>
  );
};

export default BookingPage;
