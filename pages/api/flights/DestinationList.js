import { useState, useEffect } from 'react';

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/destinations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading destinations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Destinations</h2>
      <ul>
        {destinations.map(destination => (
          <li key={destination.id}>
            {destination.flag} {destination.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DestinationList;
