"use client";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { organizerSchema } from "../../../schema/zod/ecard-form";
import { useSearchParams } from "next/navigation";
import { cn, formatDate, getFont } from "@/lib/utils";
import { euphoria_script, poppins } from "../fonts";
import { weekday } from "@/lib/constant";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type TDesign = {
  designId?: string;
  front_design_url?: string;
};

const CardFormPreview = () => {
  const [design, setDesign] = useState<TDesign | undefined>();
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const design_params = params.get("design_id");
  const form = useFormContext<z.infer<typeof organizerSchema>>();
  const primary_font = getFont(form?.watch("primary_font"));
  const secondary_font = getFont(form?.watch("secondary_font"));

  const dateString = form?.watch("date");
  const checkDate = dateString ? new Date(dateString) : new Date();
  const getDate = formatDate(checkDate);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/designs/${design_params}`
        );
        const data = await response.json();
        setDesign(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [design_params]);

  return (
    <>
      <div className="relative space-y-4 text-center mx-auto">
        <div className="rounded-lg">
          <h1 className="text-3xl font-bold">Preview</h1>
        </div>
        {/* <Image src="/template.png" alt="template" width={500} height={500} /> */}
        <Image
          //   className="absolute top-[5.5rem] left-[9.3rem] rounded-2xl h-[26.6rem]"
          className="rounded-2xl ring-8 ring-black w-40 h-80 "
          src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${design?.front_design_url}`}
          alt="design"
          width={100}
          height={100}
          priority
        />
        <div
          className={cn(
            ` text-2xl absolute max-w-36 top-[28%] break-words mx-auto transform -translate-x-1/2 left-1/2 flex flex-col ${euphoria_script.className}`,
            primary_font?.font.className
          )}
        >
          <h2>{form?.watch("couple").split("&")[0] || "NAME"}</h2>
          <span>&</span>
          <h2>{form?.watch("couple").split("&")[1] || "NAME"}</h2>
          <p className={cn(`mt-5 text-xs`, secondary_font?.font.className)}>
            {" "}
            {weekday[checkDate.getDay()] + " " + getDate}
          </p>
        </div>
        <h2 className="mt-5 font-bold text-2xl">
          {design_params?.toUpperCase()}
        </h2>
      </div>
    </>
  );
};

export default CardFormPreview;
