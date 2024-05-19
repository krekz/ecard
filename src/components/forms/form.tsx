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
import { useRouter, useSearchParams } from "next/navigation";
import FormButton from "../button";
import { Button } from "../ui/button";
import PromptAlert from "../alert";

const CardForm = ({ dataFromDB, user }: CardFormProps) => {
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
          date: dataFromDB.event.date,
          address: dataFromDB.event.address,
          greeting: dataFromDB.event.greeting,
          google_map: dataFromDB.event.gMap,
          // start_time: "",
          // end_time: "",
          venue: dataFromDB.event.venue,

          acc_name: dataFromDB.donation?.name,
          bank: dataFromDB.donation?.bank,
          acc_number: dataFromDB.donation?.accountNo,
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
          greeting: "",
          google_map: "",
          // start_time: "asdasd",
          // end_time: "asdasd",
          venue: "",
          acc_name: "",
          acc_number: "",
          bank: "",
        },
  });

  const onSubmit = async (data: z.infer<typeof organizerSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as Blob);
      }
    });

    try {
      // update card if props exist
      if (dataFromDB) {
        toast.promise(
          updateCard(formData, {
            cardId: dataFromDB.id,
            eventId: dataFromDB.event?.id,
            donationId: dataFromDB.donation?.id ,
            userId: user?.id
            // heirsId: dataFromDB.heirs.map((heir) => heir.id),
          }),
          {
            loading: "Updating...",
            success: "Card updated successfully",
            error: "An error occurred while updating the form",
          }
        );
        return;
      }
      console.log(data);
      //else create new card
      toast
        .promise(createCard(formData), {
          loading: "Creating...",
          success: "Card created successfully",
          error: (error) => {
            console.log(error);
            return "An error occurred while creating the card";
          },
        })
        .then((response) => {
          const toastId = toast.loading("Redirecting...");
          const cardResponse = response as { ok: boolean; id: string };
          if (!cardResponse?.id) {
            toast.dismiss(toastId);
            toast.error("Invalid card ID received.");
            return;
          }
          const redirectDelay = 2000; // Delay before redirecting to allow user to see the success message
          setTimeout(() => {
            toast.dismiss(toastId);
            router.push(`/preview/${cardResponse.id}`);
          }, redirectDelay);
        })
        .catch((error) => {
          // Handle any unexpected errors here
          console.error("An unexpected error occurred:", error);
          toast.error("An unexpected error occurred during redirection.");
        });
    } catch (e) {
      toast.error("An error occurred while creating the card");
      console.error("Failed to create card", e);
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
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Update
                </Button>
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
