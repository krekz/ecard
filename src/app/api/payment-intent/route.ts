import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: Request) => {
  const { formData, session } = await req.json();
  // convert everything to string. NO ARRAY because stripe metadata only accepts string
  const metadata = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, String(value)])
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 990,
    currency: "myr",
    metadata: {
      session: session.userId,
      ...metadata,
    },
  });

  return NextResponse.json(paymentIntent);
};
