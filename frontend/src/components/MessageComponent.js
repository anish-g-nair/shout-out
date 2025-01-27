import React, { useState, useEffect } from 'react';

// Read from the environment variable in React (it will be available after build)
const hideFields = process.env.REACT_APP_HIDE_FIELDS ? JSON.parse(process.env.REACT_APP_HIDE_FIELDS) : [];

const MessageComponent = ({ index, data, recipients, onUpdate, onDelete }) => {
  // State for managing recipient, title, description, and sender (from)
  const [recipient, setRecipient] = useState(data?.recipient || { name: '', email: '' });
  const [title, setTitle] = useState(data?.message?.title || ''); // Handle title
  const [description, setDescription] = useState(data?.message?.description || ''); // Handle description
  const [from, setFrom] = useState(data?.from || '');

  // Update parent component whenever recipient, message, or from changes
  useEffect(() => {
    if (onUpdate) {
      onUpdate(index, { recipient, message: { title, description }, from }); // Pass correct structure
    }
  }, [recipient, title, description, from, onUpdate, index]);

  return (
    <div className="message-component px-4 py-4 mb-4 bg-slate-100 border border-slate-200 rounded">
      <div className="flex justify-between items-center">
        {/* Recipient Dropdown */}
        <div>
          <label htmlFor={`recipient-${index}`} className="text-sm text-slate-500">Recipient:</label>
          <select
            className="text-sm p-2 ml-2 rounded"
            id={`recipient-${index}`}
            value={recipient.name}
            onChange={(e) => setRecipient((prev) => ({ ...prev, name: e.target.value }))}>
            <option value="">Select Recipient</option>
            {recipients.map((recipient, idx) => (
              <option key={idx} value={recipient.name}>
                {recipient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Delete Button 🗑️ */}
        <button
          className="text-xl text-red-500 hover:text-red-700"
          onClick={() => onDelete(index)} // Trigger delete on click
          title='Delete message card'
        >
          ⛌
        </button>
      </div>

      {/* Title Input - Conditionally render based on hideFields */}
      {!hideFields.includes('title') && (
        <div>
          {/* <label htmlFor={`title-${index}`}>Title:</label> */}
          <input
            id={`title-${index}`}
            type="text"
            maxLength="70"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Handle title change
            className="text-sm p-2 mt-2 w-full rounded border"
            placeholder="Message title upto 70 characters (optional)"
          />
        </div>
      )}

      {/* Description Input */}
      <div>
        {/* <label htmlFor={`description-${index}`}>Message:</label> */}
        <textarea
          id={`description-${index}`}
          placeholder="Enter your message"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Handle description change
          className="text-sm p-2 mt-2 w-full h-20 rounded border"
        />
      </div>

      {/* From Dropdown - Conditionally render based on hideFields */}
      {!hideFields.includes('from') && (
        <div>
          <label htmlFor={`from-${index}`} className="text-sm text-slate-500">From:</label>
          <select
            className="text-sm py-2 mt-2 px-1 ml-2 rounded"
            id={`from-${index}`}
            value={from}
            onChange={(e) => setFrom(e.target.value)} // Handle "From" change
          >
            <option value="">Select From</option>
            {recipients.map((recipient, idx) => (
              <option key={idx} value={recipient.name}>
                {recipient.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
