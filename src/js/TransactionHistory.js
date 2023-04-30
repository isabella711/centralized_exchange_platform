import React, { Component } from "react";
import "../css/UserProfile.css";
import "../css/TransactionHistory.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { callExternalApi } from "../api";
import useGetTrans from "../hooks/useGetTrans";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { xrpFetch } = require("../api");

export default function TransactionHistory() {
  const { transactionHistory } = useSelector((state) => state.user);
  const { transHistory } = useGetTrans(transactionHistory);
  const navigate = useNavigate();

  console.log(`>>>transHistory`, transHistory);

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
      <button
        style={{ maxWidth: "400px" }}
        class="button3"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}

function TransactionTable(props) {
  const { transHistory } = props;
  const nfObject = new Intl.NumberFormat("en-US");

  const tableRows = transHistory.map((element) => {
    return (
      <tr>
        <td style={{ width: "30px" }}>{element.type.toString()}</td>
        <td
          class="text-nowrap"
          style={{
            color: element.amount < 0 ? "red" : "green",
          }}
        >
          {nfObject.format(element.amount * 0.000000001)}
        </td>

        <td class="text-nowrap">{element.time.toString().substring(0, 9)}</td>
        <td class="text-nowrap">{element.txId.toString()}</td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
}
