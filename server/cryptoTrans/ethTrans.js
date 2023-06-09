//import React, { useState } from 'react';
const Web3 = require("web3");
const centralPrivateKey =
  "0x20c13ca6bc295a9a81fbaa351d84d07d05e0f38acfea2a1d6dd05216d955c510";
const centralAddress = "0x4C18f2a647a57651D6755a959C988Eb8bf4f5Aaf";

const ethTransaction = async ({
  senderAddress,
  recipientAddress,
  amount,
  senderPrivateKey,
}) => {
  // Connect to the Ethereum network
  const web3 = new Web3(
    "https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d"
  );
  console.log("Amount", amount);

  // Create a transaction
  const txObject = {
    from: senderAddress,
    to: recipientAddress,
    value: web3.utils.toWei(amount, "ether"),
    gas: 21000,
    gasPrice: web3.utils.toWei("10", "gwei"),
  };

  // Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(
    txObject,
    senderPrivateKey
  );
  // Send the transaction
  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction hash: ${txHash}`, txHash);
  console.log(`signed TX: ${signedTx}`, signedTx);
  return { txHash: txHash, message: "OK" };
  // transactionHash
};

const buyEth = async (clientAddress, sendamount) => {
  return ethTransaction({
    senderAddress: centralAddress,
    recipientAddress: clientAddress,
    amount: sendamount,
    senderPrivateKey: centralPrivateKey,
  });
};

const sellEth = async ({ clientAddress, sendamount, clientPrivateKey }) => {
  return ethTransaction({
    senderAddress: clientAddress,
    recipientAddress: centralAddress,
    amount: sendamount,
    senderPrivateKey: clientPrivateKey,
  });
};

module.exports = { ethTransaction, buyEth, sellEth };
