import React, { createContext, useState, useContext, useEffect } from "react";
import { userLogin, userRegister } from "./api";
import axios from "axios";
import {
  userProfile,
  usersLoading,
  stopLoading,
} from "./reducers/usersReducer";
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

  const register = async (email, password) => {
    store.dispatch(usersLoading("pending"));
    const response = await userRegister(email, password);
    if (response.data) {
      try {
        const responseText = await response.data;
        console.log("Raw response text:", responseText);
        setUser(responseText);
        store.dispatch(userProfile(responseText));
        return true;
      } catch (error) {
        store.dispatch(stopLoading("idle"));
        console.error("Error parsing JSON:", error);
      }
    } else {
      store.dispatch(stopLoading("idle"));
      throw new Error("Account already exists");
    }
  };

  const login = async (email, password) => {
    store.dispatch(usersLoading("pending"));
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
        store.dispatch(stopLoading("idle"));
      }
    } else {
      store.dispatch(stopLoading("idle"));
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    store.dispatch(usersLoading("pending"));
    setUser(null);
    localStorage.removeItem("authenticated");
    store.dispatch(userProfile(null));
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
    register,
    authenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
