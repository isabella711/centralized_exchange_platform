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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../css/TransactionForm.css";
import useWebSocket from "../hooks/useWebSocket";

const PaymentCont = (props) => {
  const { coinInfo } = useWebSocket(props.id);

  const { id } = props;
  // if (coinInfo) {
  // console.log(`{ l, h, P }`, coinInfo?.l, coinInfo?.h, coinInfo?.P);

  const lowPrice = Number(coinInfo?.l ?? 0).toFixed(2) ?? 0;
  const highPrice = Number(coinInfo?.h ?? 0).toFixed(2) ?? 0;
  const priceChange = Number(coinInfo?.P ?? 0).toFixed(2) ?? 0;
  const amount = Number(coinInfo?.A ?? 0).toFixed(2) ?? 0;
  const coinTrim = Number(coinInfo?.a ?? 0).toFixed(2) ?? 0;
  const navigate = useNavigate();
  console.log("buysell current price: " + coinTrim);

  return (
    <div
      className="transaction-container d-flex flex-column min-vh-100 justify-content-center align-items-center"
      style={{ borderWidth: 5 }}
    >
      <h1>Details</h1>
      <div className="productCard__content">
        <div className="displayStack__1"></div>
        <div>
          <h2>Current Price: ${coinTrim}</h2>
        </div>
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

      <div className="col-md-6">
        <div className="bg-white">
          <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              {" "}
              <button
                className="nav-link active"
                id="faq_tab_1-tab"
                data-bs-toggle="tab"
                data-bs-target="#faq_tab_1"
                type="button"
                role="tab"
                aria-controls="faq_tab_1"
                aria-selected="true"
              >
                <div className="d-flex flex-column lh-lg">
                  {" "}
                  <i></i> <span>Buy</span>{" "}
                </div>
              </button>{" "}
            </li>
            <li className="nav-item" role="presentation">
              {" "}
              <button
                className="nav-link"
                id="faq_tab_2-tab"
                data-bs-toggle="tab"
                data-bs-target="#faq_tab_2"
                type="button"
                role="tab"
                aria-controls="faq_tab_2"
                aria-selected="false"
              >
                <div className="d-flex flex-column lh-lg">
                  {" "}
                  <i></i> <span>Sell</span>{" "}
                </div>
              </button>{" "}
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade active show"
              id="faq_tab_1"
              role="tabpanel"
              aria-labelledby="faq_tab_1-tab"
            >
              <div className="container p-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the amount"
                  />{" "}
                </div>

                <div className="input-group mb-3">
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Please choose coin for exchange</option>
                    <option value="1">USD</option>
                    <option value="2">Bitcoin</option>
                  </select>{" "}
                </div>

                <div className="input-group mb-3">
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Please choose coin to buy</option>
                    <option value="1">Bitcoin</option>
                    <option value="2">Ehereum</option>
                    <option value="3">Solana</option>
                    <option value="4">XRP</option>
                    <option value="5">LTC</option>
                  </select>{" "}
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                {" "}
                <button style={{ maxWidth: "400px" }} class="button button5">
                  Buy
                </button>{" "}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="faq_tab_2"
              role="tabpanel"
              aria-labelledby="faq_tab_2-tab"
            >
              <div className="container p-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the amount"
                  />{" "}
                </div>

                <div className="input-group mb-3">
                  <select
                    className="form-select form-control"
                    id="inputGroupSelect02"
                  >
                    <option selected>Please choose</option>
                    <option value="1">Bitcoin</option>
                  </select>{" "}
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                {" "}
                <button class="button button5">Sell</button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        style={{ maxWidth: "400px" }}
        class="button button5"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

function Buysell() {
  const { id } = useParams();
  console.log(`>>>id`, id);

  return <PaymentCont id={id} />;
}

export default Buysell;
