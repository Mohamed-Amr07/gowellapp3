import { useState } from 'react';

function FlightCalculator() {
  const [fromCountry, setFromCountry] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [toCity, setToCity] = useState('');
  const [cost, setCost] = useState(null);

  const calculateFlightCost = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/flight-cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCountry,
          fromCity,
          toCountry,
          toCity
        }),
      });
      
      const data = await response.json();
      setCost(data.cost);
    } catch (error) {
      console.error('Error calculating flight cost:', error);
    }
  };

  return (
    <div>
      <h2>Flight Cost Calculator</h2>
      <form onSubmit={calculateFlightCost}>
        <div>
          <label>From Country:</label>
          <input 
            type="text" 
            value={fromCountry} 
            onChange={(e) => setFromCountry(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>From City:</label>
          <input 
            type="text" 
            value={fromCity} 
            onChange={(e) => setFromCity(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>To Country:</label>
          <input 
            type="text" 
            value={toCountry} 
            onChange={(e) => setToCountry(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>To City:</label>
          <input 
            type="text" 
            value={toCity} 
            onChange={(e) => setToCity(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      
      {cost !== null && (
        <div>
          <h3>Estimated Flight Cost: ${cost}</h3>
        </div>
      )}
    </div>
  );
}

export default FlightCalculator;
