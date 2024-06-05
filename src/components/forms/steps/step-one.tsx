"use client";
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
import { LuAsterisk } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getAllDesigns } from "../../../../actions/admin/design-actions";
import { primaryFontsConst, secondaryFontsConst } from "@/lib/constant";
import { cn } from "@/lib/utils";

const StepOne = () => {
  const { data: designs } = useQuery({
    queryKey: ["designs"],
    queryFn: async () => await getAllDesigns(),
  });

  return (
    <>
      <FormField
        name={`design_id`}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="text-2xl font-bold">
              Select your desired design
            </FormLabel>
            <Select
              onValueChange={(value) => {
                const searchParams = new URLSearchParams(
                  window.location.search
                );
                searchParams.set("design_id", value.toString()); // Use 'set' instead of 'append'
                window.history.replaceState(
                  null,
                  "",
                  `${window.location.pathname}?${searchParams}`
                );
                field.onChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your design template" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {designs?.map((design) => (
                  <SelectItem key={design.designId} value={design.designId}>
                    {design.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <h1 className="text-2xl font-bold flex">
        Organizer Informations{" "}
        <span className="text-red-500">
          <LuAsterisk />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <FormField
          name={`bride`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Pengantin Lelaki</FormLabel>
              <FormControl>
                <Input placeholder="Muhammad Syafiq" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`groom`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Pengantin Perempuan</FormLabel>
              <FormControl>
                <Input placeholder="Farah Irdina" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`couple`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Nama Pasangan</FormLabel>
              <FormControl>
                <Input placeholder="Syafiq & Farah" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={`phone_number`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Nombor Telefon</FormLabel>
              <FormControl>
                <Input placeholder="01234567899" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={`father`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Ayah Pengantin</FormLabel>
              <FormControl>
                <Input placeholder="Ayah" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`mother`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Ibu Pengantin</FormLabel>
              <FormControl>
                <Input placeholder="Ibu" {...field} />
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
      </div>

      {/* <h1 className="text-center text-2xl font-bold mt-4">
          Heirs <span className="text-lg">(Waris)</span>{" "}
          <span className="text-sm text-gray-500">-Optional</span>
        </h1>
        <div className="mx-auto w-full p-3 md:w-1/2">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-2 w-full">
                <FormField
                  name={`heirs.${i}.name`}
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-52">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ibu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`heirs.${i}.phone`}
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-52">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0123456789"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`heirs.${i}.relation`}
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-52">
                      <FormLabel>Relation</FormLabel>
                      <FormControl>
                        <Input placeholder="Saudara" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
        </div> */}
    </>
  );
};

export default StepOne;
