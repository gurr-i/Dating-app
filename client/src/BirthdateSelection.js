import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function BirthdateSelection(googleId) {
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    // Basic validation to check if birthdate is not empty
    if (!birthdate) {
      setError('Please enter a valid birthdate.');
      return;
    }

    try {
      // await axios.post('http://localhost:3000/users/saveBirthdate', { birthdate: birthdate });
      const response = await axios.post('http://localhost:3000/users/saveBirthdate', {
        googleId: googleId,
        birthdate: birthdate,
      });
      setSuccessMessage('Birthdate successfully updated!');
      setError('');
    } catch (error) {
      console.error(error);
      setError('An error occurred while saving the birthdate.');
      setSuccessMessage('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default BirthdateSelection;
