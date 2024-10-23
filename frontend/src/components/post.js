import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Post.css';

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="post-container">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <div key={post.facebookId} className="post-card">
              <img src={post.picture} alt="Post" className="post-image" />
              <div className="post-content">
                <h3>{post.message}</h3>
                <p><strong>From:</strong> {post.from}</p>
                <p><strong>Shares:</strong> {post.shares}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default Post;
