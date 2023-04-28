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
import useWebSocket from "../hooks/useWebSocket";

const PaymentCont = (props) => {
  const { id } = props;
  const { coinInfo } = useWebSocket(id);
  // const lowPrice = Number(useGetLowPrice(id)).toFixed(2);
  // const highPrice = Number(useGetHighPrice(id)).toFixed(2);
  // const priceChange = Number(useGetPriceChange(id)).toFixed(2);
  // const amount = Number(useGetAmount(id)).toFixed(2);
  const coinTrim = Number(coinInfo).toFixed(2);

  return (
    <>
      <StripeContainer />
    </>
  );
};

function Payment() {
  const { id } = useParams();
  console.log(`>>>id`, id);

  return <PaymentCont id={id} />;
}

export default Payment;

// <div>
//         <h1>Details</h1>
//         <table class="center">
//           <tr>
//             <th>Current Price</th>
//             <th>${coinTrim}</th>
//           </tr>
//           <tr>
//             <th>24h Lowest Price</th>
//             {/* <th>${lowPrice}</th> */}
//           </tr>
//           <tr>
//             <th>24h Highestst Price</th>
//             {/* <th>${highPrice}</th> */}
//           </tr>
//           <tr>
//             <th>24h Price Change</th>
//             {/* <th>{priceChange}%</th> */}
//           </tr>
//           <tr>
//             <th>24h Total Amount</th>
//             {/* <th>${amount}</th> */}
//           </tr>
//         </table>
//       </div>
