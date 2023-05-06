import React, { Component } from "react";
import "../css/UserProfile.css";
import "../css/WalletInformation.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { callExternalApi, getUserWallets } from "../api";
import useGetTrans from "../hooks/useGetTrans";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const { xrpFetch } = require("../api");

const WalletInformation = () => {
  const userInfo = useSelector((state) => state.user);
  const { WalletInformation } = useSelector((state) => state.user);
  const [walletInfo, setwalletInfo] = useState([]);
  // const { externalwalletInfo } = useGetTrans(WalletInformation);
  const navigate = useNavigate();
  var BTCExplorerPrefix = "https://blockstream.info/testnet/address/";
  var ETHExplorerPrefix = "https://blockchair.com/ethereum/testnet/address/";
  var SolanaExplorerPrefix = "https://explorer.solana.com/address/";
  var XRPExplorerPrefix = "https://blockexplorer.one/xrp/testnet/address/";
  var LTCExplorerPrefix = "https://sochain.com/address/LTCTEST/";
  var SolanaExplorerPostfix = "?cluster=testnet";

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getUserWallets(userInfo.user.user_id);
      console.log("Result:", result);

      setwalletInfo(result.data);
    };

    fetchTransactions();
  }, [userInfo.user.user_id]);

  //const navigate = useNavigate();

  //console.log(`>>>walletInfo`, walletInfo);
  //console.log(`<<<moment().format(`);
  return (
    <div>
      <h1 style={{ fontSize: 40 }}>Wallet Information</h1>
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
            <th>Currency Type</th>
            <th>Address</th>
            <th>Blockchain Explorer</th>
          </tr>
        </thead>
        <tbody>
          {walletInfo?.map((row) => (
            <tr key={row.tx_id}>
              <td>{row.currency_type}</td>
              <td>{row.realAddress}</td>
              <td>
                {row.currency_type === "BTC" ? (
                  <a href={BTCExplorerPrefix + row.realAddress}>Click here</a>
                ) : row.currency_type === "ETH" ? (
                  <a href={ETHExplorerPrefix + row.realAddress}>Click here</a>
                ) : row.currency_type === "LTC" ? (
                  <a href={LTCExplorerPrefix + row.realAddress}>Click here</a>
                ) : row.currency_type === "XRP" ? (
                  <a href={XRPExplorerPrefix + row.realAddress}>Click here</a>
                ) : row.currency_type === "SOL" ? (
                  <a
                    href={
                      SolanaExplorerPrefix +
                      row.realAddress +
                      SolanaExplorerPostfix
                    }
                  >
                    Click here
                  </a>
                ) : (
                  ""
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

export default WalletInformation;
