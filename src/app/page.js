'use client'

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { checkAuthStatus } from "../lib/firebase"; // Assuming you have a method to check auth status

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup views

  useEffect(() => {
    const checkUserStatus = async () => {
      const loggedIn = await checkAuthStatus();
      setIsLoggedIn(loggedIn);
    };
    checkUserStatus();
  }, []);

  const handleToggleAuthView = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="auth-container">
      {showLogin ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onToggleSignup={handleToggleAuthView}
        />
      ) : (
        <Signup
          onSignupSuccess={handleLoginSuccess}
          onToggleLogin={handleToggleAuthView}
        />
      )}
    </div>
  );
}
