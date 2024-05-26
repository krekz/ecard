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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { deleteDesignSchema } from "../../../schema/zod/admin-form";
import { z } from "zod";
import { deleteDesign } from "../../../actions/admin/design-actions";
import DesignForm from "./admin-form";
import { useState } from "react";
import DeleteButton from "@/components/delete-button";

type DesignProps = {
  cards: {
    designId: string;
    category: string;
    name: string;
    front_design_url: string;
    thumbnail_url: string;
  }[];
};

export const maxDuration = 30;

const EditDesign = ({ cards }: DesignProps) => {
  const { toast } = useToast();
  const [selectedDesign, setSelectedDesign] = useState<{
    designId: string;
    category: string;
    name: string;
  } | null>(null);

  const form = useForm<z.infer<typeof deleteDesignSchema>>({
    resolver: zodResolver(deleteDesignSchema),
    defaultValues: {
      choose_design: "",
    },
  });

  const onDelete = async (data: z.infer<typeof deleteDesignSchema>) => {
    const formData = new FormData();
    formData.append("choose_design", data.choose_design);
    try {
      const response = await deleteDesign(formData);
      if (response.ok) {
        toast({
          title: response.message,
          description: "All users that create using this design are deleted",
          variant: "success",
        });
      } else {
        toast({
          title: response.message,
          description: "Something went wrong with the delete request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onDelete)}
          className="flex flex-col items-center justify-center gap-2"
        >
          <FormField
            control={form.control}
            name="choose_design"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Design name</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedCard = cards.find(
                      (card) => card.name === value
                    );
                    setSelectedDesign(
                      selectedCard
                        ? {
                            designId: selectedCard.designId,
                            category: selectedCard.category,
                            name: selectedCard.name,
                          }
                        : null
                    );
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designs" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.designId} value={card.name}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedDesign && (
            <DeleteButton
              loading={form.formState.isSubmitting}
              onSubmit={async () =>
                await onDelete({ choose_design: selectedDesign.designId })
              }
            >
              Users who created their card with this design will be deleted as
              well
            </DeleteButton>
          )}
        </form>
      </Form>
      {selectedDesign && (
        <DesignForm design={selectedDesign} formType="update" />
      )}
    </>
  );
};

export default EditDesign;
