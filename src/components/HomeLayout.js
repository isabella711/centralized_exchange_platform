import React, { useEffect } from "react";
import "../css/App.css";
import { MenuAppBar } from "../js/AppBar";
import Header from "./Header";
import { callExternalApi } from "../api";
import useGetTrans from "../hooks/useGetTrans";

export default function HomeLayout({ children, userInfo }) {
  return (
    <>
      <MenuAppBar
        isAuthenticated={userInfo.user !== null}
        wallets={userInfo.wallets}
        isInLoginPage={userInfo.user == null}
      />
      {children}
    </>
  );
}
