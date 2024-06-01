"use client";
// import toast from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/store/store";
import { useForm, FormProvider } from "react-hook-form";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCard, updateCard } from "../../../actions/card-actions";
import { CardFormProps } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import PromptAlert from "../alert";
import CardFormPreview from "./cardform-preview";
import VoucherClaim from "./voucher-claim";
import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";

export const maxDuration = 60;

const CardForm = ({ dataFromDB, user }: CardFormProps) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const designId = searchParams.get("design_id");
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
          design_id: dataFromDB.designId,
          youtube_url: dataFromDB.youtubeURL,
          primary_font: dataFromDB.primary_font,
          secondary_font: dataFromDB.secondary_font,
          date: dataFromDB.event?.date,
          address: dataFromDB.event?.address,
          greeting: dataFromDB.event?.greeting,
          google_map: dataFromDB.event?.gMap,
          // start_time: "",
          // end_time: "",
          venue: dataFromDB.event?.venue,
          acc_name: dataFromDB.donation?.acc_name,
          bank: dataFromDB.donation?.bank,
          acc_number: dataFromDB.donation?.acc_number,
          program_name: dataFromDB.event?.program?.map(
            (program) => program.name as string
          ),
          program_time: dataFromDB.event?.program?.map(
            (program) => program.start_time as string
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
          // start_time: "asdasd",
          // end_time: "asdasd",
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
          formData.append(key, item as Blob); // Append each file under the same key
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
        } else {
          toast({
            title: response?.message,
            variant: "destructive",
          });
        }
        return;
      }

      //else create new card
      const response = await createCard(formData);
      if (response?.ok) {
        toast({
          title: response?.message,
          variant: "success",
        });

        router.push(`/preview/${response.id}`);
      } else {
        toast({
          title: response?.message,
          variant: "destructive",
        });
      }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:p-5 gap-5 container">
      <FormProvider {...form}>
        {/* Main content (form) */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:col-span-2 flex flex-col gap-5 space-y-3 w-full  "
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
                <PromptAlert onSubmit={onSubmit}>Submit</PromptAlert>
              )}
            </>
          )}

          <div className="flex flex-row flex-wrap  gap-3">
            <Button
              variant="outline"
              type="button"
              className="w-32"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
            >
              Back
            </Button>
            <Button
              type="button"
              className="w-32"
              disabled={currentStep === 3}
              onClick={handleNextStep}
            >
              Next
            </Button>
          </div>
        </form>
        {/* Preview and Voucher on sidebar */}
        <div
          className="flex flex-col gap-5 w-full rounded-lg p-3 order-first md:order-last "
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
