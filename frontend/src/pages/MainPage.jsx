import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from '../context/AppContext';
import MessageComponent from '../components/MessageComponent';
import Card from '../components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import recipients dynamically
import recipients from '../config/recipients.json';

const MainPage = () => {
  const { messages, setMessages } = useAppContext();
  const [inputs, setInputs] = useState([
    { recipient: { name: '', email: '' }, message: '', from: '' }
  ]);
  const [filter, setFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle the calendar visibility

  // Get the predefined colors from .env and split them into an array
  const cardColors = process.env.REACT_APP_TW_CARD_COLORS?.split(', ') || ['#FFFFFF']; // Default to white if no colors are defined

  // Memoize the cards and assign colors from the .env file
  const memoizedCards = useMemo(() => {
    return messages.map((msg, index) => ({
      ...msg,
      color: cardColors[index % cardColors.length], // Cycle through the colors if there are more messages than colors
    }));
  }, [messages, cardColors]);

  const getDateString = (date) => {
    let dateStr = '';
    if(date && date instanceof Date) {
      dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`
    }
    return dateStr;
  }

  const fetchMessages = useCallback(async () => {
    try {
      const queryParams = [];
      if (filter) queryParams.push(`recipient.name=${filter}`);
      // if (selectedDate) queryParams.push(`date=${selectedDate.toISOString().split('T')[0]}`); // Format date as yyyy-mm-dd
      if (selectedDate) queryParams.push(`date=${getDateString(selectedDate)}`); // Format date as yyyy-mm-dd
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${queryString}`);
      if (response.data && JSON.stringify(response.data) !== JSON.stringify(messages)) {
        setMessages(response.data);  // Avoid unnecessary state updates
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages. Please try again!'); // Show error toast
    }
  }, [filter, selectedDate, messages, setMessages]);

  useEffect(() => {
    fetchMessages();
  }, [filter, selectedDate, fetchMessages]);  // Fetch when filter or selectedDate changes

  const addInput = () =>
    setInputs((prevInputs) => [...prevInputs, { recipient: { name: '', email: '' }, message: '', from: '' }]);

  // Handle input change, safely update state
  const handleInputChange = useCallback((index, updatedData) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = updatedData;
      return updatedInputs;
    });
  }, []);

  // Delete a message input by index
  const handleDelete = (index) => {
    setInputs((prevInputs) => prevInputs.filter((_, idx) => idx !== index));
  };

  // Submit all messages to the backend
  const submitMessages = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}`, inputs,  headers: {
        'Content-Type': 'application/json',  // Ensure the content-type is correctly set
    });
      setMessages((prevMessages) => [...prevMessages, ...response.data]);
      setInputs([{ recipient: { name: '', email: '' }, message: '', from: '' }]);
      toast.success('Messages submitted successfully!'); // Show success toast
    } catch (error) {
      console.error('Error submitting messages:', error);
      toast.error('Failed to submit messages. Please try again!'); // Show error toast
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Close the date picker when a date is selected
  };

  const handleLabelClick = () => {
    if (!selectedDate) {
      setShowDatePicker(true); // Show date picker if no date is selected
    }
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      {/* Left Section */}
      <div className="md:w-2/6 md:pr-4 flex flex-col">
        {inputs.map((input, idx) => (
          <MessageComponent
            key={idx}
            index={idx}
            recipients={recipients}
            data={input}
            onUpdate={handleInputChange}
            onDelete={handleDelete}  // Pass delete handler
          />
        ))}
        <div className="flex justify-between pt-2 border-t">
          <button className="text-sm bg-amber-500 hover:bg-amber-600 text-white p-2 rounded" onClick={addInput}>
            {process.env.REACT_APP_ADD_BUTTON_LABEL || 'Add Message'}
          </button>
          <button className="text-sm bg-violet-500 hover:bg-violet-700 text-white p-2 rounded" onClick={submitMessages}>
            {process.env.REACT_APP_SUBMIT_BUTTON_LABEL || 'Submit'}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-4/6 pt-6 md:pt-0 border-t-4 md:border-t-0">
        {/* Filters */}
        <div className="flex pb-2 mb-2 border-b">
          <select
            className="text-sm bg-amber-50 p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Recipients</option>
            {recipients.map((recipient, index) => (
              <option key={index} value={recipient.name}>
                {recipient.name}
              </option>
            ))}
          </select>

          <div className="ml-4 flex items-center">
            <select
              className="text-sm bg-amber-50 p-2 border rounded"
              value={selectedDate ? 'Select Date' : 'All time'}
              onChange={(e) => {
                if (e.target.value === 'All time') {
                  setSelectedDate(null); // Reset selected date
                } else {
                  setShowDatePicker(true); // Open date picker
                }
              }}
            >
              <option value="All time">All time</option>
              <option value="Select Date">Select Date</option>
            </select>

            {selectedDate && (
              <div className="ml-2">
                <span
                  onClick={handleLabelClick}
                  className="text-sm cursor-pointer text-blue-500"
                >
                  ({selectedDate.toLocaleDateString()})
                </span>
              </div>
            )}
            {showDatePicker && (
              <DatePicker
                placeholderText="Select a date"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="text-sm p-2 border rounded ml-2"
              />
            )}
          </div>

          <button className="text-sm ml-auto bg-violet-500 hover:bg-violet-700 text-white p-2 rounded" onClick={fetchMessages}>
          ⟳ Refresh
          </button>
        </div>

        {/* Displaying message count */}
        <div className="text-sm my-4 text-right text-gray-700">
          {memoizedCards.length > 0
            ? <span>Displaying <strong>{memoizedCards.length}</strong> cards</span>
            : 'No messages to display'}
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {memoizedCards.map((msg, idx) => (
            <Card key={idx} message={msg} />
          ))}
        </div>
      </div>

      {/* Toast Container for showing success/error messages */}
      <ToastContainer />
      <div className="hidden bg-cyan-100 bg-yellow-100 bg-pink-100 bg-indigo-100 bg-lime-100 bg-slate-100 bg-orange-100 bg-sky-100 bg-fuchsia-100 bg-emerald-100 bg-violet-100"></div>
    </div>
  );
};

export default MainPage;
