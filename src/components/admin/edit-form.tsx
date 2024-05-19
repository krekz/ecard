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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { editDesignSchema } from "../../../schema/zod/admin-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { deleteDesign } from "../../../actions/admin-actions";
import DesignForm from "./admin-form";
import { useEffect, useState } from "react";

type DesignProps = {
  cards: {
    designId: string;
    category: string;
    name: string;
    front_design_url: string;
    thumbnail: string;
  }[];
};
const EditDesign = ({ cards }: DesignProps) => {
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const form = useForm<z.infer<typeof editDesignSchema>>({
    resolver: zodResolver(editDesignSchema),
    defaultValues: {
      choose_design: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof editDesignSchema>) => {
    const formData = new FormData();
    formData.append("choose_design", data.choose_design);
    try {
      await deleteDesign(formData);
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
                    selectedCard ? selectedCard.designId : null
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

        {selectedDesign && <DesignForm />}
        {selectedDesign && (
          <Button variant="destructive" type="submit">
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
};

export default EditDesign;
