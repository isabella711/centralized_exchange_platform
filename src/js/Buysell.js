//need server
import { useState, useEffect } from "react";
import "../css/Payment.css";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import "../css/TransactionForm.css";
import deposit from "../assets/deposit.png";
import useWebSocket from "../hooks/useWebSocket";
import contents from "../js/content";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import axios from "axios";
import { store } from "../store/store";
import { usersLoading, stopLoading } from "../reducers/usersReducer";
import LoadingSpinner from "./Spinner";

const PaymentCont = (props) => {
  const { coinInfo } = useWebSocket(props.id);
  const { id } = props;
  console.log(`>>>`, coinInfo);
  const userInfo = useSelector((state) => state.user);
  const [inputPrice, setInputPrice] = useState(0);
  const [error, setError] = useState("");
  const [crytotype, getCrytotype] = useState("");
  const imgPick = contents.find(
    (c) =>
      c.ticket.substring(0, 3).toLowerCase() ===
      props.id.split("usdt")[0].substring(0, 3)
  );
  const chooseCoin = props.id.split("usdt")[0].substring(0, 3);
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
  console.log(userInfo.user.user_id);

  //var get_transact = "";
  // if(id==="ethusdt@ticker")
  // {getCrytotype("usdtoeth")};
  // if (id==="btcusdt@ticker")
  // {getCrytotype("usdtobtc")};
  // if (id==="solusdt@ticker")
  // {getCrytotype("usdtosol")};
  //if (id==="xrpusdt@ticker")
  //{get_transact ="usdtobtc"};
  //if (id==="ltcusdt@ticker")
  //{get_transact ="usdtobtc"};

  useEffect(() => {
    if (userInfo.balance < inputPrice) {
      setError("Your balance is not enough");
      return Error;
    }
    setError("");
  }, [inputPrice]);

  const pressBuy = (e) => {
    e.preventDefault();
    store.dispatch(usersLoading("pending"));
    console.log("press detected");
    if (error !== "") {
      return;
    }
    console.log("hi");

    const response = axios.post("http://localhost:4000/createTransaction/", {
      id: userInfo.user.user_id,
      transactionType: crytotype,
      userReceAmount: inputPrice / coinTrim,
      userSendAmount: inputPrice,
    });
    setTimeout(() => {
      store.dispatch(stopLoading("idle"));
      props.setSuccess(true);
    }, [5000]);
    console.log(`hi>>>`, response.data);
    console.log("hi");
  };

  //useEffect(() => {
  //  console.log(
  //    "press detected"
  //  )
  //  if (userInfo.balance < inputPrice) {
  //    setError("Your balance is not enough");
  //    return Error;
  //  }
  //  //setError("");
  //  else{
  //      const response_v2 = axios.post(
  //      "http://localhost:4000/createTransaction/",
  //      {
  //        id: userInfo.user.user_id,
  //        transactionType: get_transact,
  //        userReceAmount: inputPrice / coinTrim ,
  //        userSendAmount: inputPrice,
  //
  //       }
  //
  //      ).then((response)=>console.log(response));
  //    console.log(response_v2.data);
  //    console.log("hi");
  //  };
  //}, []);

  // const coinExchangeArr = (type) => {};

  return (
    <>
      {props.isSuccess ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={deposit}
            alt="deposit.png"
            width={300}
            height={300}
            style={{ display: "flex" }}
            class="center"
          />
          <h2 style={{ marginLeft: 0, marginRight: 0 }}>You just Bought ETH</h2>
          <button
            style={{ maxWidth: "600px", marginLeft: 15 }}
            class="button1"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      ) : (
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
                <h2>
                  Current Price: ${coinTrim !== "0.00" ? coinTrim : "-.--"}
                </h2>
              </div>
              <div>
                <h2>
                  24h Lowest Price: ${lowPrice !== "0.00" ? lowPrice : "-.--"}
                </h2>
              </div>
              <div>
                <h2>
                  24h Highest Price: $
                  {highPrice !== "0.00" ? highPrice : "-.--"}
                </h2>
              </div>
              <div>
                <h2
                  style={{
                    color: priceChange < 0 ? "red" : "green",
                  }}
                >
                  24h Price Change:{" "}
                  {priceChange !== "0.00" ? priceChange : "-.--"}%
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
                      //type="button"
                      role="tab"
                      aria-controls="faq_tab_1"
                      aria-selected="true"
                      style={{ marginLeft: "0px", marginTop: "0px" }}
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
                      style={{ marginLeft: "0px", marginTop: "0px" }}
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
                        Exchange Rate: $ {inputPrice ?? 0} ={" "}
                        {inputPrice / coinTrim}{" "}
                        {props.id
                          .split("usdt")[0]
                          .substring(0, 3)
                          .toUpperCase()}
                      </p>
                    ) : (
                      <p></p>
                    )}

                    <form onSubmit={pressBuy}>
                      <div className="container p-3">
                        <div className="input-group mb-3 input-group-lg">
                          <input
                            style={{ fontSize: 20 }}
                            className="form-control"
                            placeholder="Enter the amount"
                            type="number"
                            min="0"
                            onChange={(e) => setInputPrice(e.target.value)}
                          />{" "}
                        </div>
                        <p style={{ color: "red" }}>{error}</p>
                        <div className="input-group mb-3">
                          <select
                            style={{ fontSize: 20 }}
                            className="form-select form-control"
                            id="inputGroupSelect02"
                          >
                            <option selected>
                              Please choose coin for exchange
                            </option>
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
                        {userInfo.loading === "pending" ? (
                          <LoadingSpinner />
                        ) : (
                          <button
                            type="submit"
                            style={{ maxWidth: "400px", marginTop: "20px" }}
                            class="button button5"
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </form>
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
                          style={{ fontSize: 20 }}
                          placeholder="Enter the amount"
                        />{" "}
                      </div>

                      <div className="input-group mb-3">
                        <select
                          style={{ fontSize: 20 }}
                          className="form-select form-control"
                          id="inputGroupSelect02"
                        >
                          <option selected>Please choose</option>
                          <option value="1">
                            {" "}
                            {props.id
                              .split("usdt")[0]
                              .substring(0, 3)
                              .toUpperCase()}
                          </option>
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
        </div>
      )}
    </>
  );
};

function Buysell(props) {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const { loading, user, wallets, balance } = useSelector(
    (state) => state.user
  );
  console.log(`>>>id`, id);
  <img src={props.image} alt="product-img" className="productImage"></img>;
  return (
    <>
      <Header isAuthenticated={user !== null} wallets={wallets} />
      <PaymentCont id={id} isSuccess={success} setSuccess={setSuccess} />
    </>
  );
}

export default Buysell;
