import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./Spinner";
import { stopLoading } from "../reducers/usersReducer";
import { store } from "../store/store";

function Register(props) {
  // const [inputs, setInputs] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };
  const { loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(email, pass, name);
      if (result) {
        // usersLoading("idle");
        localStorage.setItem("authenticated", true);
        // usersLoading("pending");
        navigate("/");
      }
    } catch (error) {
      store.dispatch(stopLoading("idle"));
      alert("Invalid credentials");
    }
  };
  return (
    <div className="auth-form-container">
      {loading === "pending" ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="full Name"
            />
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
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <button style={{ height: 60 }} type="submit">
              Sign Up
            </button>
          </form>
          <button
            style={{ height: 60 }}
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </button>
        </>
      )}
    </div>
  );
}

export default Register;
