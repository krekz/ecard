import { LuCalendarDays, LuPhoneCall, LuGift } from "react-icons/lu";
import { HiLocationMarker } from "react-icons/hi";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ContactDrawerContent,
  DonateDrawerContent,
  CalendarDrawerContent,
  LocationDrawerContent,
} from "./drawer-content";
import { CardFormProps } from "@/lib/types";

const Bar = ({ dataFromDB }: CardFormProps) => {
  return (
    <nav className="flex fixed z-50 bottom-5 justify-center w-full">
      <div className="flex justify-center rounded-md max-w-[400px] p-5 bg-black text-center gap-5 text-xs text-white">
        {/* Donation */}
        {dataFromDB?.donation ? (
          <Drawer>
            <DrawerTrigger>
              <div className="flex flex-col items-center cursor-pointer transition-all hover:-translate-y-1 delay-100">
                <LuGift color="white" size={30} className="" />
                <p>Donation</p>
              </div>
            </DrawerTrigger>

            <DrawerContent className="w-[400px] max-w-[415px] mx-auto">
              <div className="flex flex-col items-center max-w-[400px] mx-auto ">
                <DrawerHeader>
                  <DrawerTitle className="text-center">DONATION</DrawerTitle>
                  <DrawerDescription className="text-center">
                    <DonateDrawerContent
                      donation={dataFromDB?.donation ?? {}}
                    />
                  </DrawerDescription>
                </DrawerHeader>
              </div>
            </DrawerContent>
          </Drawer>
        ) : null}

        {/* Calendar */}
        <Drawer>
          <DrawerTrigger>
            <div className="flex flex-col items-center cursor-pointer transition-all hover:-translate-y-1 delay-100">
              <LuCalendarDays color="white" size={30} className="" />
              <p>Calendar</p>
            </div>
          </DrawerTrigger>

          <DrawerContent className="w-[400px] max-w-[415px] mx-auto">
            <div className="flex flex-col items-center max-w-[400px] mx-auto ">
              <DrawerHeader>
                <DrawerTitle className="text-center">Calendar</DrawerTitle>
                <DrawerDescription className="text-center">
                  <CalendarDrawerContent
                    calendar={{
                      date: dataFromDB?.event.date ?? new Date(),
                    }}
                  />
                </DrawerDescription>
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
        {/* Location */}
        <Drawer>
          <DrawerTrigger>
            <div className="flex flex-col items-center cursor-pointer transition-all hover:-translate-y-1 delay-100">
              <HiLocationMarker color="white" size={30} className="" />
              <p>Location</p>
            </div>
          </DrawerTrigger>

          <DrawerContent className="w-[400px] max-w-[415px] mx-auto">
            <div className="flex flex-col items-center max-w-[400px] mx-auto ">
              <DrawerHeader>
                <DrawerTitle className="text-center">LOCATION</DrawerTitle>
                <DrawerDescription className="text-center">
                  <LocationDrawerContent location={dataFromDB?.event ?? {}} />
                </DrawerDescription>
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          {/* Contact */}
          <DrawerTrigger>
            <div className="flex flex-col items-center cursor-pointer transition-all hover:-translate-y-1 delay-100">
              <LuPhoneCall color="white" size={30} className="" />
              <p>Contact</p>
            </div>
          </DrawerTrigger>

          <DrawerContent className="w-[400px] max-w-[415px] mx-auto">
            <div className="flex flex-col items-center max-w-[400px] mx-auto ">
              <DrawerHeader>
                <DrawerTitle className="text-center">CONTACT</DrawerTitle>
                <DrawerDescription className="text-center">
                  <ContactDrawerContent heirs={dataFromDB?.heirs ?? []} />
                </DrawerDescription>
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Bar;
