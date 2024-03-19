"use client";

import PaymentForm from "@/components/stripe/payment-form";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onClose={() => console.log("close")} />
    </Elements>
  );
}