import React, { useState } from "react";
import Modal from "react-modal";
import "./events.css";
import "./event-modal.css";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [newEventDetails, setNewEventDetails] = useState({
    title: "",
    who: "",
    when: "",
    time: "",
    where: "",
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Vaccination Event for College Students",
      who: "All college students, faculty, and staff",
      when: "September 20, 2024",
      time: "9:00 AM - 5:00 PM",
      where: "University Health Center",
      about: `
        Purpose: To provide vaccination services to college students for influenza and COVID-19 vaccines.
        Important Notes:
        - Students must bring their college ID or any required documentation for registration and verification purposes.
        - Follow all event guidelines, including mask-wearing, social distancing, and any specific instructions provided by event organizers.
        - Students should disclose any relevant medical history or allergies during registration and consult healthcare providers for personalized guidance.
      `,
    },
  ]);

  const openModal = () => setIsModalOpen(true);
  const openAddModal = () => setIsAddModalOpen(true);
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="event-page">
      <p>
        Read through the event details provided, including the event name, date,
        time, venue (if physical), and any special instructions.
      </p>

      <div className="event-buttons">
        <button className="add-event-btn" onClick={openAddModal}>
          Add
        </button>
      </div>

      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event-container">
            <div className="event-function-title">
              <p className="event-title">{event.title}</p>
              <button
                className="event-edit"
                onClick={() => openEditModal(event)}
              >
                Edit
              </button>
              <button
                className="event-delete"
                onClick={() => openDeleteModal(event)}
              >
                Delete
              </button>
            </div>

            <div className="event-details">
              <p className="event-who">
                <strong>Who: </strong> <span>{event.who}</span>
              </p>
              <p className="event-when">
                <strong>When: </strong> <span>{event.when}</span>
              </p>
              <p className="event-time">
                <strong>Time: </strong> <span>{event.time}</span>
              </p>
              <p className="event-where">
                <strong>Where: </strong> <span>{event.where}</span>
              </p>
            </div>

            <h3>About</h3>
            <p className="event-about">
              {event.about.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            <div className="event-button">
              <button className="event-ineterested-btn" onClick={openModal}>
                Interested
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}

      {/* Interested Modal */}
      <Modal
        isOpen={isModalOpen}
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
        <h2>Interested in the Event?</h2>
        <p>Please confirm your interest by clicking Confirm.</p>
        <button className="close-modal-btn" onClick={closeModal}>
          Close
        </button>
        <button className="interedted-confirm-btn"> Confirm</button>
      </Modal>

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
            className="add-event-modal-btn"
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
            value={selectedEvent.title}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Who"
            value={selectedEvent.who}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, who: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="When"
            value={selectedEvent.when}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, when: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Time"
            value={selectedEvent.time}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, time: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Where"
            value={selectedEvent.where}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, where: e.target.value })
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
              handleEditEvent(selectedEvent);
              closeModal();
            }}
          >
            Save Changes
          </button>
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
        <p>
          Are you sure you want to delete the event: <br />
          <strong>{selectedEvent.title}</strong>?
        </p>
        <button className="close-event-modal-btn" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="delete-event-modal-btn"
          onClick={() => {
            handleDeleteEvent(selectedEvent.id);
            closeModal();
          }}
        >
          Delete
        </button>
      </Modal>
    </div>
  );
}

export default Events;
