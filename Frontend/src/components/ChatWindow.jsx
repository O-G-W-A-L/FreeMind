import React, { useRef, useEffect, useState } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chat, messages, sendMessage, currentUser, openSidebar, onLongPress }) => {
  const messagesEndRef = useRef(null);
  const [longPressTimer, setLongPressTimer] = useState(null);

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
      minute: '2-digit',
    });
  };

  const handleTouchStart = (userId) => {
    if (chat.isGroup && userId !== currentUser.uid) {
      const timer = setTimeout(() => {
        onLongPress(userId);
      }, 500);
      setLongPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-n-8 text-n-1">
      <div className="bg-n-7 text-n-0 p-4 flex items-center shadow-md">
        <button
          onClick={openSidebar}
          className="md:hidden mr-4 text-n-0 focus:outline-none hover:bg-n-6 rounded p-2"
        >
          ☰
        </button>
        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-sora)' }}>
          {chat.name || (chat.isGroup ? 'Group Chat' : chat.isAI ? 'AI Chat' : 'Private Chat')}
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === currentUser.uid ? 'text-right' : 'text-left'}`}
            onTouchStart={() => handleTouchStart(message.sender)}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart(message.sender)}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div
              className={`inline-block max-w-xs md:max-w-md rounded-lg px-4 py-2 transition-all duration-300 ease-in-out ${
                message.sender === currentUser.uid 
                  ? 'bg-n-6 text-n-0' 
                  : message.sender === 'AI' 
                    ? 'bg-green-600 text-n-0' 
                    : 'bg-n-1 text-n-7'
              }`}
            >
              {(chat.isGroup || chat.isAI) && (
                <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-sora)' }}>
                  {message.sender === currentUser.uid 
                    ? currentUser.displayName 
                    : message.sender === 'AI' 
                      ? 'AI Assistant' 
                      : message.senderName}
                </p>
              )}
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
