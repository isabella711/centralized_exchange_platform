import React, { useState } from "react";
import { useAuth } from "../AuthContext";


const Login_section = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in successfully");
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  return(
    <div style={{ padding: "20px 20px 10px", textAlign: "left"}}>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit} style={{
          display: "flex",
          "flex-direction": "column",
          padding: "20px 20px ",
        }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "5px 10px",height:"30px" ,"max-width":"700px"}}
        />
        <p></p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "5px 10px",height:"30px" ,"max-width":"700px"}}
        />
        <p></p>
        <button type="submit"style={{height:"30px" ,width:"100px"}}  >Login</button>
      </form>
    </div>
  

  );
}

const Register_section = () => {
  const [r_email, setRemail] = useState('');
  const [r_password, setRpassword] = useState('');
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ r_email, r_password }),
    });

    if (response.status === 201) {
      alert('User registered successfully');
    } else
	{
        alert('Registration failed');
      }
    };

    return(
      <div style={{ padding: "20px 20px 10px", textAlign: "left"}}>
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit} style={{
          display: "flex",
          "flex-direction": "column",
          padding: "20px 20px ",
        }}>
          <input
            type="r_email"
            placeholder="Email"
            value={r_email}
            onChange={(e) => setRemail(e.target.value)}
            style={{ padding: "5px 10px" ,height:"30px" ,"max-width":"700px"}}
          />
          <p></p>
          <input
            type="r_password"
            placeholder="Password"
            value={r_password}
            onChange={(e) => setRpassword(e.target.value)}
            style={{ padding: "5px 10px",height:"30px" ,"max-width":"700px"}}
          />
          <p></p>
          <button type="submit" style={{height:"30px" ,width:"100px"}} >Register</button>
        </form>
      </div>
    );

}

function ToggleComponents() {
  const [activeComponent, setActiveComponent] = useState("Login_section");


  return (
    <div style={{padding: "20px 30px"}}>
    <button onClick={() => setActiveComponent(activeComponent === "Login_section" ? "Register_section" : "Login_section" )} style={{height:"30px" ,width:"100px"}}>
    {activeComponent === "Login_section" ? "Register" : "Login" }
    </button>
    {activeComponent === "Login_section" ? <Login_section /> : <Register_section />}
  </div>
 
  );
};

export default ToggleComponents;
