import React, { useState } from "react";
import "./events.css";
import EventModal from "./event-modal";
import EventFunctionsModal from "./event-functions-modal";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
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
        <p>No events available</p> // Added fallback text
      )}

      {/* Modal Component */}
      <EventModal isOpen={isModalOpen} onClose={closeModal} />
      <EventFunctionsModal
        isAddModalOpen={isAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        closeModal={closeModal}
        eventDetails={selectedEvent}
        handleAddEvent={handleAddEvent}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}

export default Events;
