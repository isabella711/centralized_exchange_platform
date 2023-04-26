import React, { createContext, useState, useContext, useEffect } from "react";
import { userLogin } from "./api";
import axios from "axios";
import { userProfile, usersLoading } from "./reducers/usersReducer";
import { store } from "./store/store";

const AuthContext = createContext({
  user: null,
  login: (email, password) => {},
  logout: () => {},
  // addValue,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") ?? false
  );
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      console.log(`...is set yes`);
      setauthenticated(loggedInUser);
    } else {
      console.log(`...is set`);
      setauthenticated(false);
    }
  }, [authenticated, setauthenticated]);
  const login = async (email, password) => {
    const response = await userLogin(email, password);
    console.log("Credentials:", JSON.stringify({ email, password }));
    console.log("Response:", response);
    if (response.data) {
      try {
        const responseText = await response.data;
        console.log("Raw response text:", responseText);
        setUser(responseText);
        store.dispatch(userProfile(responseText));
        return true;
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    store.dispatch(userProfile(null));
    setUser(null);
    localStorage.removeItem("authenticated");
  };

  const addValue = async (value) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const response = await fetch("http://localhost:5000/addvalue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, value }),
    });

    if (!response.ok) {
      throw new Error("Failed to add value");
    }
  };

  const value = {
    user,
    login,
    logout,
    addValue,
    authenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
