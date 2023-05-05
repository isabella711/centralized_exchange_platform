const { xrpFetch, xrpTx } = require("./walletGenerater/xrpGen");
const { ethersFetch } = require("./walletGenerater/ethGen");
const { ethTransaction, buyEth, sellEth } = require("./cryptoTrans/ethTrans");
const { solanaTrans, buySol, sellSol } = require("./cryptoTrans/solanaTrans");
const { btcTransaction, buyBtc, sellBtc } = require("./cryptoTrans/btcTrans");
const { xrpTransaction, buyXrp, sellXrp } = require("./cryptoTrans/xrpTrans");

const {
  buyLitecoin,
  sellLitecoin,
  sendLitecoinTransaction,
  getLitecoinBalance,
} = require("./cryptoTrans/ltcTrans");
const express = require("express");
const { addValue, subtractValue } = require("./sql/service");
const { createTransactionRecord } = require("./sql/cex");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getResult,
  getUserWalletByUser,
  getUserTransaction,
  getPrivateKeyByPubkey,
  getUser,
  create,
  login,
  register,
} = require("../server/sql/service");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/testing", cors(), async (req, res) => {
  try {
    console.log(`no....`);
    const result = await getUser();
    res.json(result.rows);
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/testing", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const result = await create();
    console.log(`result>>>,`, result);
    res.json({
      message: "successful",
      payload: { amount: amount, id: id },
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
  }
});

app.put("/testing", cors(), async (req, res) => {
  let { amount, id, type } = req.body;
  try {
    console.log(`put....`);
    res.json({
      message: "successful",
      payload: { amount: amount, id: id, type: type },
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  console.log(amount);
  try {
    console.log("received payment request");
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      description: "Cryto Company",
      payment_method: id,
      confirm: true,
    });

    console.log("Payment", payment);

    // TODO: DB query
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  // Insert a new user into the MySQL database
  try {
    register(email, password, name).then((result) => {
      if (result.length > 0 && Array.isArray(result)) {
        const userData = result[0];
        res.status(200).send(userData);
      } else {
        res.status(404).send({ msg: "account already exist" });
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("An internal server error occurred");
    } else {
      res.status(201).send("User registered successfully");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    login(email, password).then((result) => {
      if (result.length > 0 && Array.isArray(result)) {
        const userData = result[0];
        res.status(200).send(userData);
      } else {
        res.status(401).send("Incorrect email or password");
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("An internal server error occurred");
    }
  }
});

app.get("/user", async (req, res) => {
  const { userId } = req.query;
  try {
    getUser(userId).then((result) => {
      if (result.length > 0 && Array.isArray(result)) {
        const userData = result[0];
        res.status(200).send(userData);
      } else {
        res.status(401).send("Incorrect email or password");
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("An internal server error occurred");
    }
  }
});

app.get("/wallets", async (req, res) => {
  const { id } = req.query;
  try {
    getUserWalletByUser(id).then((result) => {
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(401).send("Incorrect email or password");
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("An internal server error occurred");
    }
  }
});

app.get("/getEthBalance", async (req, res) => {
  const { address } = req.query;
  try {
    // const etherscanApi = require("etherscan-api").init(
    //   "4DGSFE9926FZNSQ7TTJDV83KAC8GF41MSC",
    //   "sepolia"
    // );
    const call = await ethersFetch(address);
    if (call.message === "OK") {
      res.status(200).send(call.result);
    } else {
      res.status(401).send("Incorrect email or password");
    }
    return call;
  } catch (error) {
    if (error) {
      res.status(500).send("An internal server error occurred");
    }
    console.log("Error", error);
  }
});

app.get("/userTransaction", async (req, res) => {
  const { id } = req.query;
  try {
    getUserTransaction(id).then((result) => {
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(401).send("An internal server error occurred");
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("An internal server error occurred");
    }
  }
});

app.post("/createTransaction", async (req, res) => {
  const {
    id,
    userAccount,
    transactionType,
    userReceAmount,
    userSendAmount,
    userAction,
  } = req.body;
  console.log(
    `req.body`,
    id,
    userAccount,
    transactionType,
    userReceAmount,
    userSendAmount,
    userAction
  );
  try {
    const wallets = await getUserWalletByUser(id);
    const currentTime = new Date(Date.now());
    // execute the transaction using function CryptoTran
    let content = {
      transactioner_id_A: id,
      transaction_date: currentTime,
      status: "",
      transactioner_id_B: 0,
      transactioner_A_currency_type: "",
      transactioner_A_currency_amount: userSendAmount / 100000000,
      transactioner_B_currency_type: "",
      transactioner_B_currency_amount: userReceAmount,
      tx_id: "",
      tx_id2: "",
    };
    // BTC/USD
    if (transactionType === "usdtobtc") {
      console.log("Start BTC transaction");
      const findSpecWallet = wallets.find((w) => w.currency_type === "BTC");
      let result;
      const address = findSpecWallet.wallet_address;
      if (userAction === "Buy") {
        console.log("Amount:" + userReceAmount.toFixed(8));
        result = await buyBtc(address, userReceAmount.toFixed(8));
        if (result.status === 201) {
          subtractValue(userSendAmount, userAccount);

          content.tx_id = result.date.tx.hash;
          content.transactioner_A_currency_type = "USD";
          content.transactioner_B_currency_type = "BTC";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      } else {
        //Sell
        const walletInfo = await getPrivateKeyByPubkey(address);
        const privateKey = walletInfo.wallet_private_key;
        console.log("Amount:" + parseFloat(userSendAmount).toFixed(8));
        result = await sellBtc(
          address,
          privateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        if (result.status === 201) {
          addValue(userReceAmount, userAccount);

          content.tx_id = result.data.tx.hash;
          content.transactioner_A_currency_type = "BTC";
          content.transactioner_B_currency_type = "USD";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = 0;
          content.transactioner_id_B = id;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      }
      console.log("Result" + result.status);
      return 0;
    }
    // SOL/USD
    if (transactionType === "usdtosol") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "SOL");
      let result;
      const address = findSpecWallet.wallet_address;
      if (userAction === "Buy") {
        console.log("Amount:" + userReceAmount.toFixed(8));
        result = await buySol(address, userReceAmount);
        content.transactioner_A_currency_type = "USD";
        content.transactioner_B_currency_type = "SOL";
        if (result.message === "OK") {
          subtractValue(userSendAmount, userAccount);

          content.tx_id = result.signature;
          content.transactioner_A_currency_type = "USD";
          content.transactioner_B_currency_type = "SOL";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      } else {
        //Sell
        const walletInfo = await getPrivateKeyByPubkey(address);
        const privateKey = walletInfo.wallet_private_key;
        console.log("Amount:" + parseFloat(userSendAmount).toFixed(8));
        result = await sellSol(
          privateKey,
          address,
          parseFloat(userSendAmount).toFixed(8)
        );
        if (result.message === "OK") {
          addValue(userReceAmount, userAccount);

          content.tx_id = result.signature;
          content.transactioner_A_currency_type = "SOL";
          content.transactioner_B_currency_type = "USD";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = 0;
          content.transactioner_id_B = id;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      }
      console.log("Result" + result.status);
      return 0;
    }
    // SOL/BTC Yet to test
    if (transactionType === "btctosol") {
      const findBTCWallet = wallets.find((w) => w.currency_type === "BTC");
      const btcAddress = findBTCWallet.wallet_address;
      const btcWallet = await getPrivateKeyByPubkey(btcAddress);
      const btcPrivateKey = btcWallet.wallet_private_key;

      const findSOLWallet = wallets.find((w) => w.currency_type === "SOL");
      const solAddress = findSOLWallet.wallet_address;
      const solWallet = await getPrivateKeyByPubkey(solAddress);
      const solPrivateKey = solWallet.wallet_private_key;

      let sellResult;
      let buyResult;
      if (userAction === "Buy") {
        // sell btc to buy sol
        sellResult = await sellBtc(
          btcAddress,
          btcPrivateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        buyResult = await buySol(solAddress, userReceAmount);
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.message === "OK") {
          content.tx_id = sellResult.date.tx.hash;
          content.tx_id2 = buyResult.signature;
          content.transactioner_A_currency_type = "BTC";
          content.transactioner_B_currency_type = "SOL";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      } else {
        // sell sol to buy btc
        sellResult = await sellSol(
          solAddress,
          solPrivateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        buyResult = await buyBtc(btcAddress, userReceAmount);
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.message === "OK") {
          content.tx_id = sellResult.signature;
          content.tx_id2 = buyResult.date.tx.hash;
          content.transactioner_A_currency_type = "SOL";
          content.transactioner_B_currency_type = "BTC";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      }
      console.log(
        "sellResult" + sellResult.status ??
          sellResult.message + "buyResult" + buyResult.message ??
          buyResult.status
      );
      return 0;
    }
    // XRP/USD Yet to complete @Isabella
    if (transactionType === "usdtoxrp") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "XRP");
      let result;
      const address = findSpecWallet.classicAddress;
      if (userAction === "Buy") {
        console.log("Amount:" + userReceAmount.toFixed(8));
        result = await buyXrp(address, userReceAmount);
        content.transactioner_A_currency_type = "USD";
        content.transactioner_B_currency_type = "XRP";
        console.log("result.message: " + result.msg);
        if (result.msg === "OK") {
          subtractValue(userSendAmount, userAccount);

          content.tx_id = result.tx;
          content.transactioner_A_currency_type = "USD";
          content.transactioner_B_currency_type = "XRP";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      } else {
        //Sell
        const walletInfo = await getPrivateKeyByPubkey(address);
        const privateKey = walletInfo.wallet_private_key;
        console.log("Amount:" + parseFloat(userSendAmount).toFixed(6));
        result = await sellXrp(
          privateKey,
          parseFloat(userSendAmount).toFixed(6)
        );
        if (result.msg === "OK") {
          addValue(userReceAmount, userAccount);

          content.tx_id = result.signature;
          content.transactioner_A_currency_type = "XRP";
          content.transactioner_B_currency_type = "USD";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = 0;
          content.transactioner_id_B = id;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      }
      console.log("Result" + result.status);
      return 0;
    }
    // XRP/BTC Yet to complete @Isabella
    if (transactionType === "btctoxrp") {
      const findBTCWallet = wallets.find((w) => w.currency_type === "BTC");
      const btcAddress = findBTCWallet.wallet_address;
      const btcWallet = await getPrivateKeyByPubkey(btcAddress);
      const btcPrivateKey = btcWallet.wallet_private_key;

      const findXRPWallet = wallets.find((w) => w.currency_type === "XRP");
      const xrpAddress = findXRPWallet.wallet_address;
      const xrpWallet = await getPrivateKeyByPubkey(xrpAddress);
      const xrpPrivateKey = xrpWallet.wallet_private_key;

      let sellResult;
      let buyResult;
      if (userAction === "Buy") {
        // sell btc to buy xrp
        sellResult = await sellBtc(
          btcAddress,
          btcPrivateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        buyResult = await buyXrp(xrpAddress, userReceAmount);
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.msg === "OK") {
          content.tx_id = sellResult.date.tx.hash;
          content.tx_id2 = buyResult.signature;
          content.transactioner_A_currency_type = "BTC";
          content.transactioner_B_currency_type = "XRP";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      } else {
        // sell xrp to buy btc
        sellResult = await sellXrp(
          xrpPrivateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        buyResult = await buyBtc(btcAddress, userReceAmount);
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.msg === "OK") {
          content.tx_id = sellResult.signature;
          content.tx_id2 = buyResult.date.tx.hash;
          content.transactioner_A_currency_type = "XRP";
          content.transactioner_B_currency_type = "BTC";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      }
      console.log(
        "sellResult" + sellResult.status ??
          sellResult.message + "buyResult" + buyResult.message ??
          buyResult.status
      );
      return 0;
    }
    // ETH/USD Yet to complete @Dave
    if (transactionType === "usdtoeth") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "ETH");
      let result;
      const address = findSpecWallet.wallet_address;
      if (userAction === "Buy") {
        console.log("Amount:" + userReceAmount.toFixed(8));
        result = await buyEth(address,userReceAmount.toFixed(8));
        if (result.message === "OK") {
          subtractValue(userSendAmount, userAccount);

          content.tx_id = result.txHash.blockHash;
          content.transactioner_A_currency_type = "USD";
          content.transactioner_B_currency_type = "ETH";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      } else {
        //Sell
        const walletInfo = await getPrivateKeyByPubkey(address);
        const privateKey = walletInfo[0].wallet_private_key;
        result = await sellEth(
          {clientAddress:address, sendamount:parseFloat(userSendAmount).toFixed(8), clientPrivateKey:privateKey}
        );
        if (result.message === "OK") {
          addValue(userReceAmount, userAccount);
          console.log("afteraddvalue");

          content.tx_id = result.txHash.blockHash;
          content.transactioner_A_currency_type = "ETH";
          content.transactioner_B_currency_type = "USD";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = 0;
          content.transactioner_id_B = id;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      }
      console.log("Result" + result.status);
      return 0;
    }
    // ETH/BTC Yet to complete @Dave
    if (transactionType === "btctoeth") {
      const findBTCWallet = wallets.find((w) => w.currency_type === "BTC");
      const btcAddress = findBTCWallet.wallet_address;
      const btcWallet = await getPrivateKeyByPubkey(btcAddress);
      const btcPrivateKey = btcWallet.wallet_private_key;

      const findETHWallet = wallets.find((w) => w.currency_type === "ETH");
      const ethAddress = findETHWallet.wallet_address;
      const ethWallet = await getPrivateKeyByPubkey(ethAddress);
      const ethPrivateKey = ethWallet.wallet_private_key;

      let sellResult;
      let buyResult;
      if (userAction === "Buy") {
        // sell btc to buy xrp
        sellResult = await sellBtc(
          btcAddress,
          btcPrivateKey,
          parseFloat(userSendAmount).toFixed(8)
        );
        buyResult = await buyEth(ethAddress,userReceAmount.toFixed(8));
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.msg === "OK") {
          content.tx_id = sellResult.date.tx.hash;
          content.tx_id2 = buyResult.txHash.blockHash;
          content.transactioner_A_currency_type = "BTC";
          content.transactioner_B_currency_type = "ETH";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      } else {
        // sell xrp to buy btc
        sellResult = await sellEth(
          {clientAddress:ethAddress, sendamount:parseFloat(userSendAmount).toFixed(8), clientPrivateKey:ethPrivateKey}
        );
        buyResult = await buyBtc(btcAddress, userReceAmount);
        // TODO : add if condition
        if (sellResult.status === 201 && buyResult.msg === "OK") {
          content.tx_id = sellResult.txHash.blockHash;
          content.tx_id2 = buyResult.date.tx.hash;
          content.transactioner_A_currency_type = "ETH";
          content.transactioner_B_currency_type = "BTC";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          const call = await createTransactionRecord(content);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res
              .status(200)
              .send({ tx_id: content.tx_id, tx_id2: content.tx_id2, verify });
          }
        }
      }
      console.log(
        "sellResult" + sellResult.status ??
          sellResult.message + "buyResult" + buyResult.message ??
          buyResult.status
      );
      return 0;
    }
    // LTC/USD
    if (transactionType === "usdtoltc") {
      console.log("Start Transaction");
      var result;
      const findSpecWallet = wallets.find((w) => w.currency_type === "LTC");
      //console.log(findSpecWallet);
      const address = findSpecWallet.classicAddress;
      console.log("Address:" + address);
      if (userAction === "Buy") {
        //Buy
        console.log("Amount:" + userReceAmount.toFixed(8));
        result = await buyLitecoin(address, userReceAmount.toFixed(8));
        if (result.status === "OK") {
          subtractValue(userSendAmount, userAccount);

          content.transactioner_A_currency_type = "USD";
          content.transactioner_B_currency_type = "LTC";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = id;
          content.transactioner_id_B = 0;
          content.status = "OK";
          content.tx_id = result.message;
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      } else {
        //Sell
        console.log("Amount:" + parseFloat(userSendAmount).toFixed(8));
        result = await sellLitecoin(
          address,
          parseFloat(userSendAmount).toFixed(8)
        );
        if (result.status == "OK") {
          addValue(userReceAmount, userAccount);

          content.transactioner_A_currency_type = "LTC";
          content.transactioner_B_currency_type = "USD";
          content.transactioner_A_currency_amount = userSendAmount;
          content.transactioner_B_currency_amount = userReceAmount;
          content.transactioner_id_A = 0;
          content.transactioner_id_B = id;
          content.status = "OK";
          content.tx_id = result.message;
          const call = await createTransactionRecord(content);
          console.log(call);
          if (call.affectedRows > 0) {
            const verify = await getUserTransaction(id);
            res.status(200).send({ tx_id: content.tx_id, verify });
          }
        }
      }

      console.log("Result" + result.status);
      return 0;
    }
    // LTC/BTC Yet to complete @Joe
    if (transactionType === "btctoltc") {
    }
    res.status(401).send("Internal server error");
  } catch (error) {
    if (error) {
      res.status(500).send("An internal server error occurred");
    }
    console.log("Error", error);
  }
});

const runLitecoinCommand = (command, ...params) => {
  return new Promise((resolve, reject) => {
    const litecoinCli = spawn("litecoin-cli", ["-regtest", command, ...params]);
    let output = "";

    litecoinCli.stdout.on("data", (data) => {
      output += data.toString();
    });

    litecoinCli.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    litecoinCli.on("close", (code) => {
      if (code === 0) {
        console.log(`Output: ${output.trim()}`); // Log the output
        resolve(output.trim());
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });
  });
};

app.post("/api/sendltcaddress", async (req, res) => {
  const { address, amount } = req.body;
  try {
    const txid = await runLitecoinCommand("sendtoaddress", address, amount);
    res.json({ success: true, txid });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.post("/api/addvalue", (req, res) => {
  const { email, value } = req.body;
  // Insert a new user into the MySQL database

  addValue(value, email).then((result) => {
    if (result.changedRows > 0) {
      res.status(200).send("OK");
    } else {
      res.status(401).send("Incorrect user account");
    }
  });
});

app.get("/api/getXrpBalance", async (req, res) => {
  const { address } = req.query;
  try {
    const call = await xrpFetch(address);
    if (call.type === "response") {
      const balance = call.result.account_data.Balance;
      res.status(200).send(balance);
    } else {
      res.status(401).send("Wrong");
    }
    return call;
  } catch (error) {
    if (error) {
      res.status(500).send("An internal server error occurred");
    }
    console.log("Error", error);
  }
});

app.get("/api/getXrpTx", async (req, res) => {
  const { address } = req.query;
  try {
    const call = await xrpTx(address);
    if (call.type === "response") {
      res.status(200).send(call);
    } else {
      res.status(401).send("Wrong");
    }
    return call;
  } catch (error) {
    if (error) {
      res.status(500).send("An internal server error occurred");
    }
    console.log("Error", error);
  }
});

app.get("/api/getLtcBalance", async (req, res) => {
  const { address } = req.query;
  try {
    const call = await getLitecoinBalance(address);
    if (call.message === "OK") {
      res.status(200).send(call.balance);
    } else {
      res.status(401).send("Wrong");
    }
    return call;
  } catch (error) {
    if (error) {
      res.status(500).send("An internal server error occurred");
    }
    console.log("Error", error);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Sever is listening on port 4000");
});
