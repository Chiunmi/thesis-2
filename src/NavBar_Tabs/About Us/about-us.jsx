import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./about-us.css";

// Fetch posts function
const fetchPosts = async () => {
  const response = await axios.get("/post");
  return response.data;
};

// Post new post function
const postNewPost = async (data) => {
  const response = await axios.post("/post", data);
  return response.data;
};

function AboutUs() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  // Use React Query to fetch posts
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Use React Query to mutate (post new post)
  const mutation = useMutation({
    mutationFn: postNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Uploaded successfully");
      setTitle("");
      setBody("");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error uploading post");
    },
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !body) {
      toast.error("Title and body are required");
      return;
    }

    const data = {
      title,
      body,
    };

    mutation.mutate(data);
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
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Uploading..." : "Upload Post"}
        </button>
      </form>

      {/* Render list of posts */}
      <div>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Posted by: {post.userId || "Unknown user"}</p>
            <p>Timestamp: {new Date(post.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
