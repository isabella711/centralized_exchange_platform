import React from "react";
import "../css/App.css";
import { MenuAppBar } from "../js/AppBar";
import Header from "./Header";

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
