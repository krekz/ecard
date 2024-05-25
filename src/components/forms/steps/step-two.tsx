
import { LuCalendarCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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


const StepTwo = () => {
    return (
      <>
        <h1 className="text-2xl font-bold">Location</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div className="p-3">
            <FormField
              name={`venue`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Glenmarie Shah Alam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`address`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Address</FormLabel>
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
                <FormItem className="space-y-0">
                  <FormLabel>Google Map link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://maps.google.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row md:flex-col gap-2">
            <FormField
              name={`date`}
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[150px] md:w-[240px] pl-3 text-left font-normal",
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
  
            {/* <FormField
              name={`event.start_time`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">Start time</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`event.end_time`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">End time</FormLabel>
                  <FormControl>
                    <TimePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
  
            {/* <RHFInput
              as={<TimePicker.RangePicker format={"HH:mm a"} />}
              type="input"
              register={register}
              name="event.start_time"
              setValue={setValue}
            /> */}
          </div>
        </div>
  
        <FormField
          name={`greeting`}
          render={({ field }) => (
            <FormItem className="space-y-0  w-full">
              <FormLabel>Greeting</FormLabel>
              <FormControl>
                <Textarea
                  className="h-52"
                  placeholder="Dengan penuh kesyukuran kehadrat Illahi, kami mempersilakan Dato'/Datin/Dr/Tuan/Puan/Encik/Cik ke walimatulurus anakanda kesayangan kami"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  };
  
  export default StepTwo