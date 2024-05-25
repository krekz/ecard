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

const StepOne = () => {
  // if (typeof design !== "string" || design.trim() === "") {
  //   throw new Error("Design parameter is required");
  // }

  // const allowedDesigns = ["wed-1", "wed-2", "wed-3"]; // Example allowed values
  // if (!allowedDesigns.includes(design)) {
  //   throw new Error("Invalid design parameter");
  // }

  // TODO: FETCH ALL DESINGS
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
                <SelectItem value="wed-1">WED-1</SelectItem>
                <SelectItem value="wed-2">WED-2</SelectItem>
                <SelectItem value="wed-3">WED-3</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <h1 className="text-2xl font-bold">Organizer Informations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
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
                <Input placeholder="01234567899" type="number" {...field} />
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
