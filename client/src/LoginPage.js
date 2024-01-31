import React from 'react';
import './loginindex.css';
import GoogleLoginSocial from './GoogleLoginSocial'; // Import the Social component

function LoginPage() {
  console.log('LoginPage is being rendered');
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle login form submission here
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Form submitted:', { email, password });
    // You can send the form data to your backend for authentication
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <div>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>

      <br />
      <GoogleLoginSocial />
    </div>
  );
}

export default LoginPage;
