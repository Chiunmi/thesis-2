import Layout from "../Components/Layout";
import "./schedule.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Initial events without UUID
let eventIdCounter = 1;
const initialEvents = [
  {
    id: eventIdCounter++,
    title: "Big Meeting",
    allDay: true,
    start: new Date(2024, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    id: eventIdCounter++,
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    id: eventIdCounter++,
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function Schedules() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(initialEvents);
  const [editEvent, setEditEvent] = useState(null);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, { ...newEvent, id: eventIdCounter++ }]);
    setNewEvent({ title: "", start: "", end: "" });
  };

  const handleEditEvent = () => {
    const updatedEvents = allEvents.map((event) =>
      event.id === editEvent.id ? { ...event, ...editEvent } : event
    );
    setAllEvents(updatedEvents);
    setEditEvent(null);
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = allEvents.filter((event) => event.id !== id);
    setAllEvents(updatedEvents);
    setEditEvent(null);
  };

  return (
    <div className="schedule-page">
      <h1>PCU-D CLinic Schedule</h1>
      <h4>Add New Event</h4>
      <div className="calendar-title">
        <input
          type="text"
          placeholder="Add Title"
          className="custom-input"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />

        <div className="button-event">
          <button className="add-event" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => setEditEvent(event)}
        style={{ height: 500, margin: "50px" }}
      />

      {editEvent && (
        <div className="edit-event-modal">
          <h2>Edit Event</h2>
          <input
            type="text"
            value={editEvent.title}
            onChange={(e) =>
              setEditEvent({ ...editEvent, title: e.target.value })
            }
          />
          <DatePicker
            selected={editEvent.start}
            onChange={(date) => setEditEvent({ ...editEvent, start: date })}
          />
          <DatePicker
            selected={editEvent.end}
            onChange={(date) => setEditEvent({ ...editEvent, end: date })}
          />
          <div className="button-edit">
            <button className="save-edit" onClick={handleEditEvent}>
              Save Changes
            </button>

            <button
              className="delete-event"
              onClick={() => handleDeleteEvent(editEvent.id)}
            >
              Delete Event
            </button>
            <button className="cancel-edit" onClick={() => setEditEvent(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedules;
