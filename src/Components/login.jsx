import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./login.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import admission from "../assets/admission.jpeg";
import consultation from "../assets/consultation.jpeg";
import dental from "../assets/dental.jpeg";
import waterAnalysis from "../assets/water-analysis.jpeg";
import intrams from "../assets/intrams.jpeg";
import vaccination from "../assets/vaccination2.jpeg";
import xray from "../assets/xray.jpeg";
import drug from "../assets/drug.jpeg";
import medical from "../assets/medical.jpeg";

function Login() {
  const images = [
    admission,
    drug,
    medical,
    consultation,
    dental,
    waterAnalysis,
    intrams,
    vaccination,
    xray,
  ];

  const doubledImages = [...images, ...images];

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens on load
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user logged in

  const toggleLoginMode = () => {
    setIsAdminLogin((prevState) => !prevState);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleAgreementSubmit = () => {
    if (isAgreed) {
      // Proceed with login
      setIsModalOpen(false);
      setIsLoggedIn(true); // Set user as logged in
    } else {
      alert("You must agree to the terms to proceed.");
    }
  };

  return (
    <div className="login-page">
      {/* Background container with moving images */}
      <div className="background-container">
        <div className="moving-images">
          {doubledImages.map((image, index) => (
            <div key={index} className="image-column">
              <img
                src={image}
                alt={`Background ${index}`}
                className="bg-image"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="gradient-overlay"></div>

      {/* Login form - only shown if logged in */}
      {isLoggedIn ? (
        <div className="login-container">
          <div className="login-header">
            <img src={logo} alt="" className="login-logo" />
            <p className="login-university-name">
              Philippine Christian University
            </p>
          </div>
          <div className="login-content">
            {/* Conditional rendering based on the current state */}
            {!isAdminLogin ? (
              <>
                <h3>Student Login</h3>
                <div className="login-buttons">
                  <button className="login-google">Login with Google</button>
                  <p> or </p>
                  <button
                    onClick={toggleLoginMode}
                    className="admin-toggle-button"
                  >
                    Login as Admin
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Admin Login</h3>
                <label>Username: </label>
                <input type="text" required />

                <label>Password: </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="password-input"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="visibility-icon"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>
                <div className="login-buttons">
                  <button className="login-button" type="submit">
                    Login
                  </button>
                  <p> or </p>
                  <button
                    onClick={toggleLoginMode}
                    className="student-toggle-button"
                  >
                    Login as Student
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* NDA Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Non-Disclosure Agreement (NDA) for Personal Health Records</h2>
            <p>
              By checking the box below, I acknowledge and agree to the
              following:
            </p>
            <ul>
              <li>
                <strong>Collection of Information:</strong> I understand that
                the website will collect my personal health records and other
                related information.
              </li>
              <li>
                <strong>Use of Information:</strong> I acknowledge that my
                information will be used for improving services, preventive care
                and wellness programs, and providing personalized health
                recommendations to Philippine Christian University's Clinic.
              </li>
              <li>
                <strong>Confidentiality:</strong> I am aware that the website
                will take necessary measures to protect my personal health
                records and will not disclose my information to third parties
                without my consent, except as required by law.
              </li>
              <li>
                <strong>Right to Withdraw:</strong> I understand that I have the
                right to withdraw my consent at any time by going to the
                University Clinic and submitting a request personally.
              </li>
              <li>
                <strong>Privacy Policy:</strong> I have read and understood the
                website’s Privacy Policy, which details how my information will
                be collected, used, and protected.
              </li>
            </ul>
            <label>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed((prev) => !prev)}
              />
              I understand and agree to the above terms regarding the collection
              and handling of my personal health records.
            </label>
            <br />
            <div className="nda-button">
              <button
                className="nda-btn"
                onClick={handleAgreementSubmit}
                disabled={!isAgreed}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
