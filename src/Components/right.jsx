import "./right.css";
import bakuna from "../assets/bakuna.png";
import waterAnalysis from "../assets/water-analysis.jpeg";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function Right() {
  const [imageSrc, setImageSrc] = useState(bakuna);
  const [sliderImages, setSliderImages] = useState([bakuna, waterAnalysis]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
  const [fadeClass, setFadeClass] = useState("image-fade-enter"); // State to manage fade effect

  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditImages = () => {
    setIsEditMode(!isEditMode);
  };

  // State for managing modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  const handleAddAnnouncement = (title, content) => {
    console.log("Added Announcement:", { title, content });
  };

  const handleDeleteItem = () => {
    console.log("Deleted Announcement");
  };

  const openAddModal = () => {
    setAnnouncementTitle("");
    setAnnouncementContent("");
    setIsAddModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out effect
      setFadeClass("image-fade-exit");

      // Set timeout to change image after fade-out completes (matching the transition duration)
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % sliderImages.length
        );

        // Start fade-in effect after image changes
        setFadeClass("image-fade-enter");
      }, 1000); // Delay matches transition time in CSS
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [sliderImages.length]);

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
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <div className="announcement-modal-content">
          <p>Add Monthly Announcement</p>
          <textarea
            value={announcementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            placeholder="Announcement Content"
            className="input-content"
            rows={4}
          />
          <div className="monthly-modal-buttons">
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
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <div className="right-delete-modal-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="delete-modal-buttons">
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
        {/* Image Poster with Upload Functionality */}
        <div className="poster-container">
          <label htmlFor="upload-photo" className="upload-label">
            <img
              src={sliderImages[currentImageIndex]}
              alt="Bakuna Photo"
              className={`bakuna-photo ${fadeClass}`} /* Apply fade classes */
            />
          </label>
        </div>
        <div className="img-button">
          <input
            type="file"
            id="upload-photo"
            className="upload-poster-input"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide the input element
          />
          <button
            onClick={() => document.getElementById("upload-photo").click()}
          >
            Upload image
          </button>
          <button onClick={handleEditImages}>Edit images</button>
          {/* Edit Image Table */}
          {isEditMode && (
            <div className="modal-overlay" onClick={handleEditImages}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Edit Images</h2>
                <div className="scrollable-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliderImages.map((image, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={image}
                              alt={`Image ${index}`}
                              className="edit-image-preview"
                              style={{ width: "100px", height: "auto" }}
                            />
                          </td>
                          <td>
                            <button className="delete-button">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="close-button" onClick={handleEditImages}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="poster-description">
          <p>
            Did you know that Filipinos have historically shown high acceptance
            rates for vaccination programs? During various public health
            campaigns, such as those for influenza, measles, and polio,
            Filipinos have generally demonstrated a positive attitude towards
            vaccination, contributing to successful immunization efforts across
            different age groups and regions in the Philippines.nfluenza,
            measles, and polio, Filipinos have generally demonstrated a positive
            attitude towards vaccination, contributing to successful
            immunization efforts across different age groups and regions in the
            Philippines.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Right;
