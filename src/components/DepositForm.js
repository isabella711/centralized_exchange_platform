import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deposit from "../assets/deposit.png";
import { Placeholder } from "react-bootstrap";
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
        const response = await axios.post("http://localhost:4000/addvalue", {
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
      <img src={deposit} alt="deposit.png" width={300} height={300}  style={{display: "flex"}} class="center"/>




    

    </div>

        <form onSubmit={handleSubmit} style={{paddingLeft:200 ,fontSize: 20}}>
          <label style={{paddingLeft: "15px"}}>
          <input 
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={(event) => {if (!/^[1-9]\d*(\.\d+)?$/.test(event.target.value + event.key)) {event.preventDefault();}
          }}
          placeholder="Deposit value"
          style={{backgroundColor:"#7795f8", color: "#fff"}}
           />
           </label>
          <fieldset className="FormGroup">
            <div className="FormRow">
              
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit" style={{maxWidth:"200px"}}>Deposit</button>
          <button onClick={() => navigate(-1)} style={{maxWidth:"200px"}}>Go Back</button>
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
