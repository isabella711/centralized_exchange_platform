import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Card from "./js/Card";
import Register from "./js/Register";
import Login from "./js/Login";
import { MenuAppBar } from "./js/AppBar";
import { useSelector } from "react-redux";

export default function App() {
  const { login, user, authenticated } = useAuth();
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    // callExternalApi("Ai5qKTxmXjJow3TkexjEWRDYq2Xd4s8X9GC9C3KKmZWS", "sol");
    // userLogin("alice@gmail.com", "12345678").then((res) => {
    //   console.log(`from app`, res);
    // });
    // userRegister("edan@gmail.com", "12345678").then((res) => {
    //   console.log(`res.>>from app`, res);
    // });
    // callExternalApi(
    //   "Ai5qKTxmXjJow3TkexjEWRDYq2Xd4s8X9GC9C3KKmZWS",
    //   "sol"
    // ).then(res=>{
    //   console.log(`sol>>>`,res.data.result.value)
    //   })
    // xrpFetch("rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt").then(res=>{console.log(`xrpFetch>>>`,res)})
  }, []);
  console.log(`user>>>`, user);
  console.log(`usersLoading>>`, userInfo.user);
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
        <MenuAppBar isAuthenticated={authenticated} />
        <Routes>
          <Route
            path="/login"
            element={
              <div className="App">
                {currentForm === "login" ? (
                  <Login onFormSwitch={toggleForm} />
                ) : (
                  <Register onFormSwitch={toggleForm} />
                )}
              </div>
            }
          />
          {/* <Route path="/addvalue" element={<AddValue />} /> */}
          <Route path="/" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}
