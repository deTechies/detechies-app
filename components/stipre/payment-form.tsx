"use client";

import { postServer } from "@/lib/data/postRequest";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      setLoading(true)
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: amount },
      });
      const clientSecret = data;

      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result) {
        toast({
          title: "Payment Success",
          description: <pre>{JSON.stringify(result, null, 2)} </pre>,
        });
        
        const paymentResult = await postServer('/payments', JSON.stringify({amount: amount,  payment_data: result}));
    
        toast({
            title: "Payment Success",
            description: <pre>{JSON.stringify(paymentResult, null, 2)} </pre>,
        })
        
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <Card className="max-w-2xl mx-auto flex flex-col gap-4">
      <h1>Top Up</h1>

      <section className="flex gap-3 mx-auto">
        <Button onClick={() => setAmount(amount - 10)}>
          <MinusIcon size={24} />
        </Button>
        <div className="w-[100px]">
            
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="10"
          className="h-16 text-center"
          min="1"
          max="100"
        />
        </div>
        <Button onClick={() => setAmount(amount + 10)}>
          <PlusIcon size={24} />
        </Button>
      </section>
      <h2>Card Details</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="p-4 bg-background-layer-2">
            <CardElement />
        </div>
        <Button size="lg" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
