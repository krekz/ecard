import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import prisma from "../../../../prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuGlobe, LuInstagram } from "react-icons/lu";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
  };
}) => {
  const session = await auth();
  if (!session) return notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  if (paymentIntent.metadata.phone_number == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <section className="py-28 bg-gray-900 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          {isSuccess ? (
            <h3 className="text-white text-3xl font-semibold sm:text-4xl">
              Thank you for your purchase
            </h3>
          ) : (
            <h3 className="text-white text-3xl font-semibold sm:text-4xl">
              Payment <span className="text-red-500">failed</span>
            </h3>
          )}
          {isSuccess ? (
            <p className="mt-3 text-gray-300">
              You may now share your card with your friends and family by copy
              the link in the url bar of your browser.
            </p>
          ) : (
            <p className="mt-3 text-gray-300">
              Please try again. If the problem persists, please contact us.
            </p>
          )}
          <div className="space-x-2 space-y-2">
            {isSuccess ? (
              <Button
                asChild
                className="w-28 bg-fuchsia-700 hover:bg-fuchsia-800"
              >
                <Link replace href={`/user/cards`}>
                  Return
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-fuchsia-700 hover:bg-fuchsia-800">
                <Link replace href={`/catalog`}>
                  Back to catalog
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="space-y-1">
            <h3 className="text-white text-2xl font-semibold sm:text-3xl">
              Get in touch with us
            </h3>
            <p className="text-white">
              <span className="text-fuchsia-500">Tea</span>Card powered by
              Telekung Tea
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <Link replace href="https://www.instagram.com/telekungtea/">
              <LuInstagram className=" rounded-full" size={35} color="red" />
            </Link>
            <Link replace href="https://telekungtea.com">
              <LuGlobe size={35} color="blue" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
