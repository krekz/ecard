"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { createVoucherFormSchema } from "../../../schema/zod/admin-form";
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
import { Textarea } from "../ui/textarea";
import { uploadVoucher } from "../../../actions/admin/voucher-actions";

const VoucherForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createVoucherFormSchema>>({
    resolver: zodResolver(createVoucherFormSchema),
    defaultValues: {
      code: "",
      description: "",
      max_claims: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createVoucherFormSchema>) => {
    try {
      const response = await uploadVoucher(data);
      if (!response?.ok) {
        toast({
          variant: "destructive",
          title: response?.message,
        });
      } else {
        toast({
          title: response?.message,
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //  TODO: toast
    // TODO: update form
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Voucher Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Free 100 cards for new product launch"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_claims"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">
          Create Voucher
        </Button>
      </form>
    </Form>
  );
};

export default VoucherForm;
