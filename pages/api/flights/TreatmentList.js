import { useState, useEffect } from 'react';

function TreatmentList() {
  const [treatments, setTreatments] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/treatments')
      .then(response => response.json())
      .then(data => setTreatments(data))
      .catch(error => console.error('Error fetching treatments:', error));
  }, []);

  return (
    <div>
      <h2>Available Treatments</h2>
      <ul>
        {treatments.map(treatment => (
          <li key={treatment.id}>
            {treatment.name} - ${treatment.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreatmentList;
