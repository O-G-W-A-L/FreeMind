import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import NewChatModal from './NewChatModal';

const ChatSystem = () => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, where('participants', 'array-contains', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChats(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      const messagesRef = collection(db, 'chats', currentChat.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });

      return () => unsubscribe();
    }
  }, [currentChat]);

  const sendMessage = async (text) => {
    if (currentChat && text.trim()) {
      await addDoc(collection(db, 'chats', currentChat.id, 'messages'), {
        text,
        sender: user.uid,
        senderName: user.displayName,
        timestamp: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', currentChat.id), {
        lastMessage: text,
        lastMessageTimestamp: serverTimestamp()
      });
    }
  };

  const createNewChat = async (name, participants, isGroup) => {
    const newChatRef = await addDoc(collection(db, 'chats'), {
      name: isGroup ? name : null,
      participants: isGroup ? [user.uid, ...participants] : [user.uid, participants[0]],
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      lastMessage: '',
      lastMessageTimestamp: null,
      isGroup
    });

    setCurrentChat({ id: newChatRef.id, name, participants: isGroup ? [user.uid, ...participants] : [user.uid, participants[0]], isGroup });
    setIsNewChatModalOpen(false);
    setIsMobileSidebarOpen(false);
  };

  const startPrivateChat = async (otherUserId) => {
    const existingChat = chats.find(chat => 
      !chat.isGroup && chat.participants.includes(otherUserId) && chat.participants.length === 2
    );

    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      const otherUser = await getUserInfo(otherUserId);
      createNewChat(null, [otherUserId], false);
    }
  };

  const getUserInfo = async (userId) => {
    const userDoc = await getDocs(doc(db, 'users', userId));
    return userDoc.data();
  };

  const handleLongPress = (userId) => {
    if (currentChat.isGroup && userId !== user.uid) {
      startPrivateChat(userId);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      <ChatSidebar
        chats={chats}
        setCurrentChat={setCurrentChat}
        openNewChatModal={() => setIsNewChatModalOpen(true)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      {currentChat ? (
        <ChatWindow 
          chat={currentChat} 
          messages={messages} 
          sendMessage={sendMessage}
          currentUser={user}
          openSidebar={() => setIsMobileSidebarOpen(true)}
          onLongPress={handleLongPress}
        />
      ) : (
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-white text-xl font-light">Select a chat or start a new conversation</p>
        </div>
      )}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        createNewChat={createNewChat}
        startPrivateChat={startPrivateChat}
        currentUser={user}
      />
    </div>
  );
};

export default ChatSystem;