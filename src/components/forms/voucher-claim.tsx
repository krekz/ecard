"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { voucherClaimSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { checkVoucher, voucherClaim } from "@/actions/admin/voucher-actions";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";

const VoucherClaim = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { setVoucherStore } = useStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof voucherClaimSchema>>({
    resolver: zodResolver(voucherClaimSchema),
    defaultValues: {
      voucher_code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof voucherClaimSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await checkVoucher(formData, userId!);
      if (response?.ok) {
        toast({
          title: response.message,
          description: "Continue to payment to fully redeem your voucher",
          variant: "success",
        });
        setVoucherStore({ voucher_code: response?.code });
      } else {
        toast({
          title: response?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="voucher_code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Voucher</FormLabel>
              <FormControl>
                <Input placeholder="Enter Voucher Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Claim</Button>
      </form>
    </Form>
  );
};

export default VoucherClaim;
