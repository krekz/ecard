"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StateDistrict, referralSources } from "@/lib/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { UpdateUser } from "../../../actions/user-action";
import { completeResgistrationSchema } from "../../../schema/zod/user-form";
import { notFound, redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Register = () => {
  const { data: session, update } = useSession();
  if (!session) notFound();
  if (session?.user.state && session.user.district) redirect("/");
  const router = useRouter();
  const userId = session?.user?.id;

  const form = useForm<z.infer<typeof completeResgistrationSchema>>({
    resolver: zodResolver(completeResgistrationSchema),
    defaultValues: {
      state: "",
      district: "",
      referral: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof completeResgistrationSchema>
  ) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const { state, district } = await UpdateUser(userId, formData);
      update({
        user: {
          ...session.user,
          state,
          district,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  const getDistrictsByState = (state: string): string[] | null => {
    const stateData: { state: string; districts: string[] } | undefined =
      StateDistrict.find(
        (s) => s.state.toLowerCase().replace(/ /g, "-") === state?.toLowerCase()
      );
    return stateData ? stateData.districts : null;
  };

  const getState = form.watch("state");
  const getDistrict = getDistrictsByState(getState);

  useEffect(() => {
    form.reset({
      ...form.getValues(), // preserve other form values
      district: "", // reset district
    });
  }, [getState, form]);

  return (
    <main
      style={{ backgroundImage: "url('/register-bg.svg')" }}
      className={`p-5 bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] h-screen flex overflow-hidden flex-row-reverse gap-10 items-center justify-around ${inter.className}`}
    >
      <Image
        src="/register-hero.svg"
        alt="Logo"
        width={600}
        height={600}
        className="hidden xl:block"
      />
      <div className="bg-zinc-100 p-10 rounded-lg shadow-lg max-w-1/3">
        <div className="text-center flex flex-col items-center gap-5">
          <h1 className="text-2xl font-extrabold">Final step</h1>
          <p className="text-gray-500 break-words max-w-[500px] mx-auto">
            Hi{" "}
            <span className="text-black font-medium">{session.user.name}</span>{" "}
            ! To help us serve you better, we&apos;d love to know a bit more
            about you!
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 text-start flex flex-col"
            >
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full mx-auto">
                        <SelectTrigger>
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {StateDistrict.map((location) => (
                          <SelectItem
                            key={location.state}
                            value={location.state
                              .toLowerCase()
                              .replace(/ /g, "-")}
                          >
                            {location.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      District
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full mx-auto">
                        <SelectTrigger>
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getDistrict &&
                          getDistrict.map((district) => (
                            <SelectItem
                              key={district}
                              value={district.toLowerCase()}
                            >
                              {district}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      How do you know us?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full mx-auto">
                        <SelectTrigger>
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {referralSources.map((source) => (
                          <SelectItem key={source} value={source.toLowerCase()}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="text-center mx-auto" disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful} type="submit">
                Complete
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;
