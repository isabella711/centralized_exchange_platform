import React from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import ReactDOM from "react-dom/client";

function Register() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs.id);
    console.log(inputs.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your ID:
        <input
          type="text"
          name="id"
          value={inputs.id || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your password:
        <input
          type="number"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default Register;
