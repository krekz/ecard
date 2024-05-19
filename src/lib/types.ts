import { User } from "next-auth";
import { NextFont } from "next/dist/compiled/@next/font";

export type TOrganizers = {
  father: string;
  mother: string;
  bride: string;
  groom: string;
  couple: string;
  phone_number: string;
  heirs?: {
    name?: string;
    phone?: string;
    relation?: string;
  }[];
  name?: string;
  account?: string;
};

export type CardFormProps = {
  dataFromDB?: {
    id: string;
    father: string;
    mother: string;
    bride: string;
    groom: string;
    couple: string;
    phone_number: string;
    youtubeURL?: string;
    designId: string;
    primary_font: string;
    secondary_font : string;
    images: string;
    // plan: string;
    heirs: {
      id: number;
      name: string;
      phone: string;
      relation: string;
    }[];
    donation: {
      id: number;
      name?: string;
      bank?: string;
      accountNo?: string;
      qrcode?: string;
    };
    event: {
      id: number;
      dateShort: Date;
      date: Date;
      address: string;
      gMap: string;
      start_time:string;
      end_time:string;
      venue: string;
      greeting: string;
    };
    Design: {
      designId : string;
      category: string;
      name :string;
      front_design_url: string;
      content_design_url: string;
    }
  };

  user?: User | undefined


};

export type TFonts = {
  id: string;
  font: NextFont;
  name: string;
};