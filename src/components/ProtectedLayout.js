import React, { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import "../css/App.css";
import { MenuAppBar } from "../js/AppBar";
import Header from "./Header";
import { callExternalApi } from "../api";
import useGetTrans from "../hooks/useGetTrans";
import { Table } from "react-bootstrap";

export default function ProtectedLayout({ userInfo, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = userInfo?.user === null ? false : true;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
