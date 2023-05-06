import React, { Component } from "react";
import "../css/UserProfile.css";
import "../css/TransactionHistory.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { callExternalApi, getUserTransactions } from "../api";
import useGetTrans from "../hooks/useGetTrans";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const { xrpFetch } = require("../api");

const TransactionHistory = () => {
  const userInfo = useSelector((state) => state.user);
  const { transactionHistory } = useSelector((state) => state.user);
  const [transHistory, setTransHistory] = useState([]);
  // const { externalTransHistory } = useGetTrans(transactionHistory);
  const navigate = useNavigate();

  var BTCExplorerPrefix = "https://blockstream.info/testnet/tx/";
  var ETHExplorerPrefix =
    "https://blockchair.com/ethereum/testnet/transaction/";
  var SolanaExplorerPrefix = "https://explorer.solana.com/tx/";
  var XRPExplorerPrefix = "https://blockexplorer.one/xrp/testnet/tx/";
  var LTCExplorerPrefix = "https://sochain.com/address/LTCTEST/";
  var SolanaExplorerPostfix = "?cluster=testnet";

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getUserTransactions(userInfo.user.user_id);
      console.log("Result:", result);

      setTransHistory(result.data);
    };

    fetchTransactions();
  }, [userInfo.user.user_id]);

  //const navigate = useNavigate();

  //console.log(`>>>transHistory`, transHistory);
  //console.log(`<<<moment().format(`);
  return (
    <div>
      <h1 style={{ fontSize: 40 }}>Transaction History</h1>
      <Table
        style={{
          width: "1000px",
          margin: "auto",
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <thead>
          <tr>
            <th>Send Type</th>
            <th>Receive Type</th>
            <th>Send Amount</th>
            <th>Receive Amount</th>
            <th>Time</th>
            <th>TxID</th>
            <th>TxID_2</th>
            <th>Blockchain Explorer</th>
          </tr>
        </thead>
        <tbody>
          {transHistory?.map((row) => (
            <tr key={row.tx_id}>
              <td>{row.transactioner_A_currency_type}</td>
              <td>{row.transactioner_B_currency_type}</td>
              <td>
                {row.transactioner_A_currency_amount.toFixed(5)}{" "}
                {row.transactioner_A_currency_type}
              </td>
              <td>
                {row.transactioner_B_currency_amount.toFixed(5)}{" "}
                {row.transactioner_B_currency_type}
              </td>
              <td>{row.transaction_date}</td>
              <td>{row.tx_id}</td>
              <td>{row.tx_id2 !== null ? row.tx_id2 : "--"}</td>
              <td>
                {row.transactioner_B_currency_type === "BTC" ? (
                  <a href={BTCExplorerPrefix + row.tx_id}>Click here</a>
                ) : row.transactioner_B_currency_type === "ETH" ? (
                  <a href={ETHExplorerPrefix + row.tx_id}>Click here</a>
                ) : row.transactioner_B_currency_type === "LTC" ? (
                  <a href={LTCExplorerPrefix + row.tx_id}>Click here</a>
                ) : row.transactioner_B_currency_type === "XRP" ? (
                  <a href={XRPExplorerPrefix + row.tx_id}>Click here</a>
                ) : row.transactioner_B_currency_type === "SOL" ? (
                  <a
                    href={
                      SolanaExplorerPrefix + row.tx_id + SolanaExplorerPostfix
                    }
                  >
                    Click here
                  </a>
                ) : (
                  "---"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={{ maxWidth: "400px" }}
          class="button button5"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

/*
export default function TransactionHistory() {
  const { transactionHistory } = useSelector((state) => state.user);
  const { transHistory } = useGetTrans(transactionHistory);
  const navigate = useNavigate();

  console.log(`>>>transHistory`, transHistory);
  console.log(`<<<moment().format(`, Date("Apr-30-2023 03:16:48 PM +UTC"));
  return (
    <div>
      <h1 style={{ fontSize: 40 }}>Transaction History</h1>
      <Table
        style={{
          width: "1000px",
          margin: "auto",
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Time</th>
            <th>TxID</th>
          </tr>
        </thead>
        <TransactionTable transHistory={transHistory} />
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={{ alignSelf: "center" }}
          class="button3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
*/

function TransactionTable(props) {
  const { transHistory } = props;
  const nfObject = new Intl.NumberFormat("en-US");
  const currencyFilter = (element) => {
    if (element.type === "solana") {
      return nfObject.format(element.amount * 0.000000001);
    }
    if (element.type === "btc") {
      return nfObject.format(element.amount * 0.000000001);
    }
    if (element.type === "USD") {
      return element.amount;
    }
  };

  const timeFilter = (element) => {
    if (element.type === "USD") {
      return Date(moment().format(element.time)).split(" GMT+0800 ").join(" ");
    }
    return element.time;
  };

  const tableRows = transHistory?.map((element) => {
    return (
      <tr>
        <td style={{ width: "30px" }}>{element.type.toString()}</td>
        <td
          class="text-nowrap"
          style={{
            color: element.amount < 0 ? "red" : "green",
          }}
        >
          {currencyFilter(element)}
        </td>

        <td class="text-nowrap">
          {timeFilter(element).toString().split("GMT+0800 (香港標準時間)")}
        </td>
        <td class="text-nowrap">{element.txId.toString()}</td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
}

export default TransactionHistory;
