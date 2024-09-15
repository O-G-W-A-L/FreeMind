import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-transparent"> {/* Changed from 'bg-white' to 'bg-transparent' */}
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-r transition duration-300"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
