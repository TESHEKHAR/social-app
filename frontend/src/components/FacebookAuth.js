import '../assets/FacebookAuth.css';

const FacebookAuth = () => {

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8000/auth/facebook';
  };
  return (
    <div className="facebook-auth-container">
      <div className="facebook-login-box">
        <div className="image-section">
          <img 
            src="https://via.placeholder.com/250" 
            alt="Placeholder"
          />
        </div>
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
