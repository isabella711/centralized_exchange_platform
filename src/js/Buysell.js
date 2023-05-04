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
import useGetBalance from "../hooks/useGetBalance";
import { useUpdateCoin } from "../hooks/useUpdateCoin";

const PaymentCont = (props) => {
  const { coinInfo } = useWebSocket(props.id);
  const { id } = props;
  const userInfo = useSelector((state) => state.user);
  const { xrpBalance, ethBalance, solBalance, btcBalance, ltcBalance } =
    useGetBalance(userInfo.wallets);
  const btcCurrent = useUpdateCoin("btcusdt@ticker");
  const [inputPrice, setInputPrice] = useState(0);
  const [sellInputPrice, setSellInputPrice] = useState(0);
  const [error, setError] = useState("");
  const [sellErr, setSellErr] = useState("");
  const [action, setAction] = useState("");
  const [selectedBuyCryto, setSelectedBuyCryto] = useState("");
  const [selectedSellCryto, setSelectedSellCryto] = useState("");
  var crytotype = "";
  var currencyLabel = "";
  let coinBalance;
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
  console.log(
    `selectedBuyCryto>>>`,
    selectedBuyCryto,
    `selectedSellCryto<<<`,
    selectedSellCryto,
    btcCurrent
  );
  var get_transact = "";
  if (id === "ethusdt@ticker") {
    crytotype = "usdtoeth";
    currencyLabel = "ETH";
    coinBalance = ethBalance;
  }
  if (id === "btcusdt@ticker") {
    crytotype = "usdtobtc";
    currencyLabel = "BTC";
    coinBalance = btcBalance;
  }
  if (id === "solusdt@ticker") {
    crytotype = "usdtosol";
    currencyLabel = "SOL";
    coinBalance = solBalance;
  }
  if (id === "xrpusdt@ticker") {
    crytotype = "usdtoxrp";
    currencyLabel = "XRP";
    coinBalance = xrpBalance;
  }
  if (id === "ltcusdt@ticker") {
    crytotype = "usdtoltc";
    currencyLabel = "LTC";
    coinBalance = ltcBalance;
  }
  console.log(crytotype, `  `, coinBalance);
  useEffect(() => {
    if (
      (userInfo.balance < inputPrice && selectedBuyCryto === crytotype) ||
      (inputPrice > btcBalance && selectedBuyCryto !== crytotype)
    ) {
      setError("Your balance is not enough");
      return Error;
    }
    setError("");
  }, [inputPrice, userInfo.balance]);

  useEffect(() => {
    if (coinBalance < sellInputPrice) {
      setSellErr("Your balance is not enough");
      return Error;
    }
    setSellErr("");
  }, [coinBalance, sellInputPrice]);

  const pressBuy = async (e) => {
    e.preventDefault();
    store.dispatch(usersLoading("pending"));
    console.log("press detected");

    if (error !== "") {
      return;
    }
    if (
      selectedBuyCryto ===
      `btcto${props.id.split("usdt")[0].substring(0, 3).toLowerCase()}`
    ) {
      crytotype = `btcto${props.id
        .split("usdt")[0]
        .substring(0, 3)
        .toLowerCase()}`;
    }
    setAction("bought");
    const userReceAmount =
      selectedBuyCryto ===
      `btcto${props.id.split("usdt")[0].substring(0, 3).toLowerCase()}`
        ? inputPrice * btcCurrent
        : inputPrice / coinTrim;
    const userSendAmount = inputPrice;
    console.log("buy");

    const response = await axios.post(
      "http://localhost:4000/createTransaction/",
      {
        id: userInfo.user?.user_id,
        userAccount: userInfo.user.email_address,
        transactionType: crytotype,
        userReceAmount: userReceAmount,
        userSendAmount: userSendAmount,
        userAction: "Buy",
      }
    );
    setTimeout(() => {
      store.dispatch(stopLoading("idle"));
      props.setSuccess(true);
    }, [5000]);
    console.log(`hi>>>`, response);
    console.log("hi");
  };
  const pressSell = async (e) => {
    e.preventDefault();
    store.dispatch(usersLoading("pending"));
    console.log("press detected");

    if (sellErr !== "") {
      return;
    }
    setAction("sold");
    if (
      selectedSellCryto ===
      `btcto${props.id.split("usdt")[0].substring(0, 3).toLowerCase()}`
    ) {
      crytotype = `btcto${props.id
        .split("usdt")[0]
        .substring(0, 3)
        .toLowerCase()}`;
    }
    setAction("bought");
    const userReceAmount =
      selectedSellCryto ===
      `btcto${props.id.split("usdt")[0].substring(0, 3).toLowerCase()}`
        ? (sellInputPrice * coinTrim) / btcCurrent
        : sellInputPrice * coinTrim;
    const userSendAmount = sellInputPrice;

    console.log("sold");

    const response = await axios.post(
      "http://localhost:4000/createTransaction/",
      {
        id: userInfo.user?.user_id,
        userAccount: userInfo.user.email_address,
        transactionType: crytotype,
        userReceAmount: userReceAmount,
        userSendAmount: userSendAmount,
        userAction: "Sell",
      }
    );
    setTimeout(() => {
      store.dispatch(stopLoading("idle"));
      props.setSuccess(true);
    }, [5000]);
    console.log(`hi>>>`, response);
    console.log("hi");
  };

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
          <h2 style={{ marginLeft: 0, marginRight: 0 }}>
            You just {action} some {currencyLabel}
          </h2>
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
                      <>
                        <p>
                          Buy Rate:{" "}
                          {selectedBuyCryto.includes("usd") ? "$" : "BTC"}{" "}
                          {inputPrice ?? 0} ={" "}
                          {selectedBuyCryto.includes("usd")
                            ? inputPrice / coinTrim
                            : (btcCurrent * inputPrice) / coinTrim}{" "}
                          {selectedBuyCryto.includes("usd")
                            ? props.id
                                .split("usdt")[0]
                                .substring(0, 3)
                                .toUpperCase()
                            : props.id
                                .split("usdt")[0]
                                .substring(0, 3)
                                .toUpperCase()}{" "}
                        </p>
                      </>
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
                            step="0.1"
                            onChange={(e) => setInputPrice(e.target.value)}
                          />{" "}
                        </div>
                        <p style={{ color: "red" }}>{error}</p>
                        <div className="input-group mb-3">
                          <select
                            style={{ fontSize: 20 }}
                            className="form-select form-control"
                            id="inputGroupSelect02"
                            value={selectedBuyCryto}
                            onChange={(e) =>
                              setSelectedBuyCryto(e.target.value)
                            }
                          >
                            <option selected>
                              Please choose coin for exchange
                            </option>
                            <option value={crytotype}>USD</option>
                            {crytotype !== "usdtobtc" && (
                              <option
                                value={`btcto${props.id
                                  .split("usdt")[0]
                                  .substring(0, 3)}`}
                              >
                                Bitcoin
                              </option>
                            )}
                          </select>{" "}
                        </div>
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
                    <form onSubmit={pressSell}>
                      <div className="container p-3">
                        <>
                          {sellInputPrice ? (
                            <p>
                              Sell Rate:{" "}
                              {sellInputPrice.includes("usd")
                                ? "$"
                                : props.id
                                    .split("usdt")[0]
                                    .substring(0, 3)
                                    .toUpperCase()}{" "}
                              {sellInputPrice ?? 0} ={" "}
                              {selectedSellCryto.includes("usd")
                                ? coinTrim * sellInputPrice
                                : (coinTrim * sellInputPrice) / btcCurrent}{" "}
                              {selectedSellCryto.includes("usd")
                                ? "USD"
                                : "BTC"}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </>
                        <div className="input-group mb-3">
                          <input
                            style={{ fontSize: 20 }}
                            className="form-control"
                            placeholder="Enter the amount"
                            type="number"
                            min="0"
                            step="0.000000000000000001"
                            onChange={(e) => setSellInputPrice(e.target.value)}
                          />{" "}
                        </div>
                        <p style={{ color: "red" }}>{sellErr}</p>

                        <div className="input-group mb-3">
                          <select
                            style={{ fontSize: 20 }}
                            className="form-select form-control"
                            id="inputGroupSelect02"
                            value={selectedSellCryto}
                            onChange={(e) =>
                              setSelectedSellCryto(e.target.value)
                            }
                          >
                            <option selected>Please choose</option>
                            {crytotype !== "usdtobtc" && (
                              <option
                                value={`btcto${props.id
                                  .split("usdt")[0]
                                  .substring(0, 3)}`}
                              >
                                Bitcoin
                              </option>
                            )}
                            <option value={crytotype}> USD</option>
                          </select>{" "}
                        </div>
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
                            Sell
                          </button>
                        )}
                      </div>
                    </form>
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
