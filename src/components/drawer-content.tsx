import { Button } from "./ui/button";
import {
  AiFillGoogleCircle,
  AiFillApple,
  AiOutlineWhatsApp,
  AiOutlinePhone,
} from "react-icons/ai";

import Link from "next/link";
import Image from "next/image";

type Calendar = {
    link: string;
    title: string;
  };
  
  type Location = {
    link: string;
    title: string;
  };
  
  type DefaultDrawerContentProps = {
    weddingTitle: string;
    weddingDate: string;
    googleCalendar?: Calendar;
    appleCalendar?: Calendar;
    wazeLocation?: Location;
    googleLocation?: Location;
  };
  

function DefaultDrawerContent({
  weddingTitle,
  weddingDate,
  ...rest
}: DefaultDrawerContentProps) {
  return (
    <>
      <div className="mt-1 \">
        <h1 className="font-bold text-md">{weddingTitle}</h1>
        <p className="font-light">{weddingDate}</p>
        <div className="mt-2 flex flex-col gap-1 w-full md:w-[250px]">
          <Button asChild>
            <Link
              target="_blank"
              href={rest.appleCalendar?.link ?? rest.wazeLocation?.link ?? ""}
            >
              {rest.appleCalendar?.title || rest.wazeLocation?.title}
            </Link>
          </Button>
          <Button asChild>
            <Link
              target="_blank"
              href={rest.googleCalendar?.link ?? rest.googleLocation?.link ?? ""}
            >
              {rest.googleCalendar?.title || rest.googleLocation?.title}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

type TContact = {
  name: string;
  relative: string;
  phone: number;
  phoneLink: string;
  whatsappLink: string;
};

const Contact: TContact[] = [
  {
    name: "Ali",
    relative: "Ibu Saudara",
    phone: 8123456789,
    phoneLink: "tel:+8123456789",
    whatsappLink: "https://wa.me/628123456789",
  },
  {
    name: "Siti",
    relative: "Ibu Saudara",
    phone: 8123456789,
    phoneLink: "tel:+8123456789",
    whatsappLink: "https://wa.me/628123456789",
  },
  {
    name: "Kasim",
    relative: "Ibu Saudara",
    phone: 8123456789,
    phoneLink: "tel:+8123456789",
    whatsappLink: "https://wa.me/628123456789",
  },
];

function ContactDrawerContent() {
  return (
    <>
      {Contact.map((contact, index) => (
        <div
          key={index}
          className="mt-1 flex p-5 border rounded-md max-w-[400px] w-[350px] justify-between shadow-md"
        >
          <div className="flex flex-col">
            <h1 className="font-bold text-md">{contact.name}</h1>
            <p className="font-light text-xs">{contact.relative}</p>
          </div>

          <div className="flex gap-2">
            <Link target="_blank" href={contact.whatsappLink}>
              <AiOutlineWhatsApp size={30} color="green" />
            </Link>
            <Link target="_blank" href={contact.phoneLink}>
              <AiOutlinePhone size={30} color="blue" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

function DonateDrawerContent() {
  return (
    <>
      <h1>MUHAMMAD KHAIRUL FITRI BIN ROSLAN </h1>
      <h2>Maybank</h2>
      <h3>1234567890</h3>
      <Image
        src={"/qrcode.jpg"}
        alt="QrCode"
        width={100}
        height={100}
        className="mx-auto rounded-lg"
      />
    </>
  );
}

export { DefaultDrawerContent, ContactDrawerContent, DonateDrawerContent };
