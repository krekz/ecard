import { Button } from "@/components/ui/button";
import {
  AiFillGoogleCircle,
  AiFillApple,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineGoogle,
} from "react-icons/ai";

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "../ui/calendar";

type ContactProp = {
  contact: {
    phone_number?: string;
  };
};

export function ContactDrawerContent({ contact }: ContactProp) {
  const generateWhatsappLink = (phone: string) => {
    return `https://wa.me/${phone}`;
  };
  return (
    <>
      <div className="mt-1 flex p-5 border rounded-md max-w-[400px] w-[350px] justify-between shadow-md">
        <div className="flex flex-col">
          <h1 className="font-bold text-md">Pengantin</h1>
        </div>

        <div className="flex gap-2">
          <Link
            target="_blank"
            href={generateWhatsappLink(contact?.phone_number ?? "")}
          >
            <AiOutlineWhatsApp size={30} color="green" />
          </Link>
          {/* <Link target="_blank" href={contact.phoneLink}>
          <AiOutlinePhone size={30} color="blue" />
        </Link> */}
        </div>
      </div>
    </>
  );
}

type DonateDrawerContentProps = {
  donation: {
    id?: number;
    acc_name?: string | null;
    bank?: string | null;
    acc_number?: string | null;
    qrCode?: string | null;
  };
};
export function DonateDrawerContent({ donation }: DonateDrawerContentProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-lg">{donation.acc_name}</p>
        <p className="text-md p-1 bg-purple-200 rounded-md">{donation.bank}</p>
        <p className="text-md">{donation.acc_number}</p>
      </div>
      <Image
        src={`https://bkduabhaudrkgjloqnck.supabase.co/storage/v1/object/public/e-card%20bucket/${donation.qrCode}`}
        alt="QrCode"
        width={300}
        height={300}
        className="mx-auto rounded-lg  max-w-[300px] max-h-[300px]"
      />
    </>
  );
}

type CalendarProps = {
  date: Date;
};
export function CalendarDrawerContent({
  calendar,
}: {
  calendar: CalendarProps;
}) {
  return (
    <>
      {/*  BUG */}
      <Calendar
        mode="single"
        disabled
        selected={calendar.date}
        className="rounded-md border"
      />
      <span className="p-5 font-semibold">
        {new Date(calendar.date).toDateString()}
      </span>
    </>
  );
}

type LocationProps = {
  location: {
    venue?: string;
    gMap?: string | null;
    address?: string;
  };
};

export function LocationDrawerContent({ location }: LocationProps) {
  return (
    <>
      <h1 className="text-2xl font-bold">{location?.venue}</h1>
      <h3 className="text-lg">{location?.address}</h3>
      {location?.gMap && (
        <Button>
          <Link target="_blank" className="flex text-xl gap-2 items-center justify-center" href={location?.gMap}>
            View Map
            <AiFillGoogleCircle size={30} />
          </Link>
        </Button>
      )}
    </>
  );
}
