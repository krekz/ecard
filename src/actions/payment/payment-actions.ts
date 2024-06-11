"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentIntent = async (
  formData: any,
  userId: string,
  voucher_code: string,
  amount: number
) => {
  // remove array
  const metadata = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, String(value)])
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    // payment_method_types: ["card", "fpx", "grabpay"],
    currency: "myr",
    payment_method_types: ["card", "fpx", "grabpay"],
    metadata: {
      voucher_code,
      session: userId,
      ...metadata,
    },
  });

  if (paymentIntent.client_secret == null) {
    return { error: "Unknown error" };
  }

  return { clientSecret: paymentIntent.client_secret };
};
