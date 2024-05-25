

// Catalog Page
//Filter by section
export const checkboxList = [
  {
    id: "wedding",
    label: "Wedding (5)",
  },
  {
    id: "celebration",
    label: "Celebration (5)",
  },
];

//Card Item Section
export interface CardItem {
  id: string;
  title: string;
  category: "Wedding" | "Celebration";
  image: string;
  width: number;
  height: number;
  alt: string;
  isPopular: boolean;
  isNewest: boolean;
}

export const cardList: CardItem[] = [
  {
    id: "wed-1",
    title: "WED-1",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
  {
    id: "wed-2",
    title: "WED-2",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,
  },
  {
    id: "wed-3",
    title: "WED-3",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,
  },
  {
    id: "wed-4",
    title: "WED-4",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
  {
    id: "wed-5",
    title: "WED-5",
    category: "Wedding",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: true,
  },
  {
    id: "wed-6",
    title: "RAY-6",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: true,
  },
  {
    id: "7",
    title: "RAY-7",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: true,
  },
  {
    id: "8",
    title: "RAY-8",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: true,
    isNewest: false,
  },
  {
    id: "9",
    title: "RAY-9",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
  {
    id: "10",
    title: "RAY-10",
    category: "Celebration",
    image: "/modern-design.svg",
    width: 200,
    height: 100,
    alt: "test",
    isPopular: false,
    isNewest: false,
  },
];
// End of Catalog Page

// Pricing Page
import { LuCheck, LuX } from "react-icons/lu";
import { IconType } from "react-icons/lib";

interface PlanItem {
  name: string;
  price: string;
  defaultStyling: string;
  features: FeatureItem[];
}

interface FeatureItem {
  feature: string;
  included: boolean;
  icon: React.ReactElement<IconType>;
}

export const subscriptionPlans: PlanItem[] = [
  {
    name: "Basic",
    price: "RM30",
    defaultStyling: "shadow-md",
    features: [
      { feature: "Music", included: true, icon: <LuCheck /> },
      { feature: "Donation", included: true, icon: <LuCheck /> },
      { feature: "Calendar", included: true, icon: <LuCheck /> },
      { feature: "Location", included: true, icon: <LuCheck /> },
      { feature: "Contact", included: true, icon: <LuCheck /> },
      { feature: "RSVP", included: false, icon: <LuX /> },
      { feature: "Gift", included: false, icon: <LuX /> },
    ],
  },
  {
    name: "Premium",
    price: "RM50",
    defaultStyling:
      "border-yellow-400 border-4 scale-105 before:content-['RECOMMENDED'] before:bg-yellow-400 before:text-center before:w-1/2 before:mx-auto before:rounded-lg before:py-1 before:text-white before:font-bold",
    features: [
      { feature: "Music", included: true, icon: <LuCheck /> },
      { feature: "Gallery", included: true, icon: <LuCheck /> },
      { feature: "Donation", included: true, icon: <LuCheck /> },
      { feature: "Calendar", included: true, icon: <LuCheck /> },
      { feature: "Location", included: true, icon: <LuCheck /> },
      { feature: "Contact", included: true, icon: <LuCheck /> },
      { feature: "RSVP", included: true, icon: <LuCheck /> },
      { feature: "Gift", included: true, icon: <LuCheck /> },
    ],
  },
];

// End of Pricing Page

// fonts
import * as f from "@/components/fonts";
import { TFonts } from "./types";

export const secondaryFontsConst: TFonts[] = [
  {
    id: "cormorant_garamond",
    name: "Cormorant Garamond",
    font: {
      className: f.cormorant_garamond.className,
      style: f.cormorant_garamond.style,
    },
  },
  {
    id: "cinzel",
    name: "Cinzel",
    font: {
      className: f.cinzel.className,
      style: f.cinzel.style,
    },
  },
  {
    id: "life_savers",
    name: "Life Savers",
    font: {
      className: f.life_savers.className,
      style: f.life_savers.style,
    },
  },
  {
    id: "oregano",
    name: "Oregano",
    font: {
      className: f.oregano.className,
      style: f.oregano.style,
    },
  },
  {
    id: "alice",
    name: "Alice",
    font: {
      className: f.alice.className,
      style: f.alice.style,
    },
  },
  {
    id: "proza_libre",
    name: "Proza Libre",
    font: {
      className: f.proza_libre.className,
      style: f.proza_libre.style,
    },
  },
  {
    id: "poppins",
    name: "Poppins",
    font: {
      className: f.poppins.className,
      style: f.poppins.style,
    },
  },
  {
    id: "roboto",
    name: "Roboto",
    font: {
      className: f.roboto.className,
      style: f.roboto.style,
    },
  },
  {
    id: "lato",
    name: "Lato",
    font: {
      className: f.lato.className,
      style: f.lato.style,
    },
  },
];

export const primaryFontsConst: TFonts[] = [
  {
    id: "euphoria_script",
    name: "Euphoria Script",
    font: {
      className: f.euphoria_script.className,
      style: f.euphoria_script.style,
    },
  },
  {
    id: "style_script",
    name: "Style Script",
    font: {
      className: f.style_script.className,
      style: f.style_script.style,
    },
  },
  {
    id: "oleo_script_swash_caps",
    name: "Oleo Script Swash Caps",
    font: {
      className: f.oleo_script_swash_caps.className,
      style: f.oleo_script_swash_caps.style,
    },
  },
  {
    id: "vujahday_script",
    name: "Vujahday Script",
    font: {
      className: f.vujahday_script.className,
      style: f.vujahday_script.style,
    },
  },
  {
    id: "meow_script",
    name: "Meow Script",
    font: {
      className: f.meow_script.className,
      style: f.meow_script.style,
    },
  },
];

export const weekday = [
  "Ahad",
  "Isnin",
  "Selasa",
  "Rabu",
  "Khamis",
  "Jumaat",
  "Sabtu",
];