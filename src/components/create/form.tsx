"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";

import { StepOne, StepThree, StepTwo } from "./steps";
import useStore from "@/store/store";
import { useForm, FormProvider } from "react-hook-form";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const CreateCardForm = () => {
  const { currentStep } = useStore();

  const form = useForm<z.infer<typeof organizerSchema>>({
    resolver: zodResolver(organizerSchema),
    defaultValues: {
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
        qrcode: undefined,
      },
      // gallery: Array(5).fill(""),
      youtubeURL: "",
    },
  });

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Form submitted successfully");
    console.log(data);
  };

  return (
    // <FormProvider {...methods}>
    //   <form className="flex flex-col gap-2" onSubmit={methods.handleSubmit(onSubmit)}>
    //     <input type="text" {...methods.register('name')} placeholder="This is from FORM PARENT COMPONENT" />
    //     {currentStep === 2 && <>
    //       <NestedForm />
    //       <input type="submit" />
    //     </>}
    //   </form>
    // </FormProvider>
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
              Submit
            </Button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default CreateCardForm;
