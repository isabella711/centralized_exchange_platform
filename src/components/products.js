import React, { useState, useEffect, useRef, useContext } from "react";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import useWebSocket from "../hooks/useWebSocket";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { Link, useNavigate } from "react-router-dom";

export function Products(props) {
  const { coinInfo } = useWebSocket(props.ticket);
  // const priceChange = Number(useGetPriceChange(props.details)).toFixed(2);
  const coinTrim = Number(coinInfo?.p ?? 0).toFixed(2);
  // const navigate = useNavigate();
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

          <div className="productCard__frontpage">
            <h3 className="productName">{props.name}</h3>
            <div className="displayStack__1"></div>
            <div className="productPrice">
              Current Price: ${coinTrim !== "0.00" ? coinTrim : "-.--"}
            </div>
            {/* <div className="productPrice">24h Price Change: {priceChange}%</div> */}
            <div
              style={{
                justifyContent: "center",
                alignSelf: "center",
                margin: "auto",
              }}
            >
              <Link to={`/buysell/${props.details}`}>
                <button class="button button5">Buy/Sell</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
