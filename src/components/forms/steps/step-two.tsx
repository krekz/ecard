"use client";
import { LuAsterisk, LuCalendarCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const StepTwo = () => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");

  return (
    <>
      <h3 className="text-2xl font-bold flex">Location </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <FormField
          name={`venue`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Nama lokasi <LuAsterisk color="red" />
              </FormLabel>
              <FormControl>
                <Input placeholder="Glenmarie Shah Alam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!cardId && (
          <FormField
            name={`date`}
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel className="flex">
                  Tarikh <LuAsterisk color="red" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger disabled={!!cardId} asChild>
                    <FormControl>
                      <Button
                        disabled={!!cardId}
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/L/y")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <LuCalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      required
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          name={`address`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Alamat lokasi <LuAsterisk color="red" />
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Jalan duta blabla" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`google_map`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Link Google Map{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="https://maps.google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name={`greeting`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex">
              Ucapan alu-aluan <LuAsterisk color="red" />
            </FormLabel>
            <FormControl>
              <Textarea className="h-52" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-2 flex-col flex-wrap  ">
        <h3 className="text-2xl font-bold">
          Atur Cara{" "}
          <span className="text-xs text-muted-foreground">(Optional)</span>
        </h3>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-3 items-center justify-start">
            <div className="grid grid-cols-3 gap-2">
              <FormField
                name={`program_name.${index}`}
                render={({ field }) => (
                  <FormItem className="space-y-0  w-full col-span-2">
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input placeholder="Ketibaan Pengantin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`program_time.${index}`}
                render={({ field }) => (
                  <FormItem className="space-y-0  w-full col-span-1">
                    <FormLabel>Waktu</FormLabel>
                    <FormControl>
                      <Input placeholder="08:00 AM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StepTwo;
