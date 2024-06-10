import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createCard } from "@/actions/card-actions";
import { organizerSchema } from "../../../../schema/zod/ecard-form";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface StripeEventWithMetadata {
  metadata: { [key: string]: string | string[] };
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(
      payload,
      sig!,
      process.env.WEBHOOK_SECRET_KEY as string
    );

    const formMetadata = (event.data.object as StripeEventWithMetadata)
      .metadata;

    // Convert program_time and program_name string to array and update in formMetadata
    if (
      formMetadata.program_time &&
      typeof formMetadata.program_time === "string"
    ) {
      formMetadata.program_time = formMetadata.program_time.split(",");
    }

    if (
      formMetadata.program_name &&
      typeof formMetadata.program_name === "string"
    ) {
      formMetadata.program_name = formMetadata.program_name.split(",");
    }

    const formData = new FormData();
    Object.entries(formMetadata).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else if (value) {
        formData.append(key, value);
      }
    });

    //VALIDATION DATA CHECK BEFORE CREATING CARD
    const values: Record<string, any> = Object.fromEntries(formData.entries());
    // Accumulate specific keys into arrays
    ["wedding_images", "program_name", "program_time"].forEach((key) => {
      if (formData.getAll(key).length >= 1) {
        values[key] = formData.getAll(key);
      }
    });

    const { error } = organizerSchema.safeParse(values);
    if (error) {
      return NextResponse.json({ status: "failed", error });
    }
    // create card for succesful payment
    if (event.type === "charge.succeeded") {
      await createCard(formData, formMetadata.session as string);
    }

    // Todo charge failed

    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "failed", error });
  }
}
