import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createCard } from "@/actions/card-actions";
import { organizerSchema } from "../../../../schema/zod/ecard-form";
import { checkVoucher, voucherClaim } from "@/actions/admin/voucher-actions";

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
    formMetadata.program_time = String(formMetadata.program_time).split(",");
    formMetadata.program_name = String(formMetadata.program_name).split(",");

    // convert cardform metadata to FormData
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

    const voucherFormData = new FormData();

    // FormData VALIDATION CHECK BEFORE proceed to payment
    // if validation fails, do not proceed
    const values: Record<string, any> = Object.fromEntries(formData.entries());
    // Accumulate specific keys into arrays
    ["wedding_images", "program_name", "program_time"].forEach((key) => {
      if (formData.getAll(key).length >= 1) {
        values[key] = formData.getAll(key);
      }
    });

    const { error } = organizerSchema.safeParse(values);
    if (error) {
      event.type = "charge.failed";
    }

    // create card for succesful payment
    if (event.type === "charge.succeeded") {
      console.log("charge succeeded block");
      //conver voucher code to FormData
      if (formMetadata.voucher_code) {
        voucherFormData.append(
          "voucher_code",
          formMetadata.voucher_code as string
        );
        const checkVoucherResponse = await checkVoucher(
          voucherFormData,
          formMetadata.session as string
        );
        if (!checkVoucherResponse?.ok) {
          return NextResponse.json({
            status: "failed",
            error: "Voucher code is invalid",
          });
        }
        const claimVoucher = await voucherClaim(
          voucherFormData,
          formMetadata.session as string
        );
        if (!claimVoucher?.ok) {
          return NextResponse.json({
            status: "failed",
            error: "Voucher code is invalid",
          });
        }
      }
      await createCard(formData, formMetadata.session as string);
    }

    // Todo charge failed

    if (event.type === "charge.failed") {
      return new NextResponse("Bad request", { status: 400 });
    }

    return new NextResponse();
  } catch (error) {
    return NextResponse.json({ status: "failed", error });
  }
}
