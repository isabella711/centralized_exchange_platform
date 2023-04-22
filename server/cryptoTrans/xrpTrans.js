//rcvAddress:rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe
import React, { useEffect, useState } from "react";
import "../css/xrp.css";
import { RippleAPI } from "ripple-lib";
import { Client, xrpToDrops, dropsToXrp } from "xrpl";
const xrpl = require("xrpl");

function Xrp() {
  // const [serverInfo, setServerInfo] = useState({ "buildVersion:": "0.0.0" });
  // useEffect(() => {
  //   getServerInfo();
  // }, []);
  const net = "wss://s.altnet.rippletest.net:51233";

  const [rcvAddress, setRcvAddress] = useState("");
  const [senderPublicKey, setSenderPublicKey] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState("");
  const [results, setResults] = useState("");
  const [client] = useState(new Client("wss://s.altnet.rippletest.net:51233"));
  const [paymentButtonText, setPaymentButtonText] = useState("Send XRP");
  console.log(`paidAmount>>`, paidAmount);

  const standby_wallet = xrpl.Wallet.fromSeed(
    "sEd7VZB9Tie9VXowLyv5o7g3gjm3NEt"
  );

  async function sendPayment() {
    await client.connect();
    console.log("Creating a payment transaction");
    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: "rsL5E12SuMh5DiJMFQBrpFcokjQ8bEbrYt",
      Amount: xrpToDrops(paidAmount),
      Destination: rcvAddress,
    });
    console.log(`prepared rcvAddress is: `, rcvAddress);
    // console.log("Creating a payment transaction", prepared);

    const signed = standby_wallet.sign(prepared);

    // -------------------------------------------------------- Submit signed blob
    const tx = await client.submitAndWait(signed.tx_blob);
    console.log(`tx`, tx);
    console.log("Identifying hash:", signed.hash);
    console.log("Signed blob:", signed.tx_blob);
    client.disconnect();
  }

  function getRcvAddress(e) {
    setRcvAddress(e.target.value);
    console.log(`receiver address is: `, rcvAddress);
  }

  function getPaidAmount(e) {
    setPaidAmount(e.target.value);
    console.log(`paid amount is: `, paidAmount);
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <button variant="text" onClick={createWallet("standby")}></button> */}

      <button onClick={sendPayment}>{paymentButtonText}</button>

      <label>
        Amount:
        <input
          type="text"
          name="paidAmount"
          onChange={getPaidAmount}
          value={paidAmount}
        />
      </label>
      <label>
        Destination Account:
        <input
          type="text"
          name="rcvAddress"
          onChange={getRcvAddress}
          value={rcvAddress}
        />
      </label>

      <p>{/* <i>{statusText}</i> */}</p>
    </div>
  );
}

export default Xrp;
