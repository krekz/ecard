"use client";

import toast from "react-hot-toast";
import { StepOne, StepThree, StepTwo } from "./steps";
import useStore from "@/store/store";
import { useForm, FormProvider } from "react-hook-form";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCard, updateCard } from "../../../actions/form-actions";
import { CardFormProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormButton from "../button";
import { Button } from "../ui/button";
import PromptAlert from "../alert";
import { Dialog } from "../ui/dialog";

const CardForm = ({ dataFromDB }: CardFormProps) => {
  const router = useRouter();
  const { currentStep, disableButton, setDisableButton } = useStore();
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
          designId: dataFromDB.designId,
          youtubeURL: dataFromDB.youtubeURL,
          primary_font: dataFromDB.primary_font,
          secondary_font: dataFromDB.secondary_font,
          heirs: dataFromDB?.heirs?.map((dataFromDB) => ({
            name: dataFromDB.name,
            phone: dataFromDB.phone,
            relation: dataFromDB.relation,
          })),
          event: {
            date: dataFromDB.event.dateShort,
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
        }
      : {
          father: "",
          mother: "",
          bride: "",
          groom: "",
          couple: "",
          phone_number: "",
          designId: "",
          heirs: [],
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
        },
  });

  const onSubmit = async (data: any) => {
    try {
      // update card if props exist
      if (dataFromDB) {
        await updateCard(data, {
          cardId: dataFromDB.id,
          eventId: dataFromDB.event.id,
          donationId: dataFromDB.donation.id,
          heirsId: dataFromDB.heirs.map((heir) => heir.id),
        });
        toast.success("Form UPDATED successfully");
        return;
      }
      //else create new card
      const response = await createCard(data);
      if (response?.ok) {
        toast.success("Form submitted successfully");
        router.push(`/preview/${response.id}`);
      }
    } catch (e) {
      toast.error("An error occurred while submitting the form");
    }
  };

  const handleNextStep = () => {
    useStore.setState({ currentStep: currentStep + 1 });
  };

  const handlePrevStep = () => {
    useStore.setState({ currentStep: currentStep - 1 });
  };

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full sm:w-3/4 2xl:w-1/2"
        >
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {/* Display submit / update button */}
          {currentStep === 3 && (
            <>
              <StepThree />
              {dataFromDB ? (
                <Button disabled={form.formState.isSubmitting} >Update</Button>
              ) : (
                <PromptAlert onSubmit={onSubmit}>Submit</PromptAlert>
              )}
            </>
          )}
        </form>
      </FormProvider>
      {/* Next and prev button */}
      <div className="flex flex-row flex-wrap  gap-3">
        <Button
          variant="outline"
          className="w-32"
          disabled={currentStep === 1}
          onClick={handlePrevStep}
        >
          Back
        </Button>
        <Button
          className="w-32"
          disabled={currentStep === 3}
          onClick={handleNextStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CardForm;