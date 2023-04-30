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
const { xrpFetch } = require("../api");

export default function TransactionHistory() {
  const { transactionHistory } = useSelector((state) => state.user);
  const { transHistory } = useGetTrans(transactionHistory);
  console.log(`>>>transHistory`, transHistory);

  return (
    <div>
      <h1 style={{ fontSize: 40 }}>Transaction History</h1>
      <Table
        style={{
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
          justifyContent: "center",
          alignSelf: "center",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>Amount</th>
            <th>Time</th>
            <th>TxID</th>
          </tr>
        </thead>
        <TransactionTable transHistory={transHistory} />
      </Table>
    </div>
  );
}

function TransactionTable(props) {
  const { transHistory } = props;
  const tableRows = transHistory.map((element) => {
    return (
      <tr>
        <td>{element.amount}</td>
        <td>{element.time.toString().substring(0, 9)}</td>
        <td>{element.txId.toString()}</td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
}
