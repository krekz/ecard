"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { voucherClaimSchema } from "../../../schema/zod/ecard-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { voucherClaim } from "../../../actions/admin/voucher-actions";
import { useToast } from "../ui/use-toast";

const VoucherClaim = () => {
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
      const response = await voucherClaim(formData);
      if (response?.ok) {
        toast({
          title: response.message,
          description: "You may now get free card",
          variant: "success",
        });
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
              <FormLabel>Claim your voucher</FormLabel>
              <FormControl>
                <Input placeholder="WED-3" {...field} />
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
