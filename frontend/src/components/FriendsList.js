import React, { useEffect, useState } from 'react';
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
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  useEffect(() => {
    if (hasMore) {
      fetchFriends(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [hasMore, loading]);

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
      {loading && <p>Loading more friends...</p>}
      {!hasMore && <p>No more friends to load.</p>}
    </div>
  );
};

export default FriendsList;