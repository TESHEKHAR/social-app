import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../assets/Dashboard.css';
import { removeToken } from "../Utility/tokenUtils";

const Dashboard = ({ profile }) => {

  const handleLogout = async () => {
    removeToken()
    window.location.href = "http://localhost:3000/"
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
      <h1 className="logo">Social App</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="profile/details">Profile Details</Link>
          </li>
          <li className="list-group-item">
            <Link to="posts">Posts</Link>
          </li>
          <li className="list-group-item">
            <Link to="friends">Friends</Link>
          </li>
          <li className="list-group-item">
            <Link to="#" onClick={handleLogout}>Logout</Link>
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
