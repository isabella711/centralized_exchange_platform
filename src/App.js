import React, { useCallbackss, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Xrp from "./js/Xrp";
import Payment from "./js/Payment";
import Card from "./js/Card";
import Register from "./js/Register";
import { callApi } from "./api";

export default function App() {
  useEffect(() => {
    callApi();
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/Xrp" element={<Xrp />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}
