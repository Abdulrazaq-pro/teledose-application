import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase"; // Adjust path if needed

const Test = () => {
  const handleLogout = async () => {
    try {
      console.log("Auth object:", auth); // Confirm auth is defined
      await signOut(auth);
      console.log("User successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Test Logout</button>;
};

export default Test;
