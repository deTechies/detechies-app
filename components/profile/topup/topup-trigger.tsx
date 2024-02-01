import PaymentForm from "@/components/stipre/payment-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function TopUpTrigger({
    credits, 
    dictionary,
}: {
    credits?: number;
    dictionary: any;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerClose = () => {
         setIsOpen(false);   
        }
  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger>
        <Button variant={"secondary"} size="ts" >
          {dictionary.mypage.topup.charge}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Elements stripe={stripePromise}>
          <PaymentForm  onClose={triggerClose} credits={credits} dictionary={dictionary}/>
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
