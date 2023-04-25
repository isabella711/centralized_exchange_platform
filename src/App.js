import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Xrp from "./js/Xrp";
import Payment from "./js/Payment";
import Card from "./js/Card";
import Register from "./js/Register";
import Login from "./js/Login";
import UserProfile from "./js/UserProfile";
import Header from "./js/Header";
import { MenuAppBar } from "./js/AppBar";
import { userLogin, userRegister,xrpFetch } from "./api";
import { callApi, callExternalApi } from "./api";
import { fetchSolBalance } from "./reducers/usersReducer";
import store from "./store/store";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const { login, user } = useAuth();
  useEffect(() => {
    // callExternalApi("Ai5qKTxmXjJow3TkexjEWRDYq2Xd4s8X9GC9C3KKmZWS", "sol");
    // userLogin("alice@gmail.com", "12345678").then((res) => {
    //   console.log(`from app`, res);
    // });
    // userRegister("edan@gmail.com", "12345678").then((res) => {
    //   console.log(`res.>>from app`, res);
    // });
    xrpFetch().then(res=>{console.log(`xrpFetch>>>`,res)})
  }, []);
  console.log(`user>>>`, user);
  const users = useSelector((state) => state.users);
  console.log(`usersLoading>>`, users);
  return (
    // <div>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Card />} />
    //       <Route path="/payment/:id" element={<Payment />} />
    //       <Route path="/Xrp" element={<Xrp />} />
    //       <Route path="/Register" element={<Register />} />
    //       <Route path="/UserProfile" element={<UserProfile />} />
    //     </Routes>
    //   </Router>
    // </div>

    <Router>
      <div>
        <MenuAppBar
        // pages={[
        //   { label: "register", path: "/register" },
        //   { label: "login", path: "/login" },
        // ]}
        />
        {/* <Header /> */}
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/addvalue" element={<AddValue />} /> */}
          <Route path="/" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}
