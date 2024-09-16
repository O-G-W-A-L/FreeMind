import React from 'react';
import { FaUsers, FaUser } from 'react-icons/fa';

const ChatSidebar = ({ chats, setCurrentChat, openNewChatModal, isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedChats = [...chats].sort((a, b) => {
    return (b.lastMessageTimestamp?.toDate() || 0) - (a.lastMessageTimestamp?.toDate() || 0);
  });

  return (
    <div
      className={`w-full md:w-1/4 bg-n-7 text-n-0 overflow-y-auto transition-all duration-300 ease-in-out ${isMobileSidebarOpen ? 'fixed inset-0 z-50' : 'hidden md:block'}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Chats
          </h2>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-n-0"
          >
            Close
          </button>
        </div>
        <button
          onClick={openNewChatModal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-n-0 font-bold py-2 px-4 rounded transition duration-300"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          New Chat
        </button>
      </div>
      <div className="divide-y divide-n-6">
        {sortedChats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-n-6 cursor-pointer transition-colors flex items-center"
            onClick={() => {
              setCurrentChat(chat);
              setIsMobileSidebarOpen(false);
            }}
          >
            <div className="mr-3">
              {chat.isGroup ? (
                <FaUsers className="text-2xl text-indigo-400" />
              ) : (
                <FaUser className="text-2xl text-green-400" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold" style={{ fontFamily: 'var(--font-sora)' }}>
                {chat.name || (chat.isGroup ? 'Group Chat' : 'Private Chat')}
              </h3>
              <p className="text-sm text-n-2 truncate">{chat.lastMessage}</p>
              {chat.lastMessageTimestamp && (
                <p className="text-xs text-n-3 mt-1">
                  {formatDate(chat.lastMessageTimestamp.toDate())}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;