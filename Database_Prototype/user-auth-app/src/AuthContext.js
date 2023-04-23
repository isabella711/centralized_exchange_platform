import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
	console.log('Credentials:', JSON.stringify({ email, password }));
    console.log('Response:', response);
	console.log('Response.ok:', response.ok);
    if (response.ok) {
	 try {
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      const data = JSON.parse(responseText);
      console.log('Parsed response data:', data);
      setUser(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };
  
  const addValue = async (value) => {
	  if (!user) {
		throw new Error('User not logged in');
	  }

	  const response = await fetch('http://localhost:5000/addvalue', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: user.email, value }),
	  });

	  if (!response.ok) {
		throw new Error('Failed to add value');
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
