import "./request_forms.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";

function RequestForms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCancelModal = (request) => {
    setSelectedRequest(request);
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => setIsCancelModalOpen(false);

  // Dummy data for sent requests
  const sentRequests = [
    {
      id: 1,
      request: "Medical Check-Up",
      status: "Pending",
    },
    {
      id: 2,
      request: "Vaccination Schedule",
      status: "Approved",
    },
    {
      id: 3,
      request: "Consultation",
      status: "Completed",
    },
  ];
  return (
    <div className="request-form-page">
      <div className="request-note">
        Fill out the appropriate leave form based on your situation. Please wait
        for confirmation or approval after submitting the form.
        <p className="form-warning">
          {" "}
          Fabricating information or providing false details can lead to
          consequences and may impact your credibility and trustworthiness.
        </p>
      </div>
      <div className="sent-requests">
        <button className="sent-request-btn" onClick={openModal}>
          View Sent Requests
        </button>
      </div>
      {/* Modal for sent requests */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="sent-requests-modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "60vw",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <h2>Sent Requests</h2>

        {/* Table for sent requests */}
        <table className="sent-requests-table">
          <thead>
            <tr>
              <th>Request</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sentRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.request}</td>
                <td
                  className="status-column"
                  style={{
                    color:
                      request.status === "Pending"
                        ? "red"
                        : request.status === "Approved"
                        ? "blue"
                        : "green",
                  }}
                >
                  {request.status}
                </td>

                <td>
                  {/* Actions: Cancel and Reschedule */}
                  <div className="request-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => openCancelModal(request)}
                      disabled={request.status === "Completed"}
                    >
                      Cancel
                    </button>
                    <button
                      className="reschedule-btn"
                      disabled={request.status === "Completed"}
                    >
                      Reschedule
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isCancelModalOpen}
          onRequestClose={closeCancelModal}
          className="cancel-modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            content: {
              width: "35vw",
              height: "25vh",
              margin: "auto",
              borderRadius: "12px",
              backgroundColor: "#f8f8ff",
              padding: "25px",
            },
          }}
        >
          <h2>Cancel Request</h2>
          <p>
            Are you sure you want to cancel the request for: <br />
            <strong>{selectedRequest?.request}</strong>?
          </p>
          <div className="form-cancel-modal-actions">
            <button
              className="close-event-modal-btn"
              onClick={closeCancelModal}
            >
              No
            </button>
            <button
              className="delete-event-modal-btn"
              onClick={() => {
                // Handle cancel logic here (for now just close the modal)
                console.log(
                  `Canceled request for: ${selectedRequest?.request}`
                );
                closeCancelModal();
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
        {/* Close button for the modal */}
        <div className="modal-actions">
          <button className="close-modal-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Appointment Request Form</p>
          <h3>
            Allows students to request appointments with doctors, nurses, or
            counselors. It should capture preferred dates, times, and the reason
            for the visit.
          </h3>

          <div className="form-button">
            <Link to="/appointment-request-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Medical Leave Form</p>
          <h3>
            If you require medical leave due to illness or medical reasons,
            complete the "Medical Leave Form." Provide your personal
            information, diagnosis (if applicable), expected duration of leave,
            and any medical certificates or doctor's notes.
          </h3>

          <div className="form-button">
            <Link to="/medical-leave-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Medical Record Request/Release Form</p>
          <h3>
            Allows students to request or authorize the release of their medical
            records to another healthcare provider.
          </h3>

          <div className="form-button">
            <Link to="/medical-record-request-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title">
            {" "}
            Parental Consent for Appointment (for minors)
          </p>
          <h3>
            Required for students under a certain age to schedule appointments,
            with parental or guardian consent.
          </h3>

          <div className="form-button">
            <Link to="/parental-consent-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Referral Form</p>
          <h3>
            Used by the clinic to refer students to specialists or external
            healthcare providers.
          </h3>

          <div className="form-button">
            <Link to="/referral-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Special Leave Request Form</p>
          <h3>
            For unique or special leave requests (e.g., maternity leave,
            bereavement leave), use the "Special Leave Request Form." Specify
            the reason for the special leave, duration, and any additional
            information required.
          </h3>

          <div className="form-button">
            <Link to="/special-leave-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Student Absence Form</p>
          <h3>
            For students who need to report an absence, fill out the "Student
            Absence Form." Include details such as your name, student ID,
            date(s) of absence, reason, and any required supporting documents.
          </h3>
        </div>
        <div className="form-button">
          <Link to="/student-absence-form">
            <button className="request-form-btn">Submit a Form</button>
          </Link>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Telehealth Appointment Request Form</p>
          <h3>
            For scheduling virtual appointments or teleconsultations, especially
            important for remote or online services.
          </h3>
        </div>
        <div className="form-button">
          <Link to="/telehealth-form">
            <button className="request-form-btn">Submit a Form</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RequestForms;
