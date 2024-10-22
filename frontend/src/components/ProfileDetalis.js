// import React from "react";

// const ProfileDetails = ({ profile }) => {
//   return (
//     <div>
//       {profile ? (
//         <div>
//           <h3>{profile.displayName || profile.name}</h3>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <img src={profile.picture || profile.photo} alt="Profile" className="profile-image" />
//           {/* Add other profile details here as needed */}
//         </div>
//       ) : (
//         <p>Loading profile details...</p>
//       )}
//     </div>
//   );
// };

// export default ProfileDetails;

import React, { useState } from "react";
import axios from "axios";

const ProfileDetails = ({ profile }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSavePosts = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get('http://localhost:8000/facebook/timeline', {
        headers: {
          'Authorization': 'Bearer EAAMmHmMQseIBO0lBwF90MXzuqgEjsgP1sqHKk652MTg2sIykCsUZByclCzuG3ZCQAbzQsZC9hiEjrbpfAYZBiducYBQAqObqO999I8HiATZAZBU4LZBUrNVZBdWmJB7tQ9ZBZCMRtU4nizweS1Y4uaYLr0jMSZBmLFzMhtysR4cDuVUoPUKwSu8sSHIwIzflZBVTsofRTeJMn13ZBFBBjxhhcfOYNUmILmt06vydR6AZDZD'
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

  return (
    <div>
      {profile ? (
        <div>
          <h3>{profile.displayName || profile.name}</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <img src={profile.picture || profile.photo} alt="Profile" className="profile-image" /><br/><br/>
          <button onClick={handleSavePosts} disabled={loading}>
            {loading ? 'Saving...' : 'Save Facebook Posts'}
          </button>
          <a href={`https://www.facebook.com/friends/list?id=${profile._id}`} target="_blank" rel="noopener noreferrer">
            <button style={{ marginLeft: '10px' }}>
              Get Friends List
            </button>
          </a>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading profile details...</p>
      )}
    </div>
  );
};

export default ProfileDetails;

