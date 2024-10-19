import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../assets/Dashboard.css';

const Dashboard = ({ profile }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout'); // Adjust URL based on your server
      sessionStorage.removeItem('accessToken'); // Clear the token from session storage
      navigate('/'); // Redirect to homepage or login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="profile/details">Profile Details</Link>
          </li>
          <li className="list-group-item">
            <Link to="posts">Posts</Link>
          </li>
          <li className="list-group-item">
            <Link to="">Friends</Link>
          </li>
          <li className="list-group-item">
            <Link to="">Setting</Link>
          </li>
          <li className="list-group-item">
            <Link to="#" onClick={handleLogout}>Logout</Link> {/* Logout link */}
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
