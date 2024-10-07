import React from "react";

const ProfileDetails = ({ profile }) => {
  return (
    <div>
      {profile ? (
        <div>
          <h3>{profile.displayName || profile.name}</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <img src={profile.picture || profile.photo} alt="Profile" className="profile-image" />
          {/* Add other profile details here as needed */}
        </div>
      ) : (
        <p>Loading profile details...</p>
      )}
    </div>
  );
};

export default ProfileDetails;
