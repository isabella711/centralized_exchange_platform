import React, { useState, useEffect, useRef, useContext } from "react";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import useWebSocket from "../hooks/useWebSocket";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";

export function Products(props) {
  const { coinInfo } = useWebSocket(props.ticket);
  // const priceChange = Number(useGetPriceChange(props.details)).toFixed(2);
  const coinTrim = Number(coinInfo).toFixed(2);
  // const navigate = useNavigate();
  console.log(`coinInfo>>>`, coinInfo);
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
            {/* <div className="productPrice">24h Price Change: {priceChange}%</div> */}
            <div
              style={{
                justifyContent: "center",
                alignSelf: "center",
                margin: "auto",
              }}
            >
              <Link to={`/payment/${props.details}`}>
                <button class="button button5">Buy</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
