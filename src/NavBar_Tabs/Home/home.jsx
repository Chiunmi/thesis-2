import "./home.css";
import Right from "../../Components/right";
import React, { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  const handleAddAnnouncement = (title, content) => {
    console.log("New Announcement:", { title, content });
    // Logic for adding the announcement
  };

  const handleEditAnnouncement = (updatedTitle, updatedContent) => {
    console.log("Updated Announcement:", {
      title: updatedTitle,
      content: updatedContent,
    });
    // Logic for editing the announcement
  };

  const handleDeleteAnnouncement = () => {
    console.log("Announcement deleted.");
    // Logic for deleting the announcement
  };

  const openAddAnnouncementModal = () => {
    setIsEditing(false);
    setAnnouncementTitle(""); // Clear title
    setAnnouncementContent(""); // Clear content
    setIsAddEditModalOpen(true);
  };

  const openEditAnnouncementModal = (title, content) => {
    setIsEditing(true);
    setAnnouncementTitle(title); // Populate title
    setAnnouncementContent(content); // Populate content
    setIsAddEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="home-page">
      <div className="welcome">
        <span className="hello">Hello, Jenine!</span>

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
                <button
                  className="save-btn"
                  onClick={() => {
                    if (isEditing) {
                      handleEditAnnouncement(
                        announcementTitle,
                        announcementContent
                      );
                    } else {
                      handleAddAnnouncement(
                        announcementTitle,
                        announcementContent
                      );
                    }
                    setIsAddEditModalOpen(false);
                  }}
                >
                  {isEditing ? "Save Changes" : "Save"}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* Announcement List */}
        <div className="announcement-container">
          {/* Announcement 1 */}
          <div className="announcement-content">
            <div className="announcement-buttons">
              <span className="announcement-title">Announcement One</span>
              <button
                className="edit-announcement"
                onClick={() =>
                  openEditAnnouncementModal(
                    "Announcement One",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  )
                }
              >
                Edit
              </button>

              <button className="delete-announcement" onClick={openDeleteModal}>
                Delete
              </button>

              {/* Delete Confirmation Modal */}
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="see-details">{" >"} See details</p>
          </div>
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
              <button
                className="delete-btn"
                onClick={() => {
                  handleDeleteAnnouncement();
                  setIsDeleteModalOpen(false);
                }}
              >
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
