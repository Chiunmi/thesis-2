import "./accounts.css";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";

const ManageAccount = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("JHS");

  const accounts = {
    JHS: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
    ],
    SHS: [
      { id: 4, name: "Mark Lee" },
      { id: 5, name: "Emma Brown" },
    ],
    College: [
      { id: 6, name: "Michael White" },
      { id: 7, name: "Sophia Green" },
    ],
  };
  return (
    <div className="manage-account">
      <h2> Staff Accounts</h2>
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/admin" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Admin</h3>
        </Link>
      </div>
      <div className="manage-account-container">
        <div className="account-tabs">
          <button
            className={`tab-button ${activeTab === "JHS" ? "active" : ""}`}
            onClick={() => setActiveTab("JHS")}
          >
            JHS
          </button>
          <button
            className={`tab-button ${activeTab === "SHS" ? "active" : ""}`}
            onClick={() => setActiveTab("SHS")}
          >
            SHS
          </button>
          <button
            className={`tab-button ${activeTab === "College" ? "active" : ""}`}
            onClick={() => setActiveTab("College")}
          >
            College
          </button>
        </div>

        {activeTab === "JHS" && (
          <div className="account-list">
            <h3>JHS Accounts</h3>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              {" "}
              {/* Added padding for better alignment */}
              {accounts.JHS.slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                .map((account) => (
                  <li key={account.id} className="account-item">
                    <div className="account-name">
                      <span>{account.name}</span>
                      {/* Edit button on a separate line */}
                      <div className="edit-row">
                        <button
                          className="account-edit-btn"
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}

        {activeTab === "SHS" && (
          <div className="account-list">
            <h3>SHS Accounts</h3>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              {" "}
              {/* Added padding for better alignment */}
              {accounts.SHS.slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                .map((account) => (
                  <li key={account.id} className="account-item">
                    <div className="account-name">
                      <span>{account.name}</span>
                      <div className="edit-row">
                        <button
                          className="account-edit-btn"
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}

        {activeTab === "College" && (
          <div className="account-list">
            <h3>College Accounts</h3>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              {" "}
              {/* Added padding for better alignment */}
              {accounts.College.slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                .map((account) => (
                  <li key={account.id} className="account-item">
                    <div className="account-name">
                      <span>{account.name}</span>
                      <div className="edit-row">
                        <button
                          className="account-edit-btn"
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </div>
      {/* Modal for Editing Account */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="account-modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "fit-content",
            maxHeight: "70vh",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "20px",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            overflowY: "scroll",
          },
        }}
      >
        <div className="edit-admin-account-modal-content">
          <h2>Create Account</h2>
          {/* Form Fields */}
          <form className="account-form">
            <label>
              Username:
              <input type="text" placeholder="Username" />
            </label>
            <label>
              Password:
              <input type="password" placeholder="Password" />
            </label>
            <label>
              Email:
              <input type="email" placeholder="Email" />
            </label>
            <label>
              Education:
              <input type="text" placeholder="Education" />
            </label>
            <label>
              Level:
              <select>
                <option>College</option>
                <option>High School</option>
                <option>Middle School</option>
              </select>
            </label>
            <label>
              Department:
              <select>
                <option>CBAA</option>
                <option>COE</option>
                <option>CAS</option>
              </select>
            </label>
            <label>
              Course:
              <select>
                <option>BSCS</option>
                <option>BBA</option>
                <option>BSIT</option>
              </select>
            </label>
            <label>
              Grade/Year:
              <select>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
              </select>
            </label>
            <label>
              Section:
              <input type="text" placeholder="Section" />
            </label>

            {/* Buttons */}
            <div className="edit-admin-account-modal-buttons">
              <button
                className="close-btn"
                onClick={() => setIsEditModalOpen(false)}
                type="button"
              >
                Close
              </button>
              <button className="save-btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAccount;
