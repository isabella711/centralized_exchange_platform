//need server
import { useState, useEffect } from "react";
import "../css/Payment.css";
import spatula from "../assets/spatula.jpg";
import StripeContainer from "../components/StripeContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCoin } from "../hooks/useUpdateCoin";
import { useGetLowPrice } from "../hooks/useGetLowPrice";
import { useGetHighPrice } from "../hooks/useGetHighPrice";
import { useGetPriceChange } from "../hooks/useGetPriceChange";
import { useGetAmount } from "../hooks/useGetAmount";

const PaymentCont = (props) => {
  const { id } = props;
  const coin = useUpdateCoin(id);
  const lowPrice = Number(useGetLowPrice(id)).toFixed(2);
  const highPrice = Number(useGetHighPrice(id)).toFixed(2);
  const priceChange = Number(useGetPriceChange(id)).toFixed(2);
  const amount = Number(useGetAmount(id)).toFixed(2);
  const coinTrim = Number(coin).toFixed(2);
  return (
    <div className="App">
      <h1>Details</h1>
      <div className="productCard__content">
        <div className="displayStack__1"></div>
        <div className="productPrice">Current Price: ${coinTrim}</div>
        <div>
          <h2>24h Lowest Price: ${lowPrice}</h2>
        </div>
        <div>
          <h2>24h Highestst Price: ${highPrice}</h2>
        </div>
        <div>
          <h2>24h Price Change: {priceChange}%</h2>
        </div>
        <div>
          <h2>24h Total Amount: ${amount}</h2>
        </div>
      </div>
    </div>
  );
};

function Payment() {
  const { id } = useParams();
  console.log(`>>>id`, id);

  return <PaymentCont id={id} />;
}

export default Payment;
