import React from 'react';

const Card = ({ message }) => {
  // Destructure and set defaults
  const recipientName = message?.recipient?.name || 'Unknown';
  const title = message?.message?.title || '';  // Title from message
  const description = message?.message?.description || 'No message';  // Description from message
  const from = message?.from; // Optional, can be undefined
  const cardColor =  message?.color || 'bg-gray-100';

  return (
    <div className={`flex flex-col justify-betweens p-4 rounded h-64 border bg-${cardColor}`}>
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-gray-800 font-bold">To: {recipientName}</span>
        <span className="date text-xs">
          {new Date(message?.date || Date.now()).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      {title && <h3 className="text-sm font-semibold mt-2">{title}</h3>}
      <div className="text-sm mt-2 mb-1 overflow-y-auto">{description}</div>

      {from && (
        <div className="mt-auto">
          <span className="text-xs text-gray-600 font-bold">From: {from}</span>
        </div>
      )}
    </div>
  );
};

export default Card;
