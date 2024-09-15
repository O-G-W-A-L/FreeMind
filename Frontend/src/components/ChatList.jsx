import React from 'react';

const ChatList = ({ chats, setCurrentChat }) => {
  return (
    <div className="w-1/4 border-r border-n-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 p-4 text-n-1">Chats</h2>
      {chats.map(chat => (
        <div 
          key={chat.id} 
          className="p-4 hover:bg-n-7 cursor-pointer transition-colors"
          onClick={() => setCurrentChat(chat)}
        >
          <p className="text-n-1">{chat.name || chat.participants.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;