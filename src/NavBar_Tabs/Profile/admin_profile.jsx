import ProfileLayout from "../../Components/layout_profile";
import "./admin_profile.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "./chart";
import Modal from "react-modal";

function AdminProfile() {
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [healthModalVisible, setHealthModalVisible] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleOpenHealthModal = () => {
    setHealthModalVisible(true);
  };

  const handleCloseHealthModal = () => {
    setHealthModalVisible(false);
    setAdminPassword(""); // Clear the password input when closing the modal
  };

  const handleSubmitPassword = () => {
    // Redirect to the /health-records path (since there's no password check)
    navigate("/health-record");
  };
  return (
    <div className="adminProfile">
      {/* mga button sa right side */}
      <div className="admin-button">
        <button className="health-record-btn" onClick={handleOpenHealthModal}>
          Health Records
        </button>

        {/* Health Records Modal */}
        <Modal
          isOpen={healthModalVisible}
          onRequestClose={handleCloseHealthModal}
          className="health-record-modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2, // Ensure it is above other modals
            },
            content: {
              width: "400px",
              height: "200px",
              margin: "auto",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#f8f8ff",
              color: "black",
              padding: "25px",
            },
          }}
        >
          <div className="health-record-modal-content">
            <p>Please input password to access student health records.</p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
              className="health-record-password-input"
            />
            <div className="health-record-modal-buttons">
              <button className="close-btn" onClick={handleCloseHealthModal}>
                Close
              </button>
              <button className="submit-btn" onClick={handleSubmitPassword}>
                Submit
              </button>
            </div>
          </div>
        </Modal>
        <button
          onClick={() => setCreateAccountModalOpen(true)}
          className="button-create"
        >
          Create Account
        </button>
        <Modal
          isOpen={isCreateAccountModalOpen}
          onRequestClose={() => setCreateAccountModalOpen(false)}
          className="pisting-yawa"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              boxShadow: "none",
            },
            content: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              height: "90vh",
              margin: "auto",
              marginTop: "3vh",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "none",
            },
          }}
        >
          <div className="create-account-modal">
            <h3>Create Account</h3>
            <div className="form">
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="First Name" />
              <label> Age: </label>
              <input type="number" />
              <select>
                <option value="" disabled selected>
                  Sex
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select>
                <option value="" disabled selected>
                  Civil Status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
              <input type="text" placeholder="Tel No" />
              <input type="text" placeholder="Address" />
              <label> Birthdate:</label>
              <input type="date" />
              <input type="text" placeholder="Religion" />
              <input type="text" placeholder="Guardian" />
              <input type="text" placeholder="Guardian's Address" />
              <input type="text" placeholder="Guardian's Tel No" />
            </div>
            <div className="create-account-btn">
              <button
                className="close-btn"
                onClick={() => setCreateAccountModalOpen(false)}
              >
                Close
              </button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </Modal>
        <Link to="/manage">
          <button className="button-manage">Manage Stock</button>
        </Link>
      </div>

      <Chart />
    </div>
  );
}

export default AdminProfile;
