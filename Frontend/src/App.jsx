import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Articles from "./components/Articles";
import Videos from "./components/videos";
import Games from "./components/games";
import ChatSystem from "./components/ChatSystem";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header user={user} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/games" element={<Games />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/chat" element={<ChatSystem user={user} />} />
          </Route>
        </Routes>

        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
