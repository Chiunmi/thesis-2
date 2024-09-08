import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import './about-us.css';
function AboutUs() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/post');
        setPosts(response.data);
      } catch (err) {
          toast.error('Error fetching posts');
      }
    };
    fetchPosts();
    }, []);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);

      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
  };

  const handleTitleChange = (event) => {
      setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!title || !image) {
        toast.error('Title and image are required');
        return;
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('body', body); 

      try {
          const response = await axios.post('/post', formData);
          const newPost = response.data
          toast.success('uploaded successfully');

          setPosts([newPost, ...posts]); // Update the posts list
          setImage(null); // Clear image preview after upload
          setImagePreview(''); // Clear image preview
          setTitle(''); // Clear title input
          setBody(''); // Clear body input
      } catch (err) {
          toast.error(err.response?.data || 'Error uploading image');
      }
  };

  return (
    <div className="about-us-container">
      <form onSubmit={handleSubmit} className="about-us-form">
          <input 
              type="text" 
              value={title} 
              onChange={handleTitleChange} 
              placeholder="Enter title" 
              required 
          />
           <input 
              type="text" 
              value={body} 
              onChange={handleBodyChange} 
              placeholder="Enter body" 
              required 
          />
          <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required 
          />
          {imagePreview && (
              <div>
                  <h4>Image Preview:</h4>
                  <img src={imagePreview} alt="Preview" style={{ width: '200px', margin: '10px' }} />
              </div>
          )}
          <button type="submit">Upload Post</button>
      </form>

    {/* Render list of posts */}
    <div>
  {posts.map((post) => (
    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {post.url && (
        <img
          src={post.url}
          alt={post.title}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      )}
      <p>Posted by: {post.userId || "Unknown user"}</p> {/* Make sure userId is a string */}
      <p>Timestamp: {new Date(post.timestamp).toLocaleString()}</p>
    </div>
  ))}
</div>

  </div>
  );
}

export default AboutUs;
