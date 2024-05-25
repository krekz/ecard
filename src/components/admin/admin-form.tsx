"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  uploadDesignSchema,
  updateDesignSchema,
} from "../../../schema/zod/admin-form";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateDesign,
  uploadDesign,
} from "../../../actions/admin/design-actions";
import { useEffect } from "react";

type DesignFormProps = {
  design?: {
    designId: string;
    category: string;
    name: string;
  };
  formType: "upload" | "update";
};

const DesignForm = ({ design, formType }: DesignFormProps) => {
  const schema =
    formType === "upload" ? uploadDesignSchema : updateDesignSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: design
      ? { design_name: design.name, category: design.category }
      : {
          design_name: "",
          category: "",
        },
  });

  useEffect(() => {
    if (design) {
      form.reset({
        design_name: design.name,
        category: design.category,
        thumbnail_url: undefined,
        front_design_url: undefined,
        content_design_url: undefined,
      });
    }
  }, [design, form]);

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as Blob);
      }
    });

    try {
      if (design) {
        try {
          const response = await updateDesign(formData,design.name);
          if (response?.ok) {
            toast({
              title: response.message,
              variant: "success",
            });
          }else {
            toast({
              title: response?.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.log(error);
        }
        return;
      }

      const response = await uploadDesign(formData);
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
    } catch {
      toast({
        title: "An error occurred while uploading the card",
        variant: "destructive",
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="design_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Design Name</FormLabel>
              <FormControl>
                <Input placeholder="WED-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Category not listed? click
                <Button variant="link" className="text-blue-500">
                  here
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail_url"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    fieldValues.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="front_design_url"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Front Design</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  placeholder="shadcn"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    fieldValues.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`content_design_url`}
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Content Design</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    fieldValues.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default DesignForm;
