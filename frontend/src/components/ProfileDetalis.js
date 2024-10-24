import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetUserProfile } from "../Utility/AxiosInctence";
import { decodeToken, getToken } from "../Utility/tokenUtils";
import '../assets/ProfileDetails.css'; 

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      const user = decodeToken(token);

      if (user?.id) {
        try {
          const profileData = await GetUserProfile(user.id);
          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleSavePosts = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get('http://localhost:8000/facebook/timeline', {
        headers: {
          'Authorization': `Bearer ${profile.accessToken}`
        }
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error saving posts:", error);
      setMessage("Failed to save posts.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <p className="loading-message">Loading profile details...</p>;
  }

  return (
    <div className="profile-container">
      <h3 className="profile-name">{profile.displayName || profile.name}</h3>
      <p className="profile-email"><strong>Email:</strong> {profile.email}</p>
      <div className="image-container">
        <img src={profile.picture || profile.photo} alt="Profile" className="profile-image" />
      </div>
      <div className="button-container">
        <button className="save-posts-button" onClick={handleSavePosts} disabled={loading}>
          {loading ? 'Saving...' : 'Save Facebook Posts'}
        </button>
        <a href={`https://www.facebook.com/friends/list?id=${profile._id}`} target="_blank" rel="noopener noreferrer">
          <button className="friends-list-button">
            Get Friends List
          </button>
        </a>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ProfileDetails;
