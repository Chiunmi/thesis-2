import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import "./home.css";
import { useUser } from "../../context/UserContext";

function Home() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [postId, setPostId] = useState(null); // For editing posts

  const openAddAnnouncementModal = () => {
    setIsEditing(false);
    setAnnouncementTitle(""); // Clear title
    setAnnouncementContent(""); // Clear content
    setIsAddEditModalOpen(true);
  };

  const openEditAnnouncementModal = (id, title, content) => {
    setIsEditing(true);
    setAnnouncementTitle(title);
    setAnnouncementContent(content);
    setPostId(id);
    setIsAddEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setPostId(id);
    setIsDeleteModalOpen(true);
  };

  const fetchPosts = async () => {
    const response = await axios.get("/post");
    return response.data;
  };

  const postNewPost = async (data) => {
    const response = await axios.post("/post", data);
    return response.data;
  };

  const updatePost = async (data) => {
    const response = await axios.patch(`/post/${postId}`, data);
    return response.data;
  };

  const deletePost = async () => {
    const response = await axios.delete(`/post/${postId}`);
    return response.data;
  };

  // Fetching posts
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: postNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Uploaded successfully");
      setAnnouncementTitle("");
      setAnnouncementContent("");
      setIsAddEditModalOpen(false); // Close the modal on success
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error uploading post");
    },
  });

  const editMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Updated successfully");
      setIsAddEditModalOpen(false); // Close the modal on success
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error updating post");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Deleted successfully");
      setIsDeleteModalOpen(false); // Close the modal on success
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error deleting post");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!announcementTitle || !announcementContent) {
      toast.error("Title and body are required");
      return;
    }

    const data = {
      title: announcementTitle,
      body: announcementContent,
    };

    if (isEditing) {
      editMutation.mutate(data);
    } else {
      mutation.mutate(data);
    }
  };

  const handleDeleteAnnouncement = () => {
    deleteMutation.mutate();
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div className="home-page">
      <div className="welcome">
        <span className="hello">Hello, {user.username}!</span>

        <div className="welcome-content">
          <h1>
            Welcome to Philippine Christian University Clinic! Have a healthy
            day :)
          </h1>
          <p>
            A distinctive Christian University integrating faith, character and
            service, transforming global Learners for enlightenment, leadership,
            and human development in the 21st century.
          </p>
        </div>

        <div className="announcement-add-button">
          <span className="announcement-label">Announcement</span>

          <button
            className="add-announcement"
            onClick={openAddAnnouncementModal}
          >
            Add
          </button>

          {/* Add/Edit Announcement Modal */}
          <Modal
            isOpen={isAddEditModalOpen}
            onRequestClose={() => setIsAddEditModalOpen(false)}
            className="announcement-modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              },
              content: {
                width: "40vw",
                height: "45vh",
                margin: "auto",
                borderRadius: "12px",
                backgroundColor: "#f8f8ff",
                padding: "25px",
              },
            }}
          >
            <div className="announcement-modal-content">
              <p>{isEditing ? "Edit Announcement" : "Add Announcement"}</p>

              {/* Announcement Title Input */}
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Announcement Title"
                className="input-title"
              />

              {/* Announcement Content Input */}
              <textarea
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                placeholder="Announcement Content"
                className="input-content"
                rows={4}
              />

              <div className="modal-buttons">
                <button
                  className="close-btn"
                  onClick={() => setIsAddEditModalOpen(false)}
                >
                  Close
                </button>
                <button className="save-btn" onClick={handleSubmit}>
                  {isEditing ? "Save Changes" : "Save"}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* Announcement List */}
        <div className="announcement-container">
          {posts.map((post) => (
            <div key={post._id} className="announcement-content">
              <div className="announcement-buttons">
                <span className="announcement-title">{post.title}</span>
                <button
                  className="edit-announcement"
                  onClick={() =>
                    openEditAnnouncementModal(post._id, post.title, post.body)
                  }
                >
                  Edit
                </button>
                <button
                  className="delete-announcement"
                  onClick={() => openDeleteModal(post._id)}
                >
                  Delete
                </button>
                <p>{post.body}</p>

                <p className="see-details">{" >"} See details</p>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          className="announcement-modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            },
            content: {
              width: "30vw",
              height: "20vh",
              margin: "auto",
              borderRadius: "12px",
              backgroundColor: "#f8f8ff",
              padding: "25px",
            },
          }}
        >
          <div className="delete-modal-content">
            <p>Are you sure you want to delete this announcement?</p>
            <div className="delete-modal-buttons">
              <button
                className="close-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Close
              </button>
              <button className="delete-btn" onClick={handleDeleteAnnouncement}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
