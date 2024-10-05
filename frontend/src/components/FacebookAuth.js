import React from 'react';
import '../assets/FacebookAuth.css'; // Using a CSS file for styling

const FacebookAuth = () => {

  const handleFacebookLogin = () => {
    // Redirect directly to backend's Facebook authentication route
    window.location.href = 'http://localhost:8000/auth/facebook';
  };

  return (
    <div className="facebook-auth-container">
      <div className="facebook-login-box">
        {/* Left side for the image */}
        <div className="image-section">
          <img 
            src="https://via.placeholder.com/250" 
            alt="Placeholder"
          />
        </div>
        
        {/* Right side for login button */}
        <div className="login-section">
          <button onClick={handleFacebookLogin}>
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookAuth;
