import React, { useEffect, useState } from 'react';
import { GetUserFriends } from '../Utility/AxiosInctence';
import { decodeToken, getToken } from '../Utility/tokenUtils';
import '../assets/FriendsList.css'; // Import the CSS file

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFriends = async () => {
    const token = getToken();
    const user = decodeToken(token);

    if (user && user.id) {
      try {
        const response = await GetUserFriends(user.id);
        console.log("Friends Data:", response); 
        const friendsData = response.friends || [];
        if (Array.isArray(friendsData)) {
          setFriends(friendsData);
        } else {
          throw new Error("Friends data is not an array");
        }
      } catch (error) {
        setError("Failed to fetch friends list.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends(); 
  }, []);

  if (loading) {
    return <p>Loading friends list...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="friends-list">
      <h2>Friends List</h2>
      <div className="friends-container">
        {friends.map(friend => (
          <div className="friend-card" key={friend._id}>
            <a href={friend.profileLink} target="_blank" rel="noopener noreferrer">
              <img src={friend.imageUrl} alt={friend.name} className="friend-image" />
              <div className="friend-info">
                <h3>{friend.name}</h3>
                <p>Mutual Friends: {friend.mutualFriends}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
