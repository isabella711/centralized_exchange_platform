import React, { useEffect, useState } from "react";
import "../css/xrp.css";
const xrpl = require("xrpl");

function xrpGen() {

const net = "wss://s.altnet.rippletest.net:51233";
const client = new xrpl.Client(net);
let faucetHost = null;
let amount = "0";

await client.connect();
console.log("Connected, funding wallet.");
const my_wallet = (await client.fundWallet(null, {amount, faucetHost })).wallet;
console.log("Got a wallet.");
console.log(my_wallet.address);
client.disconnect();

}
export default xrpGen;
