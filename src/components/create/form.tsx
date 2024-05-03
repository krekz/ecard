"use client";

import toast from "react-hot-toast";
import { StepOne, StepThree, StepTwo } from "./steps";
import useStore from "@/store/store";
import { useForm, FormProvider } from "react-hook-form";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { createCard, updateCard } from "../../../actions/form-actions";

type CardFormProps = {
  dataFromDB?: {
    id:string;
    father: string;
    mother: string;
    bride: string;
    groom: string;
    couple: string;
    phone_number: string;
    youtubeURL: string;
    heirs: {
      id:number;
      name: string;
      phone: string;
      relation: string;
    }[];
    donation: {
      id:number;
      name: string;
      bank: string;
      accountNo: string;
      qrcode: string;
    };
    event: {
      id: number;
      date: Date;
      address: string;
      gMap: string;
      time: string;
      venue: string;
      greeting: string;
    };
  };
};

const CardForm = ({ dataFromDB }: CardFormProps) => {
  const { currentStep } = useStore();
  const form = useForm<z.infer<typeof organizerSchema>>({
    resolver: zodResolver(organizerSchema),
    defaultValues: dataFromDB
      ? {
          father: dataFromDB.father,
          mother: dataFromDB.mother,
          bride: dataFromDB.bride,
          groom: dataFromDB.groom,
          couple: dataFromDB.couple,
          phone_number: dataFromDB.phone_number,
          heirs: dataFromDB?.heirs?.map((dataFromDB) => ({
            name: dataFromDB.name,
            phone: dataFromDB.phone,
            relation: dataFromDB.relation,
          })),

          event: {
            date: dataFromDB.event.date,
            address: dataFromDB.event.address,
            greeting: dataFromDB.event.greeting,
            gMap: dataFromDB.event.gMap,
            time: dataFromDB.event.time,
            venue: dataFromDB.event.venue,
          },

          donation: {
            name: dataFromDB.donation?.name,
            bank: dataFromDB.donation?.bank,
            accountNo: dataFromDB.donation?.accountNo,
            qrcode: dataFromDB.donation?.qrcode,
          },
          // gallery: Array(5).fill(""),
          youtubeURL: dataFromDB.youtubeURL,
        }
      : {
          father: "",
          mother: "",
          bride: "",
          groom: "",
          couple: "",
          phone_number: "",
          heirs: Array(2)
            .fill(0)
            .map(() => ({
              name: "",
              phone: "",
              relation: "",
            })),

          event: {
            date: undefined,
            address: "",
            greeting: "",
            gMap: "",
            time: "",
            venue: "",
          },

          donation: {
            name: "",
            bank: "",
            accountNo: "",
            qrcode: "",
          },
          // gallery: Array(5).fill(""),
          youtubeURL: "",
        },
  });

  const onSubmit = async (data: any) => {
    try {
      if (dataFromDB) {
        // should implement updateCard server actions
        await updateCard(data, {
          cardId: dataFromDB.id,
          eventId: dataFromDB.event.id,
          donationId: dataFromDB.donation.id,
          heirsId: dataFromDB.heirs.map(heir => heir.id),
        });
        toast.success("Form UPDATED successfully");
        return;
      }
      await createCard(data);
      toast.success("Form submitted successfully");
    } catch (e) {
      toast.error("An error occurred while submitting the form");
    }
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full sm:w-3/4 2xl:w-1/2"
      >
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && (
          <>
            <StepThree />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {dataFromDB ? "Update" : "Submit"}
            </Button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default CardForm;
