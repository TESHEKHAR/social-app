import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/Dashboard.css';

const Dashboard = ({ profile }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  if (!profile) {
    return <div>Loading profile...</div>;  // Handle loading state
  }

  return (
    <div className="dashboard-container">
      <Sidebar onShowProfile={handleShowProfile} />
      <div className="main-content">
        <div className="profile-details">
          <h1>Profile Details</h1>
          <img src={profile.picture || profile.photo} alt="Profile" className="profile-image" />
          <h3>{profile.displayName || profile.name}</h3>
          <p>Email: {profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
