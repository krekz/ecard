import React from "react";
import { IconType } from "react-icons";
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
  DefaultDrawerContent,
  ContactDrawerContent,
  DonateDrawerContent,
} from "./drawer-content";

type TNaviElements = {
  Icon: IconType;
  color: string;
  size: number;
  title: string;
  drawerContent: React.ReactNode;
};

type TCommonDrawer = {
  weddingTitle: string;
  weddingDate: string;
};

type TWeddingCalendar = {
  googleCalendar: {
    link: string;
    title: string;
  };
  appleCalendar: {
    link: string;
    title: string;
  };
};

type TWeddingLocation = {
  wazeLocation: {
    link: string;
    title: string;
  },
  googleLocation: {
    link: string;
    title: string;
  },
};

const commonDrawerContent: TCommonDrawer = {
  weddingTitle: "Ain & Hidayat",
  weddingDate: "Sabtu, 20 Februari 2022",
};

const weddingCalendar: TWeddingCalendar = {
  googleCalendar: {
    link: "https://google.com",
    title: "Google Calendar",
  },
  appleCalendar: {
    link: "https://apple.com",
    title: "Apple Calendar",
  },
};

const weddingLocation: TWeddingLocation = {
  wazeLocation: {
    link: "https://waze.com",
    title: "Waze",
  },
  googleLocation: {
    link: "https://maps.google.com",
    title: "Google Maps",
  },
};

const naviElements: TNaviElements[] = [
  {
    Icon: LuGift,
    color: "white",
    size: 30,
    title: "Donation",
    drawerContent: <DonateDrawerContent />,
  },
  {
    Icon: LuCalendarDays,
    color: "white",
    size: 30,
    title: "Calendar",
    drawerContent: (
      <DefaultDrawerContent {...commonDrawerContent} {...weddingCalendar} />
    ),
  },
  {
    Icon: HiLocationMarker,
    color: "white",
    size: 30,
    title: "Location",
    drawerContent: (
      <DefaultDrawerContent {...commonDrawerContent} {...weddingLocation} />
    ),
  },
  {
    Icon: LuPhoneCall,
    color: "white",
    size: 30,
    title: "Contact",
    drawerContent: <ContactDrawerContent />,
  },
];

const Bar = () => {
  return (
    <nav className="flex fixed z-50 bottom-5 justify-center w-full">
      <div className="flex justify-center rounded-md max-w-[400px] p-5 bg-black text-center gap-10 text-xs text-white">
        {naviElements.map(
          ({ Icon, color, size, title, drawerContent }, index) => (
            <Drawer  key={index}>
              <DrawerTrigger>
                <div className="flex flex-col items-center cursor-pointer transition-all hover:-translate-y-1 delay-100">
                  <Icon color={color} size={size} className="" />
                  <p>{title}</p>
                </div>
              </DrawerTrigger>

              <DrawerContent className="w-[400px] max-w-[415px] mx-auto">
                <div className="flex flex-col items-center max-w-[400px] mx-auto ">
                  <DrawerHeader>
                    <DrawerTitle className="text-center">
                      {title.toUpperCase()}
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                      {drawerContent}
                    </DrawerDescription>
                  </DrawerHeader>
                </div>
              </DrawerContent>
            </Drawer>
          )
        )}
      </div>
    </nav>
  );
};

export default Bar;
