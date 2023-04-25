import React from "react";
import { useAuth } from "../AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Header;
