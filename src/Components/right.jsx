import "./right.css";
import bakuna from "../assets/bakuna.png";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import React, { useState } from "react";
import Modal from "react-modal";

function Right() {
  // State for managing uploaded image
  const [imageSrc, setImageSrc] = useState(bakuna); // Default image

  // State for managing modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // <-- Add this line
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  const handleAddAnnouncement = (title, content) => {
    console.log("Added Announcement:", { title, content });
    // Logic for adding the announcement
  };

  const handleDeleteItem = () => {
    console.log("Deleted Announcement");
    // Logic for deleting the announcement
  };

  const openAddModal = () => {
    setAnnouncementTitle(""); // Clear input fields
    setAnnouncementContent("");
    setIsAddModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); // Set delete modal to open
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the uploaded image as the new source
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="right-container">
      {/* Monthly Announcement Buttons */}
      <div className="monthly-buttons">
        <span className="monthly-announcement-label">Monthly Announcement</span>
        <button className="monthly-add" onClick={openAddModal}>
          Add
        </button>
        <button className="monthly-delete" onClick={openDeleteModal}>
          Delete
        </button>
      </div>

      {/* Add Monthly Announcement Modal */}
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
            width: "40vw",
            height: "40vh",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <div className="announcement-modal-content">
          <p>Add Monthly Announcement</p>

          {/* Textarea for Announcement Content */}
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
              onClick={() => setIsAddModalOpen(false)}
            >
              Close
            </button>
            <button
              className="save-btn"
              onClick={() => {
                handleAddAnnouncement(announcementTitle, announcementContent);
                setIsAddModalOpen(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="monthly-modal"
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
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-buttons">
            <button
              className="close-btn"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Close
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                handleDeleteItem();
                setIsDeleteModalOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Right-side Content */}
      <div className="right-content">
        <div className="priority-content">
          <CampaignOutlinedIcon
            style={{
              width: "50px",
              height: "50px",
              color: "white",
              backgroundColor: "red",
              borderRadius: "50%",
              padding: "5px",
            }}
          />
          <div className="priority-text">
            <h3>Vaccination</h3>
            <p>College Freshmen and Transferees</p>
          </div>
          <DoubleArrowOutlinedIcon
            style={{
              width: "35px",
              height: "35px",
              color: "#003163",
              marginTop: "1vh",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="line"></div>

        {/* Image Poster with Upload Functionality */}
        <div className="poster-container">
          <label htmlFor="upload-photo" className="upload-label">
            <img src={imageSrc} alt="Bakuna Photo" className="bakuna-photo" />
            <input
              type="file"
              id="upload-photo"
              className="upload-poster-input"
              onChange={handleImageUpload} // Handler for file uploads
            />

            <button className="upload-button">Change Photo</button>
          </label>
        </div>

        <div className="poster-description">
          <p>
            Did you know that Filipinos have historically shown high acceptance
            rates for vaccination programs? During various public health
            campaigns, such as those for influenza, measles, and polio,
            Filipinos have generally demonstrated a positive attitude towards
            vaccination, contributing to successful immunization efforts across
            different age groups and regions in the Philippines.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Right;
