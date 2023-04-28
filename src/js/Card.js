import React from "react";
import { Products } from "../components/products";
import contents from "../js/content";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "./Spinner";
import Header from "../components/Header";

export default function Card() {
  const { loading, user, wallets } = useSelector((state) => state.user);
  return loading === "pending" ? (
    <LoadingSpinner />
  ) : (
    <>
      <Header isAuthenticated={user !== null} wallets={wallets} />
      <div className="productList">
        {contents.map((contents) => (
          <Products
            key={contents.id}
            image={contents.image}
            name={contents.name}
            price={contents.price}
            ticket={contents.ticket}
            details={contents.details}
          />
        ))}
      </div>
    </>
  );
}
