import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SuccessPage.css';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [googleId, setGoogleId] = useState('');
  const location = useLocation();
  const { state } = location;
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (state && state.tokenResponse) {
      const { profileObj } = state.tokenResponse;

      setName(profileObj.name || '');
      setEmail(profileObj.email || '');
      setPicture(profileObj.imageUrl || '');
      setGoogleId(profileObj.googleId || '');
    }

    // Automatically run the handleUserDataSave function when the component mounts
    // handleUserDataSave();
  }, [state]); // Empty dependency array to run the effect only once when the component mounts

  const handleUserDataSave = async () => {
    try {
      // Assuming your API endpoint is correct
      const response = await axios.post('http://localhost:3000/users/saveuser', {
        displayName: name,
        picture: picture,
        googleId: googleId,
        email: email,
        birthdate: birthdate,
      });

      // Check if the status code is in the 2xx range
      if (response.status >= 200 && response.status < 300) {
        // Request was successful
        console.log(response);
        setSuccessMessage('User data successfully updated!');
        setError('');
      } else {
        // Request was not successful
        setError('An error occurred while saving the data.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while saving the data.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {picture && <img src={picture} alt={name} />}
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {state?.tokenResponse?.profileObj?.email}</p>
          <p><strong>Google ID:</strong> {googleId}</p>
        </div>
      </div>
      <form onSubmit={handleUserDataSave}>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        <button type="submit">Update profile</button>
      </form>
      <Link to="/birthdate">
        <button type="button">Next</button>
      </Link>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default SuccessPage;
