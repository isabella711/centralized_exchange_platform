import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import {
  Space,
  HoverCard,
  Card,
  Image,
  Text,
  MantineProvider,
} from "@mantine/core";
import { Slider, rem } from "@mantine/core";
export function Products(props) {
  const coin = useUpdateCoin(props.ticket);
  const priceChange = Number(useGetPriceChange(props.details)).toFixed(2);
  const coinTrim = Number(coin).toFixed(2);
  const navigate = useNavigate();

  return (
    <>
      <div className="productList">
        <div key={props.id} className="productCard">
          {
            <img
              src={props.image}
              alt="product-img"
              className="productImage"
            ></img>
          }

          {/* <FaShoppingCart className={"productCard__cart"} /> */}

          <div className="productCard__content">
            <h3 className="productName">{props.name}</h3>
            <div className="displayStack__1"></div>
            <div className="productPrice">Current Price: ${coinTrim}</div>
            <div className="productPrice">24h Price Change: {priceChange}%</div>
            <p>
              <Link to={`/payment/${props.details}`}>
                <button class="button button5">Buy</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
