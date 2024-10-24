import React, { useEffect, useState, useCallback } from 'react';
import { GetUserFriends } from '../Utility/AxiosInctence';
import { decodeToken, getToken } from '../Utility/tokenUtils';
import '../assets/FriendsList.css'; 

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFriends = async (page) => {
    const token = getToken();
    const user = decodeToken(token);

    if (user && user.id) {
      setLoading(true);
      try {
        const response = await GetUserFriends(user.id, page);
        const friendsData = response.friends || [];

        if (friendsData.length > 0) {
          setFriends((prevFriends) => [...prevFriends, ...friendsData]);
        }
        if (friendsData.length < 8) {
          setHasMore(false);
        }
      } catch (error) {
        setError('Failed to fetch friends list.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  
  const handleInfiniteScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, loading]); 

  useEffect(() => {
    if (hasMore) {
      fetchFriends(page);
    }
  }, [page, hasMore]); 

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [handleInfiniteScroll]); 
  if (loading && page === 1) {
    return <p>Loading friends list...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="friends-list">
      <h2>Friends List</h2>
      <div className="friends-container">
        {friends.map((friend) => (
          <div className="friend-card" key={friend._id}>
            <div className="friend-image-container">
              <img src={friend.imageUrl} alt={friend.name} className="friend-image" />
            </div>
            <div className="friend-info">
            <a href={friend.profileLink} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{friend.name}</h3>
            </a>
              <p>{friend.mutualFriends} Mutual Friends</p>

            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading more friends...</p>}
      {!hasMore && <p>No more friends to load.</p>}
    </div>
  );
};

export default FriendsList;
