"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { createDesignFormSchema } from "../../../schema/zod/admin-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadDesign } from "../../../actions/admin-actions";

type DesignFormProps = {
  designs?: {
    design_name?: string;
    category?: string;
    thumbnail?: string;
    front_design?: string;
    content_design?: string;
  };
};

const DesignForm = ({ designs }: DesignFormProps) => {
  const form = useForm<z.infer<typeof createDesignFormSchema>>({
    resolver: zodResolver(createDesignFormSchema),
    defaultValues: {
      design_name: "",
      category: "",
      thumbnail: undefined,
      front_design: undefined,
      content_design: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createDesignFormSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await uploadDesign(formData);
    } catch (error) {
      console.log("helo from form", error);
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
          name="thumbnail"
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
          name="front_design"
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
          control={form.control}
          name="content_design"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Content Design</FormLabel>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DesignForm;
