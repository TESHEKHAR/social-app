import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FacebookAuth from './components/FacebookAuth';
import Dashboard from './pages/Dashboard';
import ProfileDetails from './components/ProfileDetalis'; // Fixed import typo here
import axios from 'axios';

const App = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogin = (userProfile) => {
    sessionStorage.setItem('accessToken', userProfile.accessToken);
    fetchProfile(userProfile.accessToken); // Fetch profile after login
  };

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data[0]);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FacebookAuth onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard profile={profile} />}>
          {/* Pass profile as prop to ProfileDetails */}
          <Route path="profile/details" element={<ProfileDetails profile={profile} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
