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
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUser.uid);
      setUsers(usersData);

      const professionalsData = usersData.filter(user => user.isProfessional);
      setProfessionals(professionalsData);
    };

    fetchUsers();
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGroup) {
      const participantList = selectedUser.split(',').map(p => p.trim());
      createNewChat(chatName, participantList, true);
    } else {
      startPrivateChat(selectedUser);
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
                type="radio"
                checked={isGroup}
                onChange={() => setIsGroup(true)}
                className="mr-2"
              />
              Group Chat
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="radio"
                checked={!isGroup}
                onChange={() => setIsGroup(false)}
                className="mr-2"
              />
              Private Chat
            </label>
          </div>
          {isGroup && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chatName">
                Chat Name
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participants">
              {isGroup ? "Participants" : "Select User"}
            </label>
            {isGroup ? (
              <select
                multiple
                value={selectedUser.split(',')}
                onChange={(e) => setSelectedUser(Array.from(e.target.selectedOptions, option => option.value).join(','))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.displayName || user.email}</option>
                ))}
              </select>
            ) : (
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.displayName || user.email}</option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Mental Health Professionals</h3>
            <select
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
                setIsGroup(false);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a professional</option>
              {professionals.map(prof => (
                <option key={prof.id} value={prof.id}>{prof.displayName || prof.email}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Create Chat
            </button>
            <button
              type="button"
              onClick={onClose}
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