const { xrpFetch, xrpTx } = require("./walletGenerater/xrpGen");
const { ethersFetch } = require("./walletGenerater/ethGen");
const { ethTransaction } = require("./cryptoTrans/ethTrans");
const { solanaTrans } = require("./cryptoTrans/solanaTrans");
const { btcTransaction } = require("./cryptoTrans/btcTrans");
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
  const { id, userAccount, transactionType, userReceAmount, userSendAmount, userAction } = req.body;
  console.log(`req.body`, id, userAccount, transactionType, userReceAmount, userSendAmount, userAction);
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
    };
    if (transactionType === "usdtobtc") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "BTC");
      //const walletInfo = await getPrivateKeyByPubkey(
      //  findSpecWallet.wallet_address
      //);
	  var userReceiveSatoshi = parseInt(userReceAmount*10000000); //For Buy
	  //var userSendSatoshi = parseInt(userSendAmount*10000000); //For sell
	  
      const userReceiveBTC = await btcTransaction(
        "mnpm35NKRwSCTwTfi7fR9Tc3ABZZiZcg7X",  //From
        //findSpecWallet.wallet_address,    //From
		//findSpecWallet.classicAddress,
        "mmHAHPcPBkT9GFeQrz7EhFLJtbtQL9CToD", //which is our company wallet
        findSpecWallet.wallet_private_key,  //Key
        "cMwdvzjAtNpSt2x1KtnMGDgFJaXg6NnLrSzuaoXXt8RgtLEVRNuN",  //Key
        userReceiveSatoshi,
      );
      console.log(userReceiveBTC);
      content.transactioner_A_currency_type = "USD";
      content.transactioner_B_currency_type = "BTC";
      if (userReceiveBTC) {
        content.tx_id = userReceiveBTC;
        content.status = "OK";
        const call = await createTransactionRecord(content);
        if (call.affectedRows > 0) {
          const verify = await getUserTransaction(id);
          res.status(200).send({ tx_id: userReceiveBTC, verify });
        }
      }
      return userReceiveBTC;
    }
    //
    if (transactionType === "usdtosol") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "SOL");
      const userReceiveSol = await solanaTrans(
        "ZUFbNAu5oRGj796Dy6MMtvospxQAf1Jr5cLaoaiiFdJLos8SEqojsNYrPdhCzumcN5kUju6mbNssxqUrdVAdPQY", //which is our company wallet
        findSpecWallet.wallet_address,
        userReceAmount
      );
      console.log(userReceiveSol);
      content.transactioner_A_currency_type = "USD";
      content.transactioner_B_currency_type = "SOL";
      if (userReceiveSol) {
        content.tx_id = userReceiveSol;
        content.status = "success";
        const call = await createTransactionRecord(content);
        if (call.affectedRows > 0) {
          const verify = await getUserTransaction(id);
          res.status(200).send({ tx_id: userReceiveSol, verify });
        }
      }
      return userReceiveSol;
    }

    if (transactionType === "usdtoeth") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "ETH");
      const wallet_process = subtractValue(userSendAmount, "alice@gmail.com");
      if (!wallet_process) {
        return Error;
      }
      const userReceiveEth = await ethTransaction({
        senderAddress: "0xc018e39c82584Fb5129081d2677bB4369cE700C3", //which is our company wallet
        recipientAddress: findSpecWallet.wallet_address,
        //recipientAddress: "0x4C18f2a647a57651D6755a959C988Eb8bf4f5Aaf",
        amount: `${userReceAmount}`,
        senderPrivateKey:
          "0xc31e5e4f52bc52ab124f7e41027f8fb2e0d3a8899c4802cfb3db25d7878a2dc3",
      });
      console.log(userReceiveEth);
      content.transactioner_A_currency_type = "USD";
      content.transactioner_B_currency_type = "ETH";
      if (userReceiveEth) {
        content.tx_id = userReceiveEth;
        content.status = "OK";
        const call = await createTransactionRecord(content);
        console.log(call);
        if (call.affectedRows > 0) {
          const verify = await getUserTransaction(id);
          res.status(200).send({ tx_id: userReceiveEth, verify });
        }
      }
      console.log("success");
      return userReceiveEth;
    }
    //
    if (transactionType === "btctosol") {
      const findSpecWallet = wallets.find((w) => w.currency_type === "BTC");
      const walletInfo = await getPrivateKeyByPubkey(
        findSpecWallet.wallet_address
      );
      const userSendBTC = await btcTransaction(
        findSpecWallet.wallet_address,
        "n18Mrmav6WpiL7thrfFDany6cMVDEkXsAA", //which is our company wallet
        walletInfo.wallet_private_key,
        userSendAmount
      );
      const userReceiveSol = await solanaTrans(
        "ZUFbNAu5oRGj796Dy6MMtvospxQAf1Jr5cLaoaiiFdJLos8SEqojsNYrPdhCzumcN5kUju6mbNssxqUrdVAdPQY", //which is our company wallet
        findSpecWallet.wallet_address,
        userReceAmount
      );
      content.transactioner_A_currency_type = "BTC";
      content.transactioner_B_currency_type = "SOL";
      if (userSendBTC) {
        content.tx_id = userSendBTC;
        content.status = "success";
        const call = await createTransactionRecord(content);
        if (call.affectedRows > 0) {
          const verify = await getUserTransaction(id);
          res.status(200).send({ tx_id: userReceiveSol, verify });
        }
      }
      return userReceiveSol;
    }

	 if (transactionType === "usdtoltc") {
       console.log("Start Transaction");
	   var result;
      const findSpecWallet = wallets.find((w) => w.currency_type === "LTC");
	    //console.log(findSpecWallet);
	  const address = findSpecWallet.classicAddress;
	  console.log("Address:" + address);
	  if (userAction == "Buy"){
		//Buy
		console.log("Amount:" + userReceAmount.toFixed(8));
		result = await buyLitecoin(address,userReceAmount.toFixed(8));
		if (result.status == "OK")
		{
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
		result = await sellLitecoin(address,parseFloat(userSendAmount).toFixed(8));
		if (result.status == "OK")
		{
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

// app.post("/addvalue", (req, res) => {
//   const { email, value } = req.body;

//   // Check if the user exists and the password matches
//   const query = "UPDATE users SET balance = balance + ? WHERE email = ?";
//   connection.query(query, [value, email], (err, result) => {
//     if (err) {
//       res.status(500).send("An internal server error occurred");
//     } else {
//       if (result.affectedRows > 0) {
//         res.status(200).send("Updated");
//       } else {
//         res.status(401).send("Incorrect email");
//       }
//     }
//   });
// });

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
