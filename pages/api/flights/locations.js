import axios from 'axios';

// Amadeus API configuration
const AMADEUS_API_BASE = 'https://test.api.amadeus.com/v1';
const AMADEUS_API_KEY = 'uUyqc9Ts8w1YGsPGFAUDupR3OmzqH5uU';
const AMADEUS_API_SECRET = 'your_api_secret_here';

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
      data: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
    });
    
    token = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return token;
  } catch (error) {
    console.error('Error getting Amadeus token:', error.response?.data || error.message);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const accessToken = await getAmadeusToken();
    
    const response = await axios.get(`${AMADEUS_API_BASE}/reference-data/locations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: req.query
    });
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Location search error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message }
    });
  }
}
