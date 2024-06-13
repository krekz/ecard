"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PromptAlert from "@/components/alert";
import CardFormPreview from "@/components/forms/cardform-preview";
import VoucherClaim from "@/components/forms/voucher-claim";
import StepOne from "@/components/forms/steps/step-one";
import StepTwo from "@/components/forms/steps/step-two";
import StepThree from "@/components/forms/steps/step-three";
import useStore from "@/store/store";
import { useForm, FormProvider } from "react-hook-form";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCard } from "@/actions/card-actions";
import { CardFormProps } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";
import { useEffect } from "react";

const CardForm = ({ dataFromDB, user }: CardFormProps) => {
  const { formDataStore, setFormDataStore, currentStep } = useStore();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const designId = searchParams.get("design_id");
  const router = useRouter();
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
          design_id: dataFromDB.designId,
          youtube_url: dataFromDB.youtube_url,
          primary_font: dataFromDB.primary_font,
          secondary_font: dataFromDB.secondary_font,
          date: dataFromDB.event?.date,
          address: dataFromDB.event?.address,
          greeting: dataFromDB.event?.greeting,
          google_map: dataFromDB.event?.gMap,
          venue: dataFromDB.event?.venue,
          acc_name: dataFromDB.donation?.acc_name,
          bank: dataFromDB.donation?.bank,
          acc_number: dataFromDB.donation?.acc_number,
          program_name: dataFromDB.event?.program?.map((program) =>
            program.name === null ? "" : program.name
          ),
          program_time: dataFromDB.event?.program?.map((program) =>
            program.start_time === null ? "" : program.start_time
          ),
        }
      : {
          father: "",
          mother: "",
          bride: "",
          groom: "",
          couple: "",
          phone_number: "",
          design_id: designId!,
          date: undefined,
          address: "",
          greeting:
            "Dengan penuh kesyukuran kehadrat Illahi, kami mempersilakan Dato'/Datin/Dr/Tuan/Puan/Encik/Cik ke walimatulurus anakanda kesayangan kami",
          google_map: "",
          venue: "",
          acc_name: "",
          acc_number: "",
          bank: "",
          program_name: Array.from({ length: 3 }).map(() => ""),
          program_time: Array.from({ length: 3 }).map(() => ""),
        },
  });

  const onSubmit = async (data: z.infer<typeof organizerSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item as Blob);
        });
      } else if (value) {
        formData.append(key, value as Blob);
      }
    });

    try {
      // update card if props exist
      if (dataFromDB) {
        const response = await updateCard(formData, {
          cardId: dataFromDB.id,
          eventId: dataFromDB.event?.id,
          donationId: dataFromDB.donation?.id,
          userId: user?.id,
          // heirsId: dataFromDB.heirs.map((heir) => heir.id),
        });
        if (response?.ok) {
          toast({
            title: response.message,
            variant: "success",
          });
          router.push("/user/cards");
        } else {
          toast({
            title: response?.message,
            variant: "destructive",
          });
        }
        return;
      }

      //else create new card
      setFormDataStore(data); // set global state for payment later
      router.replace(`/checkout?designId=${designId}`);
    } catch (e) {
      toast({
        title: "An error occurred while creating the card",
        variant: "destructive",
      });
      console.error("Failed to create card", e);
    }
  };

  const handleNextStep = () =>
    useStore.setState({ currentStep: currentStep + 1 });

  const handlePrevStep = () =>
    useStore.setState({ currentStep: currentStep - 1 });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        title: "Oops, there's an error with your input",
        variant: "destructive",
      });
    }
  }, [form.formState.errors, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:p-5 gap-5 container">
      <FormProvider {...form}>
        {/* Main content (form) */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:col-span-2 flex flex-col gap-2 w-full  "
        >
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {/* Display submit / update button */}
          {currentStep === 3 && (
            <>
              <StepThree />
              {dataFromDB ? (
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Update
                </Button>
              ) : (
                <>
                  <PromptAlert onSubmit={onSubmit}>
                    Proceed to payment
                  </PromptAlert>
                </>
              )}
            </>
          )}

          <div className="flex flex-row flex-wrap justify-around py-10">
            <Button
              variant="outline"
              type="button"
              className="w-32"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
            >
              <LuArrowLeftCircle size={30} />
            </Button>
            <Button
              type="button"
              className="w-32 flex gap-1"
              disabled={currentStep === 3}
              onClick={handleNextStep}
            >
              <LuArrowRightCircle size={30} />
            </Button>
          </div>
        </form>
        {/* Preview and Voucher on sidebar */}
        <div
          className="flex flex-col gap-5 w-full rounded-lg p-3 order-first md:order-last max-h-[52rem]"
          style={{
            backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
          }}
        >
          <CardFormPreview />
          {!dataFromDB && <VoucherClaim />}
        </div>
      </FormProvider>
    </div>
  );
};

export default CardForm;
