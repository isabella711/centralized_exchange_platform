import React from "react";
import { Products } from "../components/products";
import contents from "../js/content";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";

export default function Card() {
  const navigate = useNavigate();
  return (
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
  );
}
