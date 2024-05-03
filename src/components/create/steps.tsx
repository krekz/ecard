import { Textarea } from "@/components/ui/textarea";
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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LuCalendarCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

// STEP 1

const StepOne = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Majlis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-md">
        <FormField
          name={`bride`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Bride&apos;s Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Muhammad Syafiq..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`groom`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Groom&apos;s Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Liya Syamila..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`couple`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Couple&apos;s short name</FormLabel>
              <FormControl>
                <Input placeholder="Syafiq & Mila" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name={`phone_number`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="01234567899" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <FormField
          name={`father`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Father&apos;s Full Name</FormLabel>
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
              <FormLabel>Mother&apos;s Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Ibu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">
        Waris <span className="text-sm text-gray-500">-Optional</span>
      </h1>
      <div className="border rounded-md p-2 w-full md:w-1/2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-2">
              <FormField
                name={`heirs.${i}.name`}
                render={({ field }) => (
                  <FormItem className="space-y-0 w-full">
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
                  <FormItem className="space-y-0 w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`heirs.${i}.relation`}
                render={({ field }) => (
                  <FormItem className="space-y-0 w-full">
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
      </div>
    </>
  );
};

// STEP 2
const StepTwo = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Location</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div className="border rounded-md p-3">
          <FormField
            name={`event.venue`}
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
            name={`event.address`}
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
            name={`event.gMap`}
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
            name={`event.date`}
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

          <FormField
            name={`event.time`}
            render={({ field }) => (
              <FormItem className="space-y-0 w-1/2">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="12:00 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        name={`event.greeting`}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Greeting</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Dijemput tuan puan untuk hadir ke majlis kami hari selasa ni ye"
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

function StepThree() {
  const {register} = useFormContext();
  const fileRef = register(`donation.qrcode`); // file ref for upload image

  return (
    <>
      <h1 className="text-2xl font-bold">
        Bank Details <span className="text-sm text-gray-500">-Optional</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
        <FormField
          name={`donation.name`}
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
          name={`donation.bank`}
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
          name={`donation.accountNo`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Account No.</FormLabel>
              <FormControl>
                <Input placeholder="15412876" {...field} />
              </FormControl>
              <FormDescription>
                No space or special characters allowed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`donation.qrcode`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>QR code</FormLabel>
              <FormControl>
                <Input type="text" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        name={`youtubeURL`}
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
      {/* <FormField
        name={`donation.name`}
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
                <SelectItem value="font1">Font 1</SelectItem>
                <SelectItem value="font2">Font 2</SelectItem>
                <SelectItem value="font3">Font 3</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />*/}
      <FormField
        name={`donation.name`}
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
                <SelectItem value="font1">Font 1</SelectItem>
                <SelectItem value="font2">Font 2</SelectItem>
                <SelectItem value="font3">Font 3</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      /> 




    </>
  );
}

export { StepOne, StepTwo, StepThree };

