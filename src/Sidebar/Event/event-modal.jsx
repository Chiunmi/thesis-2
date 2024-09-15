import React from "react";
import Modal from "react-modal";
import "./event-modal.css";

function EventModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="event-modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          width: "35vw",
          height: "22vh",
          margin: "auto",
          borderRadius: "12px",
          backgroundColor: "#f8f8ff",
          padding: "25px",
        },
      }}
    >
      <h2>Interested in the Event?</h2>
      <p>Please confirm your interest by clicking Confirm.</p>
      <button className="close-modal-btn" onClick={onClose}>
        Close
      </button>
      <button className="interedted-confirm-btn"> Confirm</button>
    </Modal>
  );
}

export default EventModal;
