import React from 'react';
import '../assets/Sidebar.css';

const Sidebar = ({ profile, onShowProfile }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px', color: 'white' }}>
          Social App
        </h1>
      </div>
      <ul className="menu">
        <li onClick={onShowProfile}>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
