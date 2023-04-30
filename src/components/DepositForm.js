import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deposit from "../assets/deposit.png";
import pngegg from "../assets/pngegg.png";
import { Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { stopLoading, usersLoading } from "../reducers/usersReducer";
import LoadingSpinner from "../js/Spinner";

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
  const { user, loading } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  console.log(`loading>>>`, loading);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    store.dispatch(usersLoading("pending"));
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(`card>>>`, paymentMethod, error);

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
          store.dispatch(stopLoading("idle"));
        }

        const response_v2 = await axios.post(
          "http://localhost:4000/api/addvalue",
          {
            email: user.email_address,
            value: amount,
          }
        );

        if (response_v2.data.success) {
          console.log("Successful deposit");
          setSuccess(true);
          store.dispatch(stopLoading("idle"));
        }
      } catch (error) {
        store.dispatch(stopLoading("idle"));
        console.log("Error", error);
      }
    } else {
      store.dispatch(stopLoading("idle"));
      console.log(error.message);
    }
  };
  // if (loading === "pending") {
  //   return <LoadingSpinner />;
  // }
  return (
    <>
      {!success ? (
        <>
          <div>
            <h1 style={{ fontSize: 40 }}>Deposit</h1>
            {loading === "pending" ? (
              <LoadingSpinner />
            ) : (
              <img
                // src={deposit}
                src={pngegg}
                alt="deposit.png"
                width={300}
                height={300}
                style={{ display: "flex" }}
                class="center"
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form
              className="payment-form"
              onSubmit={handleSubmit}
              style={{ fontSize: 20 }}
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
              <fieldset style={{ maxWidth: "600px" }} className="FormGroup">
                <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
                </div>
              </fieldset>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  width: "500px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <button
                  style={{ maxWidth: "600px", marginLeft: 15 }}
                  class="button1"
                >
                  Deposit
                </button>
                <p></p>
                <p></p>
                <button
                  style={{ maxWidth: "600px", marginLeft: 15 }}
                  class="button1"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={deposit}
            alt="deposit.png"
            width={300}
            height={300}
            style={{ display: "flex" }}
            class="center"
          />
          <h2 style={{ marginLeft: 0, marginRight: 0 }}>You just deposit</h2>
          <button
            style={{ maxWidth: "600px", marginLeft: 15 }}
            class="button1"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
}
