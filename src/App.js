import React,{ useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Xrp from "./js/Xrp";
import Payment from "./js/Payment";
import Card from "./js/Card";
import Register from "./js/Register";
import UserProfile from "./js/UserProfile";
import { callApi, callExternalApi } from "./api";

export default function App() {
  useEffect(() => {
    callExternalApi("Ai5qKTxmXjJow3TkexjEWRDYq2Xd4s8X9GC9C3KKmZWS", "sol");
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/Xrp" element={<Xrp />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}
