import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './events.css';

// Fetch events function
const fetchEvents = async () => {
  const response = await axios.get('/events'); // Adjust the URL based on your API endpoint
  return response.data;
};

// Post new event function
const postNewEvent = async (formData) => {
  const response = await axios.post('/events', formData); // Adjust the URL based on your API endpoint
  return response.data;
};

// Attend event function
const attendEvent = async (eventId) => {
  const response = await axios.post(`/events/${eventId}/attend`); // Adjust the URL based on your API endpoint
  return response.data;
};

function Events() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [limit, setLimit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  
  const queryClient = useQueryClient();
  
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const createEventMutation = useMutation({
    mutationFn: postNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event created successfully!');
    },
    onError: (error) => {
      toast.error(`Error creating event: ${error.response?.data.message}`);
    }
  });

  const attendEventMutation = useMutation({
    mutationFn: attendEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Successfully marked as attending!');
    },
    onError: (error) => {
      toast.error(`Error attending event: ${error.response?.data.message}`);
    }
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('limit', limit); // Optional, adjust if needed
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (image) {
      formData.append('image', image);
    }
    createEventMutation.mutate(formData);
  };

  const handleAttendEvent = (eventId) => {
    attendEventMutation.mutate(eventId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <div className="event-container">
      <form className="event-form" onSubmit={handleCreateEvent}>
        <h2>Create New Event</h2>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <div>
          <label>Limit</label>
          <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} required />
        </div>
        <div>
          <label>Start Date</label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date</label>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e) => {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          }} />
          {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
        </div>
        <button type="submit">Create Event</button>
      </form>
      <div className="event-list">
        {events.map(event => (
          <div className="event-card" key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.body}</p>
            <img
                src={event.url}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            <p>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
            <button onClick={() => handleAttendEvent(event._id)}>Attend</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Events;
