"use client";

import { postServer } from "@/lib/data/postRequest";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { ArrowDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

export default function PaymentForm({
  credits,
  onClose,
}: {
  credits?: number;
  onClose: any;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = React.useState<number>(10);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      if (amount < 10000) {
        toast({
          title: "Amount is too low",
          description: "Please enter an amount higher than 10000.",
        });
        return;
      }

      setLoading(true);
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: amount },
      });

      const result = await stripe?.confirmCardPayment(data, {
        payment_method: { card: cardElement },
      });

      if (result.paymentIntent?.status == "succeeded") {
        const paymentResult = await postServer(
          "/payments",
          JSON.stringify({ amount: amount, payment_data: result })
        );

        if (paymentResult) {
          toast({
            description:
              "Payment has succesfully been created and added to your account.",
          });

          onClose();
        }
        setLoading(false);
      } else {
        toast({
          title: "Payment has failed. Please try again.",
          description: result.error?.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-subhead_s">Start trials</h1>
        <h5>Start adding your payment</h5>
      </div>

      <section className="flex gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Label>Payment</Label>
          <Input
            type="number"
            value={amount.toFixed(0)}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            placeholder="10"
            className="w-full"
            defaultValue={0}
            min={10000}
            max={1000000000}
          />
        </div>
      </section>
      <section>
        <ArrowDown className="mx-auto" />
        <Label className="mb-2">Amount of </Label>
        <div className="border rounded-sm p-5 flex flex-col gap-2">
          <span className="text-label_s text-text-secondary">
            Current baalnce: {credits ? credits : "0"} Credits
          </span>
          <h2 className="text-subhead_l">{(amount * 10).toLocaleString()} P</h2>
        </div>
      </section>
      <section>
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-6">
          <div className="flex flex-col gap-2">
            <Label>Card Details</Label>
            <div className="w-full bg-background-layer-2 rounded-sm p-5">
              <CardElement />
            </div>
          </div>
          <div className="flex gap-4 w-full mx-auto justify-center">
            <Button
              variant={"secondary"}
              size="lg"
              type="button"
              disabled={loading}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>

            <Button type="submit" size="lg" loading={loading}>
              Pay
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
