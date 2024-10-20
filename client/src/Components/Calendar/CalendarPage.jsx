import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./CalendarPage.css"; // Import the CSS file

const localizer = momentLocalizer(moment);

const users = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
  { value: "user3", label: "User 3" },
];

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    assignedTo: null,
  });

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    resetEventForm();
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setNewEvent({ ...event });
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id ? newEvent : event
    );
    setEvents(updatedEvents);
    setIsEditing(false);
    resetEventForm();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setIsEditing(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      assignedTo: null,
    });
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-page">
      <h2>Event Calendar</h2>

      {/* Calendar Container */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectEvent={handleSelectEvent}
          className="calendar-component"
        />
      </div>

      {/* Add / Edit Event Form */}
      <div className="event-form">
        <h3>{isEditing ? "Edit Event" : "Add Event"}</h3>

        <div>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </div>

        {/* Date and Time Pickers */}
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={newEvent.start}
            onChange={(date) => setNewEvent({ ...newEvent, start: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="react-datepicker-wrapper"
          />
        </div>

        <div>
          <label>End Date:</label>
          <DatePicker
            selected={newEvent.end}
            onChange={(date) => setNewEvent({ ...newEvent, end: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="react-datepicker-wrapper"
          />
        </div>

        {/* User Assignment */}
        <div>
          <label>Assign To:</label>
          <Select
            value={newEvent.assignedTo}
            onChange={(option) =>
              setNewEvent({ ...newEvent, assignedTo: option })
            }
            options={users}
            className="select-container"
          />
        </div>

        {/* Add / Edit Button */}
        <div>
          <button onClick={isEditing ? handleEditEvent : handleAddEvent}>
            {isEditing ? "Save Changes" : "Add Event"}
          </button>

          {/* Delete Event Button */}
          {isEditing && (
            <button
              style={{ marginLeft: "10px" }}
              className="delete-button"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
