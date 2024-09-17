import React, { useState } from "react";
import Modal from "react-modal";
import "./event-modal.css";

function EventFunctionsModal({
  isAddModalOpen,
  isEditModalOpen,
  isDeleteModalOpen,
  closeModal,
  eventDetails,
  handleAddEvent,
  handleEditEvent,
  handleDeleteEvent,
}) {
  const [newEventDetails, setNewEventDetails] = useState({
    title: "",
    who: "",
    when: "",
    time: "",
    where: "",
  });

  return (
    <>
      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeModal}
        className="event-modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "40vw",
            height: "55vh",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <div className="add-event-modal">
          <h2>Add New Event</h2>
          <input
            type="text"
            placeholder="Title"
            value={newEventDetails.title}
            onChange={(e) =>
              setNewEventDetails({ ...newEventDetails, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Who"
            value={newEventDetails.who}
            onChange={(e) =>
              setNewEventDetails({ ...newEventDetails, who: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="When"
            value={newEventDetails.when}
            onChange={(e) =>
              setNewEventDetails({ ...newEventDetails, when: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Time"
            value={newEventDetails.time}
            onChange={(e) =>
              setNewEventDetails({ ...newEventDetails, time: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Where"
            value={newEventDetails.where}
            onChange={(e) =>
              setNewEventDetails({ ...newEventDetails, where: e.target.value })
            }
          />
        </div>

        <div className="event-modal-buttons">
          <button className="close-event-modal-btn" onClick={closeModal}>
            Close
          </button>
          <button
            className="save-event-modal-btn"
            onClick={() => {
              handleAddEvent(newEventDetails);
              closeModal();
            }}
          >
            Add Event
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        className="event-modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "40vw",
            height: "55vh",
            margin: "auto",
            borderRadius: "12px",
            backgroundColor: "#f8f8ff",
            padding: "25px",
          },
        }}
      >
        <div className="add-event-modal">
          <h2>Edit Event</h2>
          <input
            type="text"
            placeholder="Title"
            value={eventDetails.title}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="Who"
            value={eventDetails.who}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="When"
            value={eventDetails.when}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="Time"
            value={eventDetails.time}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="Where"
            value={eventDetails.where}
            onChange={() => {}}
          />
        </div>

        <div className="event-modal-buttons">
          <button className="close-event-modal-btn" onClick={closeModal}>
            Close
          </button>
          <button className="save-event-modal-btn">Save Changes</button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
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
        <h2>Delete Event</h2>
        <p>Are you sure you want to delete this event?</p>
        <button className="close-modal-btn" onClick={closeModal}>
          Cancel
        </button>
        <button className="event-modal-delete-btn">Delete</button>
      </Modal>
    </>
  );
}

export default EventFunctionsModal;
