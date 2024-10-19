import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Post.css'; // Import the CSS file

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts'); // Adjust the URL if needed
        setPosts(response.data); // Store the fetched posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts.');
      } finally {
        setLoading(false); // Set loading to false after the fetch is done
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <p>Loading posts...</p>; // Loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there's an error
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
                <h3>{post.message}</h3> {/* Message will be truncated if too long */}
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
