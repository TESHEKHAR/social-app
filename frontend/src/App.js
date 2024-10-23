import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FacebookAuth from './components/FacebookAuth';
import Dashboard from './pages/Dashboard';
import ProfileDetails from './components/ProfileDetalis';
import Post from './components/post'; 
import FriendsList from './components/FriendsList';
import ProtectedRoute from './components/ProtectedRoute';
import { decodeToken } from './Utility/tokenUtils';

const App = () => {
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem('Token');
    useEffect(() => {
      if (token) {
        const User = decodeToken(token);
        if (User) {
          setProfile(User); 
        }
      }
    }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <FacebookAuth />:<Navigate to="/dashboard" replace /> } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard profile={profile} />
          </ProtectedRoute>
        }>
          <Route path="profile/details" element={
            <ProtectedRoute>
              <ProfileDetails profile={profile} />
            </ProtectedRoute>
          } />
          <Route path="posts" element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } /> 
          <Route path="friends" element={
            <ProtectedRoute>
              <FriendsList />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
