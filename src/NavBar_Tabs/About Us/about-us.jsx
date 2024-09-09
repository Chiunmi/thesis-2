import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './about-us.css';

// Fetch posts function
const fetchPosts = async () => {
  const response = await axios.get('/post');
  return response.data;
};

// Post new post function
const postNewPost = async (formData) => {
  const response = await axios.post('/post', formData);
  return response.data;
};

function AboutUs() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const queryClient = useQueryClient();

  // Use React Query to fetch posts
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['posts'], //unique key for the query. It identifies the query 
    queryFn: fetchPosts, //function use to fetched data
  });

  // Use React Query to mutate (post new post)
  const mutation = useMutation({
    mutationFn: postNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Refetch posts after mutation
      toast.success('Uploaded successfully');
      setImage(null);
      setImagePreview('');
      setTitle('');
      setBody('');
    },
    onError: (error) => {
      toast.error(error.response?.data || 'Error uploading image');
    },
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !image) {
      toast.error('Title and image are required');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('body', body);

    mutation.mutate(formData); // Trigger the mutation
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

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
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Uploading...' : 'Upload Post'}
        </button>
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
            <p>Posted by: {post.userId || 'Unknown user'}</p>
            <p>Timestamp: {new Date(post.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
