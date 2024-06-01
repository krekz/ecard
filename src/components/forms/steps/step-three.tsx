"use client";
import { cn } from "@/lib/utils";
import { primaryFontsConst, secondaryFontsConst } from "@/lib/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useRef, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { organizerSchema } from "../../../../schema/zod/ecard-form";
import { z } from "zod";
import { LuAsterisk } from "react-icons/lu";

function StepThree() {
  const qrInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext<z.infer<typeof organizerSchema>>();
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<
    (string | null)[] | null
  >(null);

  // console.log(form.watch("wedding_images"));

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
    console.log(form.getValues("wedding_images"));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Donation <span className="text-sm text-gray-500">-Optional</span>
        </h1>
        <p className="text-sm text-gray-500">
          Display your bank details to collect donation (Money gift)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
        <FormField
          name={`acc_name`}
          render={({ field }) => (
            <FormItem className="space-y-0">
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
            <FormItem className="space-y-0">
              <FormLabel>Bank</FormLabel>
              <FormControl>
                <Input placeholder="Maybank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`acc_number`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Nombor Akaun</FormLabel>
              <FormControl>
                <Input placeholder="15412876" type="number" {...field} />
              </FormControl>
              <FormDescription>
                No space or special characters allowed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`qrcode`}
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem className="space-y-0">
              <FormLabel>QR code</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/png"
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
        {qrPreview && (
          <Image src={qrPreview} alt="preview" width={200} height={200} />
        )}
        {qrPreview && (
          <Button variant="destructive" onClick={handleRemoveQrCode}>
            Remove
          </Button>
        )}
      </div>

      <FormField
        name={`youtube_url`}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Youtube URL</FormLabel>
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
        name={`primary_font`}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="flex">Primary font <LuAsterisk color="red" /></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred font" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {primaryFontsConst.map((font, index) => (
                  <SelectItem
                    className={cn("text-xl", font.font.className)}
                    key={index}
                    value={font.id}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`secondary_font`}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="flex">Secondary font <LuAsterisk color="red" /></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred font" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {secondaryFontsConst.map((font, index) => (
                  <SelectItem
                    className={cn("text-xl", font.font.className)}
                    key={index}
                    value={font.id}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={`wedding_images`}
        render={({ field: { value, ...fieldValues } }) => (
          <FormItem className="space-y-0">
            <FormLabel>Gallery Photos</FormLabel>
            <FormDescription>You may select up to 3 images.</FormDescription>
            <FormControl>
              <Input
                {...fieldValues}
                type="file"
                multiple
                accept="image/png"
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

                    console.log("Updated Files", updatedFiles);
                

                    form.setValue("wedding_images", updatedFiles);
                    console.log(
                      "Current Files",
                      form.getValues("wedding_images")
                    );
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
