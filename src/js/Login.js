import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api";
import { useSelector } from "react-redux";
import LoadingSpinner from "./Spinner";
import { store } from "../store/store";
import { stopLoading } from "../reducers/usersReducer";

const Login = (props) => {
  // const [authenticated, setauthenticated] = React.useState(
  //   localStorage.getItem("authenticated") ?? false
  // );
  const { login } = useAuth();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(email, password);
  //     alert("Logged in successfully");
  //   } catch (error) {
  //     alert("Invalid credentials");
  //   }
  // };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result) {
        // usersLoading("idle");
        localStorage.setItem("authenticated", true);
        // usersLoading("pending");
        navigate("/");
      }
    } catch (error) {
      store.dispatch(stopLoading("idle"));
      alert("Internal Server Error");
    }
  };

  return (
    <div className="auth-form-container">
      {loading === "pending" ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="password">password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <button
              type="submit"
              style={{ textAlign: "center", alignSelf: "center", height: 60 }}
            >
              Log In
            </button>
          </form>
          <button
            style={{ height: 60, alignSelf: "center" }}
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Register here.
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
