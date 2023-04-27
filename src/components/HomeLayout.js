import React, { useCallback } from "react";
import { Products } from "../components/products";
import contents from "../js/content";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";
import Card from "../js/Card";

export default function HomeLayout({ children }) {
  //   const child = useCallback(() => <Card />, []);

  return <>{children}</>;
}
