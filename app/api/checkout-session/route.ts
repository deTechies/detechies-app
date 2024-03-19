import { stripe } from "@/config/stripe";
import { auth } from "@/lib/helpers/authOptions";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const URL = "https://api.stripe.com/v1/checkout/sessions";
    // 1. Destructure the price and quantity from the POST body
    const { price, quantity = 1, metadata = {} } = await req.json();
    
    const subscription_id = "price_1OvrKwGgWTlsnC777h81M1JN"

    try {
      // 2. Get the user from Supabase auth

      const data = await auth();

      // 3. Retrieve or create the customer in Stripe
      const customer = {
        id: data?.web3?.user?.id,
        email: data?.web3?.user?.email,
        phone: "06",
        address: {
          line1: "auto",
          line2: "",
          city: "auto",
          state: "auto",
          postal_code: "auto",
          country: "auto",
        },
      };

      // 4. Create a checkout session in Stripe
      let session;

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: "auto",
        customer_update: {
          address: "auto",
        },
        line_items: [
          {
            price: subscription_id,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: `${URL}/account`,
        cancel_url: `${URL}/`,
      });

      if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({
            error: { statusCode: 500, message: "Session is not defined" },
          }),
          { status: 500 }
        );
      }
    } catch (err: any) {

      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
