import { Button } from "@/components/ui/button";
import {
  AiFillGoogleCircle,
  AiFillApple,
  AiOutlineWhatsApp,
  AiOutlinePhone,
} from "react-icons/ai";

import Link from "next/link";
import Image from "next/image";

type ContactProp = {
  heirs: {
    name?: string;
    phone_number?: string;
    relationship?: string;
  }[];
};

export function ContactDrawerContent({ heirs }: ContactProp) {
  const generateWhatsappLink = (phone: string) => {
    return `https://wa.me/${phone}`;
  };
  return (
    <>
      {heirs.map((heir, index) =>
        heir.name !== "" ||
        heir.relationship !== "" ||
        heir.phone_number !== "" ? (
          <div
            key={index}
            className="mt-1 flex p-5 border rounded-md max-w-[400px] w-[350px] justify-between shadow-md"
          >
            <div className="flex flex-col">
              <h1 className="font-bold text-md">{heir.name}</h1>
              <p className="font-light text-xs">{heir.relationship}</p>
            </div>

            <div className="flex gap-2">
              <Link
                target="_blank"
                href={generateWhatsappLink(heir.phone_number ?? "")}
              >
                <AiOutlineWhatsApp size={30} color="green" />
              </Link>
              {/* <Link target="_blank" href={contact.phoneLink}>
          <AiOutlinePhone size={30} color="blue" />
        </Link> */}
            </div>
          </div>
        ) : null
      )}
    </>
  );
}

type DonateDrawerContentProps = {
  donation: {
    id?: number;
    name?: string;
    bank?: string;
    accountNo?: string;
    qrCode?: string;
  };

};
export function DonateDrawerContent({ donation}: DonateDrawerContentProps) {
  return (
    <>
      <h1>{donation.name}</h1>
      <h2>{donation.bank}</h2>
      <h3>{donation.accountNo}</h3>
      <Image
        src={`https://bkduabhaudrkgjloqnck.supabase.co/storage/v1/object/public/e-card%20bucket/${donation.qrCode}`}
        alt="QrCode"
        width={100}
        height={100}
        className="mx-auto rounded-lg"
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
      <h1>{new Date(calendar.date).toDateString()}</h1>
    </>
  );
}

type LocationProps = {
  location: {
    venue?: string | undefined;
    gMap?: string | undefined;
    address?: string | undefined;
  };
};

export function LocationDrawerContent({ location }: LocationProps) {
  return (
    <>
      <h1>{location?.venue}</h1>
      <h2>{location?.gMap}</h2>
      <h3>{location?.address}</h3>
    </>
  );
}
