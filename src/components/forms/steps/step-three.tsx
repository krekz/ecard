"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { organizerSchema } from "../../../../schema/zod/ecard-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { FaCircleQuestion } from "react-icons/fa6";
import useStore from "@/store/store";

function StepThree() {
  const { qrPreview, setQrPreview, galleryPreview, setGalleryPreview } =
    useStore();
  const qrInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext<z.infer<typeof organizerSchema>>();

  const handleRemoveQrCode = () => {
    setQrPreview(null);
    form.resetField("qrcode");
    if (qrInputRef.current) {
      qrInputRef.current.value = "";
    }
  };

  const handleRemoveAllGallery = () => {
    setGalleryPreview(null);
    form.setValue("wedding_images", []);
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex gap-2 text-2xl font-bold">
        <h1>
          Donation <span className="text-sm text-gray-500">-Optional</span>
        </h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button">
              <FaCircleQuestion />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm font-normal">
                Display your bank details to collect donation (Money gift)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
        <FormField
          name={`acc_name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama akaun</FormLabel>
              <FormControl>
                <Input placeholder="Siti Sharmila" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`bank`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <FormControl>
                <Input placeholder="Maybank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`qrcode`}
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>QR code</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  ref={qrInputRef}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      fieldValues.onChange(file);
                      setQrPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={`acc_number`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombor Akaun</FormLabel>
              <FormControl>
                <Input placeholder="15412876" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {qrPreview && (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={qrPreview}
              className="overflow-hidden scale-125"
              alt="preview"
              width={200}
              height={200}
            />
            <Button variant="destructive" onClick={handleRemoveQrCode}>
              Remove
            </Button>
          </div>
        )}
      </div>

      <FormField
        name={`youtube_url`}
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-x-2 items-center">
              <FormLabel>Youtube URL</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <FaCircleQuestion />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Song to play in your card</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <FormControl>
              <Input
                placeholder="https://www.youtube.com/watch?v=video_id"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={`wedding_images`}
        render={({ field: { value, ...fieldValues } }) => (
          <FormItem>
            <FormLabel>Gallery Photos</FormLabel>
            <FormDescription>You may select up to 3 images.</FormDescription>
            <FormControl>
              <Input
                {...fieldValues}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                ref={galleryInputRef}
                onChange={(event) => {
                  const files = event.target.files;
                  if (files && files.length > 0) {
                    const newFileArray = Array.from(files);
                    const existingFiles =
                      form.getValues("wedding_images") || [];
                    let updatedFiles = [...existingFiles, ...newFileArray];

                    // Ensure only the last 3 files are kept
                    if (updatedFiles.length > 3) {
                      updatedFiles = updatedFiles.slice(-3); // Keep only the last 3 files
                    }

                    form.setValue("wedding_images", updatedFiles);
                    fieldValues.onChange(updatedFiles);

                    setGalleryPreview(
                      updatedFiles
                        .filter((file): file is File => file !== undefined)
                        .map((file) => URL.createObjectURL(file))
                    );
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {galleryPreview && (
        <div className="grid col-span-1 md:grid-cols-3">
          {galleryPreview
            .filter((image) => image !== null)
            .map(
              (image, index) =>
                image && ( // Ensure image is not null before rendering
                  <Image
                    src={image}
                    alt={`preview-${index}`}
                    width={200}
                    height={200}
                    key={index}
                  />
                )
            )}
          <Button variant="destructive" onClick={handleRemoveAllGallery}>
            Remove All
          </Button>
        </div>
      )}
    </>
  );
}

export default StepThree;
