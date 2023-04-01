import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51JBH8KD1i9JXWcCAxQ4FpjI8nJFh0ket7hTobQNRdNNHstsoOmHnw9LzAFgzActANnbS6VhM33SNbHaU4vKqI0Xq00OC0rZKho";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
