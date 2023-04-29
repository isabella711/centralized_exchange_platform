import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deposit from "../assets/deposit.png";
import { Placeholder } from "react-bootstrap";
//import { View, Text, TextInput, StyleSheet } from "react-native";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
  },
};

const AMOUNT_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: amount,
          id,
        });

        if (response.data.success) {
          console.log("Successful deposit");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <div>
            <h1 style={{ fontSize: 40 }}>Deposit</h1>
            <img
              src={deposit}
              alt="deposit.png"
              width={300}
              height={300}
              style={{ display: "flex" }}
              class="center"
            />
          </div>

          <form
            className="payment-form"
            onSubmit={handleSubmit}
            style={{ paddingLeft: 500, fontSize: 20 }}
          >
            <label>Deposit Value</label>
            <input
              style={{ maxWidth: "500px" }}
              type="number"
              placeholder="0"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              KeyPress={(event) => {
                if (
                  !/^(?!0\d)\d*(\.\d+)?$/.test(event.target.value + event.key)
                ) {
                  event.preventDefault();
                }
              }}
            />

            <label>Card Payment</label>
            <fieldset style={{ maxWidth: "500px" }} className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>

            {/* <label style={{ paddingLeft: "15px" }}>
              Deposit Value:&nbsp; &nbsp;
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={(event) => {
                  if (
                    !/^[1-9]\d*(\.\d+)?$/.test(event.target.value + event.key)
                  ) {
                    event.preventDefault();
                  }
                }}
                placeholder="Deposit value"
              /> */}
            {/* <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={(event) => {
                  if (
                    !/^[1-9]\d*(\.\d+)?$/.test(event.target.value + event.key)
                  ) {
                    event.preventDefault();
                  }
                }}
                placeholder="Deposit value"
                style={{ backgroundColor: "#7795f8", color: "#fff" }}
              /> */}
            {/* </label>{" "} */}
            {/* <label style={{ paddingLeft: "15px" }}>
              Deposit Value:&nbsp; &nbsp;
              <fieldset style={{ maxWidth: "500px" }} className="FormGroup">
                <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
                </div>
              </fieldset>
            </label> */}
            <button style={{ maxWidth: "200px" }} class="button1">
              Deposit
            </button>
            <p></p>
            <p></p>
            <button
              style={{ maxWidth: "200px" }}
              class="button1"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </form>
        </>
      ) : (
        <div>
          <h2>
            You just bought a sweet spatula congrats this is the best decision
            of you're life
          </h2>
        </div>
      )}
    </>
  );
}
