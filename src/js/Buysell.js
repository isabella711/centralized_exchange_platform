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
// import "../css/TransactionForm.css";
import useWebSocket from "../hooks/useWebSocket";
import contents from "../js/content";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const PaymentCont = (props) => {
  const { coinInfo } = useWebSocket(props.id);
  const { id } = props;
  console.log(`>>>`, coinInfo);
  const userInfo = useSelector((state) => state.user);
  console.log(`userInfo>>`, userInfo.balance);
  const [inputPrice, setInputPrice] = useState(0);
  const [error, setError] = useState("");
  const imgPick = contents.find(
    (c) =>
      c.ticket.substring(0, 3).toLowerCase() ===
      props.id.split("usdt")[0].substring(0, 3)
  );
  // if (coinInfo) {
  // console.log(`{ l, h, P }`, coinInfo?.l, coinInfo?.h, coinInfo?.P);

  const lowPrice = Number(coinInfo?.l ?? 0).toFixed(2) ?? "-.--";
  const highPrice = Number(coinInfo?.h ?? 0).toFixed(2) ?? "-.--";
  const priceChange = Number(coinInfo?.P ?? 0).toFixed(2) ?? "-.--";
  const amount = Number(coinInfo?.v ?? 0).toFixed(2) ?? "-.--";
  const coinTrim = Number(coinInfo?.a ?? 0).toFixed(2) ?? "-.--";
  const navigate = useNavigate();
  console.log("buysell amount price: " + coinInfo);
  console.log("buysell id: " + id);

  useEffect(() => {
    if (userInfo.balance < inputPrice) {
      setError("Your balance is not enough");
      return false;
    }
    setError("");
  }, []);

  const coinExchangeArr = (type) => {};

  return (
    <div>
      <div
        className="transaction-container d-flex flex-column min-vh-100 justify-content-center align-items-center"
        style={{ borderWidth: 5 }}
      >
        <h1 style={{ margin: 0 }}>Details</h1>
        <img
          src={imgPick.image}
          width="56"
          height="56"
          class="rounded-circle mr-2"
          alt=""
        />
        <div className="productCard__content">
          <div className="displayStack__1"></div>
          <div>
            <h2>Current Price: ${coinTrim !== "0.00" ? coinTrim : "-.--"}</h2>
          </div>
          <div>
            <h2>
              24h Lowest Price: ${lowPrice !== "0.00" ? lowPrice : "-.--"}
            </h2>
          </div>
          <div>
            <h2>
              24h Highest Price: ${highPrice !== "0.00" ? highPrice : "-.--"}
            </h2>
          </div>
          <div>
            <h2>
              24h Price Change: {priceChange !== "0.00" ? priceChange : "-.--"}%
            </h2>
          </div>
          <div>
            <h2>
              24h Total Amount: {amount !== "0.00" ? amount : "-.--"}{" "}
              {props.id.split("usdt")[0].substring(0, 3).toUpperCase()}
            </h2>
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
                {inputPrice ? (
                  <p>
                    Exchange Rate: $ {inputPrice ?? 0} = {inputPrice / coinTrim}{" "}
                    {props.id.split("usdt")[0].substring(0, 3).toUpperCase()}
                  </p>
                ) : (
                  <p></p>
                )}
                <div className="container p-3">
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      placeholder="Enter the amount"
                      type="number"
                      min="0"
                      onChange={(e) => setInputPrice(e.target.value)}
                    />{" "}
                  </div>
                  <p>{error}</p>
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

                  {/* <div className="input-group mb-3">
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
                  </div> */}
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
        {/* <button
          style={{ maxWidth: "400px" }}
          class="button button5"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button> */}
      </div>
    </div>
  );
};

function Buysell(props) {
  const { id } = useParams();
  const { loading, user, wallets, balance } = useSelector(
    (state) => state.user
  );
  console.log(`>>>id`, id);
  <img src={props.image} alt="product-img" className="productImage"></img>;
  return (
    <>
      {/* <Header isAuthenticated={user !== null} wallets={wallets} /> */}
      <PaymentCont id={id} />
    </>
  );
}

export default Buysell;
