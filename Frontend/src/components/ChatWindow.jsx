import React, { useRef, useEffect } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chat, messages, sendMessage, currentUser, openSidebar }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-grow flex flex-col bg-indigo-100">
      <div className="bg-indigo-800 text-white p-4 flex items-center">
        <button
          onClick={openSidebar}
          className="md:hidden mr-4 text-white"
        >
          ☰
        </button>
        <h2 className="text-xl font-bold">
          {chat.name || (chat.isGroup ? 'Group Chat' : 'Private Chat')}
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === currentUser.uid ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
              message.sender === currentUser.uid ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'
            }`}>
              <p className="font-semibold text-sm">{message.senderName}</p>
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-75">
                {message.timestamp && formatDate(message.timestamp.toDate())}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;