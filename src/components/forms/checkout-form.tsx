"use client";
import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import useStore from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import CheckoutError from "@/app/checkout/checkout-error";

type CheckoutFormProps = {
  userId?: string;
};

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutForm = ({ userId }: CheckoutFormProps) => {
  // avoid user from accessing checkout by modifying the url params
  // check the current state from zustand (global state management)
  const { formDataStore } = useStore();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`/api/payment-intent`, data);
    },
  });

  useEffect(() => {
    mutation.mutate({ formData: formDataStore, session: { userId } });
  }, []);

  const clientSecret = mutation.data?.data?.client_secret;

  return (
    <>
      {!formDataStore.couple || !formDataStore.phone_number ? (
        <CheckoutError />
      ) : (
        <div className="max-w-3xl mx-auto w-full p-5">
          {mutation.isSuccess && (
            <Elements options={{ clientSecret }} stripe={stripe}>
              <Form />
            </Elements>
          )}
        </div>
      )}
    </>
  );
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stripe == null || elements == null) return;
    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_WEB_URL}`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message || "an error occured");
        } else {
          setErrorMessage("Unknown error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <PaymentElement />
      <Button disabled={!stripe || !elements || loading}>
        {loading ? "Loading..." : "Pay"}
      </Button>
    </form>
  );
};
