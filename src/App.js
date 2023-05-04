import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Card from "./js/Card";
import Register from "./js/Register";
import Login from "./js/Login";
import Buysell from "./js/Buysell";
import TransactionHistory from "./js/TransactionHistory";
import Deposits from "./components/DepositForm";
import { MenuAppBar } from "./js/AppBar";
import { useSelector } from "react-redux";
import HomeLayout from "./components/HomeLayout";
import { getUserWallets } from "./api";
import {
  fetchUser,
  fetchTransactionHistory,
  fetchUserWallets,
  useWallet,
  usersLoading,
} from "./reducers/usersReducer";
import { store } from "./store/store";
import Deposit from "./components/DStripeContainer";
import Payment from "./js/Payment";
import Transaction from "./js/Transaction";
import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
  const { login, user, authenticated } = useAuth();
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo.user !== null) {
      const { user_id } = userInfo.user;
      store.dispatch(usersLoading("idle"));
      store.dispatch(fetchUserWallets(user_id));
      store.dispatch(fetchUser(user_id));
      store.dispatch(fetchTransactionHistory(user_id));
    }
  }, [userInfo.user]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout userInfo={userInfo} />}>
        <Route index element={<Card />} />
        <Route
          path="login"
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
        <Route element={<ProtectedLayout userInfo={userInfo} />}>
          <Route path="/transactionHistory" element={<TransactionHistory />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/buysell/:id" element={<Buysell />} />
        </Route>
      </Route>
    )
  );
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

  return <RouterProvider router={router} />;
}
