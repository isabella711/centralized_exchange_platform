//import React, { useState } from 'react';
const Web3=require('web3');


  const ethTransaction = async ({senderAddress,recipientAddress,amount,senderPrivateKey}) => {
    // Connect to the Ethereum network
    const web3 = new Web3('https://sepolia.infura.io/v3/40745b7b9da3492dbeb0cd9dff114a2d');
  console.log(amount);

    // Create a transaction
    const txObject = {
      from: senderAddress,
      to: recipientAddress,
      value: web3.utils.toWei(amount, 'ether'),
      gas: 21000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
    };


    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txObject, senderPrivateKey);

    // Send the transaction
    const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction hash: ${txHash}`);
  };

  module.exports = { ethTransaction };