import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./right.css";
import bakuna from "../assets/bakuna.png";
import waterAnalysis from "../assets/water-analysis.jpeg";

const dummyAnnouncement = {
  title: "Filipino Vaccination Acceptance",
  description:
    "Did you know that Filipinos have historically shown high acceptance rates for vaccination programs? During various public health campaigns, such as those for influenza, measles, and polio, Filipinos have generally demonstrated a positive attitude towards vaccination, contributing to successful immunization efforts across different age groups and regions in the Philippines.",
  images: [bakuna, waterAnalysis],
};

function Right() {
  const [announcements, setAnnouncements] = useState([dummyAnnouncement]);
  const [sliderImages, setSliderImages] = useState(dummyAnnouncement.images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("image-fade-enter");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnnouncementIndex, setSelectedAnnouncementIndex] =
    useState(null);

  // Image upload handler
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("Image uploaded:", file);
    // Handle the file upload logic here
  };

  // Add Announcement handler
  const handleAddAnnouncement = () => {
    const newAnnouncement = {
      title: announcementTitle,
      description: announcementContent,
      images: [bakuna], // Example, you should use the uploaded image file
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setIsAddModalOpen(false);
    setAnnouncementTitle("");
    setAnnouncementContent("");
  };

  // Edit Mode Toggle
  const handleEditImages = () => {
    setIsEditMode(!isEditMode);
  };

  // Delete Modal Open
  const handleOpenDeleteModal = (index) => {
    setSelectedAnnouncementIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Delete Announcement Handler
  const handleDeleteItem = () => {
    const updatedAnnouncements = announcements.filter(
      (_, index) => index !== selectedAnnouncementIndex
    );
    setAnnouncements(updatedAnnouncements);
    setSliderImages(
      updatedAnnouncements.length ? updatedAnnouncements[0].images : []
    );
    setIsDeleteModalOpen(false);
    setIsEditMode(false); // Close edit mode after deletion
  };

  // Image Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("image-fade-exit");
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % sliderImages.length
        );
        setFadeClass("image-fade-enter");
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  return (
    <div className="right-container">
      <div className="monthly-buttons">
        <span className="monthly-announcement-label">Monthly Announcement</span>
        <button className="monthly-add" onClick={() => setIsAddModalOpen(true)}>
          Add
        </button>
        <button className="montly-edit" onClick={handleEditImages}>
          Edit
        </button>
      </div>

      {/* Edit Mode */}
      {isEditMode && (
        <div className="modal-overlay" onClick={handleEditImages}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Monthly Announcements</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement, index) => (
                  <tr key={index}>
                    <td>{announcement.title}</td>
                    <td>{announcement.description}</td>
                    <td>
                      <img
                        src={announcement.images[0]}
                        alt="announcement"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="announcement-modal-content-delete-btn"
                        onClick={() => handleOpenDeleteModal(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="announcement-modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // More opaque for visibility
            position: "fixed", // Ensure it's fixed to the viewport
            top: 0, // Align at the top
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          },
          content: {
            width: "fit-content",
            height: "20vh",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
            zIndex: 10000, // Higher than the overlay
          },
        }}
      >
        <div className="delete-modal-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="delete-modal-buttons">
            <button
              className="close-btn"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Close
            </button>
            <button className="delete-btn" onClick={handleDeleteItem}>
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Announcement Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
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
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
            zIndex: 2,
          },
        }}
      >
        <div className="announcement-modal-content">
          <h3>Add Monthly Announcement</h3>
          <input
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            placeholder="Announcement Title"
            className="input-title"
          />
          <textarea
            value={announcementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            placeholder="Announcement Content"
            rows={4}
            className="input-content"
          />
          <input
            type="file"
            id="upload-photo"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="upload-image">
          <button
            className="upload-img-btn"
            onClick={() => document.getElementById("upload-photo").click()}
          >
            Upload Image
          </button>
        </div>
        <div className="monthly-modal-buttons">
          <button className="save-btn" onClick={handleAddAnnouncement}>
            Save
          </button>
          <button
            className="close-btn"
            onClick={() => setIsAddModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Image Slider */}
      <div className="right-content">
        <div className="poster-container">
          <img
            src={sliderImages[currentImageIndex]}
            alt="Announcement"
            className={`bakuna-photo ${fadeClass}`}
          />
        </div>
        <div className="poster-description">
          <h3>{announcements[0].title} </h3>
          <p>{announcements[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export default Right;
