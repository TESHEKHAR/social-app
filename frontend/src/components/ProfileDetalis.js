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
    setMessage(""); // Reset the message

    try {
      const response = await axios.get('http://localhost:8000/facebook/timeline', {
        headers: {
          'Authorization': 'Bearer EAAMmHmMQseIBO9A0RsUGkrLHM2XAJC4qAzvvoy7I6gSXCM5PAbe6Imv8cYMdb88lKjlt4P31TQCESNzj6GGJXfEZCzMJll5cxfMmM2RJh4pQEhuSpFl9CPILYprEXOjOD2RGKvrAFd9XPFdogev0QjwsBKYEPlto1DrjiPy2AzNCQ1SvVGdYmcXTh9MG0jauvwnS16xatY6HiHMTFmWsbVPi2UxhD1SlZBOiZAJZCXLovM2c0oZAfDxk8KtrgfioLDVJOT3pom6Tc'
        }
      });

      if (response.data.message) {
        setMessage(response.data.message); // Set the success message
      }
    } catch (error) {
      console.error("Error saving posts:", error);
      setMessage("Failed to save posts."); // Set the error message
    } finally {
      setLoading(false); // Reset loading state
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
          {message && <p>{message}</p>} {/* Display the message */}
        </div>
      ) : (
        <p>Loading profile details...</p>
      )}
    </div>
  );
};

export default ProfileDetails;

