import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Protected route component to restrict access
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // If the user is not logged in, redirect them to SignIn
    return <Navigate to="/signin" />;
  }
  // If the user is authenticated, render the protected content
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  // Set up Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/articles" element={<Articles />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute user={user}>
                <Hero />
                <Benefits />
                <Services />
                <Resources />
                <Roadmap />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
