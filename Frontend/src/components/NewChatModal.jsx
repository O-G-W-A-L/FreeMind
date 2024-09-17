import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const NewChatModal = ({ isOpen, onClose, createNewChat, startPrivateChat, currentUser }) => {
  const [chatName, setChatName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isGroup, setIsGroup] = useState(true);
  const [users, setUsers] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser && currentUser.uid) {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.id !== currentUser.uid);
        setUsers(usersData);

        const professionalsData = usersData.filter(user => user.isProfessional);
        setProfessionals(professionalsData);
      } else {
        console.error("Current user is not available");
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Is Group:", isGroup);
    console.log("Selected User:", selectedUser);

    if (isGroup) {
      console.log("Creating group chat");
      const participantList = selectedUser.split(',').map(p => p.trim());
      createNewChat(chatName, participantList, true);
    } else {
      console.log("Creating private chat");
      if (selectedUser) {
        console.log("Starting private chat with:", selectedUser);
        startPrivateChat(selectedUser);
      } else {
        console.error("No user selected for private chat");
      }
    }
    setChatName('');
    setSelectedUser('');
    setIsGroup(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Create New Chat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="checkbox"
                checked={isGroup}
                onChange={(e) => setIsGroup(e.target.checked)}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participants">
              {isGroup ? 'Participants' : 'User'}
            </label>
            <select
              id="participants"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a user</option>
              {(isGroup ? users : professionals).map(user => (
                <option key={user.id} value={user.id}>
                  {user.displayName || user.email}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
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
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
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