import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  getDoc, 
  arrayUnion 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import NewChatModal from './NewChatModal';
import { sendMessageToAIChat } from '../api';

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
        setChats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      const messagesRef = collection(db, 'chats', currentChat.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [currentChat]);

  const sendMessage = async (text) => {
    if (currentChat && text.trim()) {
      const messageData = {
        text,
        sender: user.uid,
        timestamp: serverTimestamp(),
        ...(currentChat.isGroup && { senderName: user.displayName }),
      };

      // Add user's message to Firestore
      await addDoc(collection(db, 'chats', currentChat.id, 'messages'), messageData);

      // Update chat's last message info
      await updateDoc(doc(db, 'chats', currentChat.id), {
        lastMessage: text,
        lastMessageTimestamp: serverTimestamp(),
      });

      // AI Integration: If it's an AI chat, process the message and generate a response
      if (currentChat.isAI) {
        try {
          const aiResponse = await generateAIResponse(text);
          await sendAIMessage(aiResponse);
        } catch (error) {
          console.error('Error generating AI response:', error);
          const errorMessage = {
            text: "Sorry, I couldn't process that. Please try again.",
            sender: 'AI',
            timestamp: serverTimestamp(),
            senderName: 'AI Assistant',
          };
          await addDoc(collection(db, 'chats', currentChat.id, 'messages'), errorMessage);
          await updateDoc(doc(db, 'chats', currentChat.id), {
            lastMessage: errorMessage.text,
            lastMessageTimestamp: serverTimestamp(),
          });
        }
      }
    }
  };

  const sendAIMessage = async (text) => {
    if (currentChat && text.trim()) {
      const messageData = {
        text,
        sender: 'AI',
        timestamp: serverTimestamp(),
        senderName: 'AI Assistant',
      };

      // Add AI message to Firestore
      await addDoc(collection(db, 'chats', currentChat.id, 'messages'), messageData);

      // Update chat's last message info
      await updateDoc(doc(db, 'chats', currentChat.id), {
        lastMessage: text,
        lastMessageTimestamp: serverTimestamp(),
      });
    }
  };

  const generateAIResponse = async (userMessage) => {
    // Call the backend API to get AI response
    const aiResponse = await sendMessageToAIChat(userMessage);
    return aiResponse;
  };

  const createNewChat = async (name, participants, isGroup, isAI = false) => {
    const newChatRef = await addDoc(collection(db, 'chats'), {
      name: isGroup || isAI ? name : null,
      participants: isGroup ? [user.uid, ...participants] : isAI ? [user.uid] : [user.uid, participants[0]],
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      lastMessage: '',
      lastMessageTimestamp: null,
      isGroup,
      isAI,
    });

    const allParticipants = isGroup ? [user.uid, ...participants] : isAI ? [user.uid] : [user.uid, participants[0]];
    for (const participantId of allParticipants) {
      await updateDoc(doc(db, 'users', participantId), {
        chats: arrayUnion(newChatRef.id),
      });
    }

    setCurrentChat({ id: newChatRef.id, name, participants: allParticipants, isGroup, isAI });
    setIsNewChatModalOpen(false);
    setIsMobileSidebarOpen(false);
  };

  const startPrivateChat = async (otherUserId) => {
    const existingChat = chats.find(chat => 
      !chat.isGroup && !chat.isAI && chat.participants.includes(otherUserId) && chat.participants.length === 2
    );

    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      await createNewChat(null, [otherUserId], false);
    }
  };

  const getUserInfo = async (userId) => {
    if (typeof userId !== 'string') {
      console.error('Invalid userId:', userId);
      return null;
    }
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
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
