"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  uploadDesignSchema,
  updateDesignSchema,
} from "../../../schema/zod/admin-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { updateDesign, uploadDesign } from "@/actions/admin/design-actions";
import { useRouter } from "next/navigation";

type DesignFormProps = {
  design?: {
    designId: string;
    category: string;
    name: string;
  };
  params: "update" | "create";
};

const DesignForm = ({ design, params }: DesignFormProps) => {
  const router = useRouter();

  const { toast } = useToast();
  console.log("PARAMS FROM COMPONENT", params);
  const schema = params === "create" ? uploadDesignSchema : updateDesignSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      params === "update"
        ? { design_name: design?.name, category: design?.category }
        : {
            design_name: "",
            category: "",
          },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      if (design) {
        const response = await updateDesign(formData, design.name);
        if (response?.ok) {
          toast({
            title: response.message,
            variant: "success",
          });
          router.push("/admin/designs");
        } else {
          toast({
            title: response?.message,
            variant: "destructive",
          });
        }
        return;
      }

      const response = await uploadDesign(formData);
      if (response?.ok) {
        toast({
          title: response.message,
          variant: "success",
        });
        router.push("/admin/designs");
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
                </SelectContent>
              </Select>
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
                  accept="image/png, image/jpeg, image/jpg"
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
                  accept="image/png, image/jpeg, image/jpg"
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
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    fieldValues.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Card dimension{" "}
                <span className="font-bold italic">415x1000</span> pixels
              </FormDescription>
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
