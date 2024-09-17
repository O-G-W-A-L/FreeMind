import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const NewChatModal = ({ isOpen, onClose, createNewChat, startPrivateChat, currentUser }) => {
  const [chatName, setChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchUsers();
    }
  }, [isOpen, currentUser]);

  const fetchUsers = async () => {
    if (!currentUser) {
      console.log("Current user is not available");
      return;
    }
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '!=', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Is Group:", isGroup);
    console.log("Selected Users:", selectedUsers);

    if (isGroup) {
      console.log("Creating group chat");
      await createNewChat(chatName, selectedUsers, true);
    } else {
      console.log("Creating private chat");
      if (selectedUsers.length > 0) {
        console.log("Starting private chat with:", selectedUsers[0]);
        await startPrivateChat(selectedUsers[0]);
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Start a New Chat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="checkbox"
                checked={isGroup}
                onChange={(e) => {
                  setIsGroup(e.target.checked);
                  setSelectedUsers([]);
                }}
                className="mr-2"
              />
              Group Chat
            </label>
          </div>
          {isGroup && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chatName">
                Group Name
              </label>
              <input
                type="text"
                id="chatName"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Users
            </label>
            <select
              multiple={isGroup}
              value={isGroup ? selectedUsers : selectedUsers[0] || ''}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedUsers(isGroup ? values : [values[0]]);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              {availableUsers.map(user => (
                <option key={user.uid} value={user.uid}>{user.displayName || user.email}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => console.log("Create Chat button clicked")}
            >
              Create Chat
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Cancel button clicked");
                onClose();
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;