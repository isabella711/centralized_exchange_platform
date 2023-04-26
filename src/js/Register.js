import React from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import ReactDOM from "react-dom/client";

function Register(props) {
  // const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(inputs.id);
  //   console.log(inputs.password);
  // };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Enter your ID:
    //     <input
    //       type="text"
    //       name="id"
    //       value={inputs.id || ""}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Enter your password:
    //     <input
    //       type="number"
    //       name="password"
    //       value={inputs.password || ""}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <input type="submit" />
    // </form>
    <div className="auth-form-container">
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
        <button type="submit">Sign Up</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
}

export default Register;
