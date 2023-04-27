const { xrpFetch } = require("./walletGenerater/xrpGen");
const { ethersFetch } = require("./walletGenerater/ethGen");
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getResult,
  getUserWalletByUser,
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
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
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
  const { email, password } = req.body;
  // Insert a new user into the MySQL database
  try {
    register(email, password).then((result) => {
      if (result.length > 0) {
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
      if (result.length > 0) {
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
      console.log(`result>>`, result);
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Sever is listening on port 4000");
});
