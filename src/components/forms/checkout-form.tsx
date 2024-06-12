"use client";
import { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import useStore from "@/store/store";
import { useSearchParams } from "next/navigation";
import CheckoutError from "@/app/checkout/checkout-error";
import Image from "next/image";
import Link from "next/link";
import { createPaymentIntent } from "@/actions/payment/payment-actions";

type CheckoutFormProps = {
  userId?: string;
  design_thumbnail: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutForm = ({
  userId,
  design_thumbnail,
}: CheckoutFormProps) => {
  const searchParams = useSearchParams();
  const { voucherStore, formDataStore } = useStore();
  // the pricing are in cents
  const amount =
    voucherStore.voucher_code === ""
      ? 990
      : Math.ceil(
          // (990 * 100) is like RM9.90 * 100%discount
          990 - (990 * 50) / 100
        );

  // avoid user from accessing checkout by modifying the url params
  // check the current state from zustand (global state management)
  if (!formDataStore.couple || !formDataStore.phone_number) {
    return <CheckoutError />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row mx-auto w-full p-5 gap-5">
        <div className="w-full border-b md:border-r md:border-b-0">
          <h1 className="text-2xl font-semibold text-center">Order Summary</h1>
          <div className="flex flex-col items-center p-5 overflow-hidden">
            <Image
              className="scale-125"
              src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${design_thumbnail}`}
              width={300}
              height={300}
              loading="eager"
              alt="phone"
            />
            <div className="w-full flex flex-col gap-2">
              <p className="text-center font-semibold text-xl">
                {searchParams.get("designId")?.toUpperCase()}
              </p>
              <div className="flex w-full gap-2 justify-around">
                <p>Weddding date:</p>
                <p>12/05/2024</p>
              </div>
              <div className="flex w-full gap-2 justify-around">
                <p className="text-2xl font-medium">Total</p>
                <p className="text-2xl font-bold">RM{amount / 100}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-3 shadow-md p-5 rounded-lg">
          <h1 className="font-semibold text-2xl">Payment methods</h1>
          <Elements
            options={{
              payment_method_types: ["card", "fpx", "grabpay"],
              amount,
              mode: "payment",
              currency: "myr",
            }}
            stripe={stripePromise}
          >
            <Form
              userId={userId!}
              amount={amount}
              formDataStore={formDataStore}
              voucherStore={voucherStore}
            />
          </Elements>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3 max-w-2xl mx-auto">
        <p className="text-center text-md text-yellow-600">Important !</p>
        <p className="text-center text-sm text-gray-500">
          Please ensure your wedding date is correct, otherwise{" "}
          <span className="font-semibold">
            you are not able to change the date
          </span>{" "}
          except all the details in the future.
        </p>
      </div>
    </div>
  );
};

const Form = ({
  userId,
  amount,
  formDataStore,
  voucherStore,
}: {
  userId: string;
  amount: number;
  formDataStore: any;
  voucherStore: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stripe == null || elements == null) return;
    setLoading(true);

    const paymentIntent = await createPaymentIntent(
      formDataStore,
      userId,
      voucherStore.voucher_code!,
      amount
    );

    if (paymentIntent.error != null) {
      setErrorMessage(paymentIntent.error);
      setLoading(false);
      return;
    }

    const result = await elements.submit();

    // Check if the submission was successful before confirming payment
    if (result.error) {
      setErrorMessage(
        result.error.message || "Failed to submit payment details"
      );
      setLoading(false);
    } else {
      stripe
        .confirmPayment({
          elements,
          clientSecret: paymentIntent.clientSecret,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_WEB_URL}/checkout/payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error &&
            (error.type === "card_error" || error.type === "validation_error")
          ) {
            setErrorMessage(
              error.message || "An error occurred during payment confirmation"
            );
          } else if (error) {
            setErrorMessage("Unknown error occurred");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <form className="w-full space-x-3 space-y-3" onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <PaymentElement />

      <div className="flex flex-col-reverse md:flex-row gap-1">
        <Button
          variant="outline"
          className="w-full"
          disabled={!stripe || !elements || loading}
          asChild
        >
          <Link replace href="/catalog">
            Cancel
          </Link>
        </Button>
        <Button
          className="w-full bg-fuchsia-500 hover:bg-fuchsia-500/80"
          disabled={!stripe || !elements || loading}
        >
          {loading ? "Loading..." : "Pay"}
        </Button>
      </div>
    </form>
  );
};
