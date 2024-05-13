"use client";
import {format} from "date-fns-tz";
import Bar from "@/components/Ecards/card-navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HiCalendar, HiOutlineClock, HiLocationMarker } from "react-icons/hi";
import CardCarousel from "@/components/Ecards/card-carousel";
import { CardFormProps } from "@/lib/types";
import Countdown from "./countdown";
import { getFont } from "@/lib/utils";

const ECard = ({ dataFromDB }: CardFormProps) => {

  if (!dataFromDB) return null;
  const { event, donation, images, heirs, Design,primary_font } = dataFromDB;
//  const zoneDate = toZonedTime(event.date, 'Asia/Kuala_Lumpur')

  const weekday = [
    "Ahad",
    "Isnin",
    "Selasa",
    "Rabu",
    "Khamis",
    "Jumaat",
    "Sabtu",
  ];


  const getPrimaryFont = getFont(dataFromDB.primary_font);
  const getSecondaryFont = getFont(dataFromDB.secondary_font)
  return (
    <main className={cn("relative", getPrimaryFont?.font.className)}>
      <section className="relative h-screen max-w-[400px] mx-auto flex justify-center">
        <Image
          src={"/design2.jpg"}
          alt={"background"}
          layout="fill"
          objectFit="cover"
          className="-z-10"
        />
        <div className="flex flex-col gap-5 items-center justify-center z-10 text-sm">
          <h1 className="text-2xl font-bold">WALIMATUL URUS</h1>
          <div
            className={cn(
              "flex flex-col text-center text-5xl font-medium",
              getSecondaryFont?.font.className
            )}
          >
            <h1>
              {dataFromDB?.couple
                ? dataFromDB.couple.charAt(0).toUpperCase() +
                  dataFromDB.couple.slice(1).trim().split("&")[0]
                : ""}
            </h1>
            <span className="text-3xl">&</span>
            <h1>
              {dataFromDB?.couple
                ? dataFromDB.couple
                    .trim()
                    .split("&")[1]
                    .charAt(0)
                    .toUpperCase() +
                  dataFromDB.couple.trim().split("&")[1].slice(1)
                : ""}
            </h1>
          </div>
          <h3></h3>
        </div>
      </section>

      {/* Card Content */}
      <section className="relative min-h-screen max-w-[400px] mx-auto overflow-hidden pb-32">
        <div
          className="absolute inset-0 object-cover"
          style={{
            backgroundImage: `url(/hero4.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="relative mt-10 flex flex-col gap-5 mx-auto items-center h-full max-w-72 text-center">
          <h1 className="text-2xl font-semibold">
            Assalamualaikum WBT & Salam sejahtera
          </h1>

          <div className="flex flex-col text-2xl font-light">
            <h1>{dataFromDB?.father}</h1>
            <span>&</span>
            <h1>{dataFromDB?.mother}</h1>
          </div>

          <p className="text-md font-normal">{dataFromDB?.event.greeting}</p>

          <div className="flex flex-col  text-2xl font-medium italic  p-3 rounded-md bord bg-red-100/50 w-[350px]">
            <h1>{dataFromDB?.bride}</h1>
            <span>&</span>
            <h1>{dataFromDB?.groom}</h1>
          </div>

          <div className="flex flex-col items-center">
            <HiCalendar size={25} />
            <h2 className="text-amber-700 text-2xl">
              {event.date
                ? weekday[new Date(event.date).getDay()] +
                  ", " +
                  format(event.date, "dd/L/y")
                : ""}
            </h2>
          </div>
          {/* KIV */}
          <div className="flex flex-col items-center">
            <HiOutlineClock size={25} />
            <h2 className="text-amber-700 text-2xl">11.00 a.m - 4.00 p.m</h2>
          </div>

          <div className="flex flex-col items-center">
            <HiLocationMarker size={25} />
            <h2 className="text-amber-700 text-2xl">{event.venue}</h2>
            <p className="font-light text-base">{event.address}</p>
          </div>
          {/* KIV */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-amber-700 text-2xl">Atur Cara Majlis</h2>
            <div className="flex flex-col items-center font-light text-base">
              <p>Jamuan Makan:</p>
              <p>11.00 a.m - 1.00 p.m</p>
            </div>
            <div className="flex flex-col items-center font-light text-base">
              <p>Ketibaan Pengantin:</p>
              <p>12.30 Tengahari</p>
            </div>
          </div>

          <Countdown event_date={event.date} secondary_font={getSecondaryFont} />

          <CardCarousel />
        </div>
      </section>
      <Bar dataFromDB={dataFromDB} />
    </main>
  );
};

export default ECard;
