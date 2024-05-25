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
import { useState } from "react";
import Image from "next/image";

function StepThree() {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <>
      <h1 className="text-2xl font-bold">
        Bank Details <span className="text-sm text-gray-500">-Optional</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
        <FormField
          name={`acc_name`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Account Holder</FormLabel>
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
              <FormLabel>Bank Name</FormLabel>
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
              <FormLabel>Account No.</FormLabel>
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
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      fieldValues.onChange(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {preview && (
          <Image src={preview} alt="preview" width={200} height={200} />
        )}
        {preview && <Button onClick={() => setPreview(null)}>Remove</Button>}
        {/* <input type="file" {...register(`donation.qrcode`)} /> */}
      </div>

      {/* <FormField
          name={`donation.name`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Gallery</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormDescription>Upload up to (5) images</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
            <FormLabel>Primary font</FormLabel>
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
            <FormLabel>Secondary font</FormLabel>
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
    </>
  );
}

export default StepThree;
