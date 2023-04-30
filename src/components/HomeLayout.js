import React, { useEffect } from "react";
import "../css/App.css";
import { MenuAppBar } from "../js/AppBar";
import Header from "./Header";
import { callExternalApi } from "../api";
import useGetTrans from "../hooks/useGetTrans";
import { Table } from "react-bootstrap";

export default function HomeLayout({ children, userInfo }) {
  const { transHistory, transXrpHistory } = useGetTrans(
    userInfo?.transactionHistory
  );

  console.log(`userInfo>>>`, transHistory, transXrpHistory);

  return (
    <>
      <MenuAppBar
        isAuthenticated={userInfo?.user !== null}
        wallets={userInfo?.wallets}
        isInLoginPage={userInfo?.user == null}
      />
      {children}
    </>
  );
}
