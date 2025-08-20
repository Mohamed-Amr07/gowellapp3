import axios from 'axios';

// Amadeus API configuration
const AMADEUS_API_BASE = 'https://test.api.amadeus.com/v1';
let token = null;
let tokenExpiry = null;

// Get Amadeus access token
const getAmadeusToken = async () => {
  if (token && tokenExpiry > Date.now()) {
    return token;
  }
  
  try {
    const response = await axios({
      method: 'post',
      url: `${AMADEUS_API_BASE}/security/oauth2/token`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_AMADEUS_API_KEY}&client_secret=${process.env.NEXT_PUBLIC_AMADEUS_API_SECRET}`
    });
    
    token = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return token;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw error;
  }
};

// Search flights
export const searchFlights = async (params) => {
  try {
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = params;
    
    const accessToken = await getAmadeusToken();
    
    const response = await axios.get(`${AMADEUS_API_BASE}/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults: adults || 1,
        currencyCode: 'USD',
        max: 10
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Flight search error:', error.response?.data || error.message);
    throw error;
  }
};

// Get airport suggestions based on user input
export const getAirportSuggestions = async (keyword) => {
  try {
    const accessToken = await getAmadeusToken();
    
    const response = await axios.get(`${AMADEUS_API_BASE}/reference-data/locations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        keyword,
        subType: 'AIRPORT,CITY',
        'page[limit]': 5
      }
    });
    
    return response.data.data.map(item => ({
      id: item.id,
      name: item.name,
      iataCode: item.iataCode,
      cityName: item.address?.cityName,
      countryName: item.address?.countryName
    }));
  } catch (error) {
    console.error('Airport suggestions error:', error.response?.data || error.message);
    return [];
  }
};
