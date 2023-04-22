const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const { getResult, getUser, create } = require("../server/sql/service");

const xrpGen = require("../server/walletGenerater/xrpGen");
// xrpGen();
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Sever is listening on port 4000");
});
