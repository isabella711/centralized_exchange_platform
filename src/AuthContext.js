import React, { createContext, useState, useContext } from "react";
import { userLogin } from "./api";
import axios from "axios";

const AuthContext = createContext({
  // user: null,
  // login: (email, password) => {},
  // logout: () => {},
  // // addValue,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const login = (email, password) =>
  //   userLogin(email, password).then((res) => {
  //     console.log(`res>>>`, res);
  //     setUser(res);
  //   });

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    console.log("Credentials:", JSON.stringify({ email, password }));
    console.log("Response:", response);
    console.log("Response.ok:", response.ok);
    if (response.data) {
      try {
        const responseText = await response.data;
        console.log("Raw response text:", responseText);
        setUser(responseText);
        console.log(`data set<<<`, responseText);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
