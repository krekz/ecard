"use client";
import Bar from "@/components/Ecards/card-navbar";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import { HiCalendar, HiLocationMarker } from "react-icons/hi";
import CardCarousel from "@/components/Ecards/card-carousel";
import { CardFormProps } from "@/lib/types";
import Countdown from "./countdown";
import { getFont } from "@/lib/utils";
import { weekday } from "@/lib/constant";
import { LuGlobe, LuHeart, LuInstagram } from "react-icons/lu";
import Link from "next/link";
import YouTubePlayer from "./youtube-player";
import { motion } from "framer-motion";
import { Url } from "next/dist/shared/lib/router/router";

const ECard = ({
  dataFromDB,
  demoDesign,
}: CardFormProps & {
  demoDesign?: { front_design_url: string; content_design_url: string } | null;
}) => {
  if (!dataFromDB) return null;
  const { event } = dataFromDB;
  const youtubeID = dataFromDB.youtube_url?.includes("youtube.com/watch?")
    ? dataFromDB.youtube_url?.split("v=")[1]?.split("&")[0]
    : dataFromDB.youtube_url?.includes("youtu.be/")
    ? dataFromDB.youtube_url?.split("/").pop()?.split("?")[0]
    : null;
  const checkDate = event?.date ? new Date(event.date) : new Date();
  const getDate = formatDate(checkDate);

  const getPrimaryFont = getFont(dataFromDB.primary_font);
  const getSecondaryFont = getFont(dataFromDB.secondary_font);
  return (
    <main className={cn("relative", getSecondaryFont?.font.className)}>
      <section className="relative h-screen max-w-[400px] mx-auto flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${
            demoDesign
              ? demoDesign.front_design_url
              : dataFromDB.Design?.front_design_url
          }`}
          alt={"background"}
          width={415}
          height={1000}
          priority
          loading="eager"
          className="-z-10 absolute"
        />
        <div className="flex flex-col gap-5 items-center justify-center z-10 text-sm">
          <h1 className="text-2xl font-bold">WALIMATUL URUS</h1>
          <div
            className={cn(
              "flex flex-col text-center text-5xl font-medium",
              getPrimaryFont?.font.className
            )}
          >
            {/* couple name */}
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
          <h3 className="text-lg font-light">
            {weekday[checkDate.getDay()].toUpperCase() + " " + getDate}
          </h3>
        </div>
      </section>

      {/* Card Content */}
      <section className="relative min-h-screen max-w-[400px] mx-auto overflow-hidden pb-32">
        <div
          className="absolute inset-0 object-cover"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${
              demoDesign
                ? demoDesign.content_design_url
                : dataFromDB.Design?.content_design_url
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="relative mt-10 flex flex-col gap-5 mx-auto items-center h-full max-w-72 text-center">
          {/* Ucapan salam */}
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-2xl font-semibold"
          >
            Assalamualaikum WBT & Salam sejahtera
          </motion.h1>

          {/* Nama ibubapa / parents */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col text-2xl font-light"
          >
            <h1>{dataFromDB?.father}</h1>
            <span>&</span>
            <h1>{dataFromDB?.mother}</h1>
          </motion.div>

          {/* Ucapan alu-aluan / greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-md font-normal"
          >
            {dataFromDB?.event?.greeting}
          </motion.p>

          {/* Pasangan / couple */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col  text-2xl font-medium italic  p-3 rounded-md bord bg-red-100/50 w-[350px]"
          >
            <h1>{dataFromDB?.bride}</h1>
            <span>&</span>
            <h1>{dataFromDB?.groom}</h1>
          </motion.div>

          {/* Tarikh Majlis */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <HiCalendar size={25} />
            <h2 className="text-amber-700 text-2xl">
              {weekday[checkDate.getDay()].charAt(0).toUpperCase() +
                weekday[checkDate.getDay()].slice(1) +
                " " +
                getDate}
            </h2>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <HiLocationMarker size={25} />
            <h2 className="text-amber-700 text-2xl">{event?.venue}</h2>
            <p className="font-light text-base">{event?.address}</p>
          </motion.div>

          {/* Atur cara majlis */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            {event?.program &&
            event.program.every(
              (programItem) =>
                programItem.name === null && programItem.start_time === null
            ) ? null : (
              <h2 className="text-amber-700 text-2xl">Atur Cara Majlis</h2>
            )}
            {event?.program?.map((programItem, index) =>
              programItem.name !== null ? (
                <div
                  key={index}
                  className="flex flex-col items-center font-light text-base"
                >
                  <p>{programItem.name}:</p>
                  <p>{programItem.start_time}</p>
                </div>
              ) : null
            )}
          </motion.div>
          {/* Countdown */}
          <Countdown event_date={event?.date} primary_font={getPrimaryFont} />
          {/* Card Carousel */}
          {dataFromDB.images && dataFromDB.images.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Gallery Photos</h1>
              <CardCarousel images={dataFromDB.images} />
            </>
          )}
          {/* YT video */}
          {dataFromDB.youtube_url && youtubeID && (
            <YouTubePlayer videoId={youtubeID} />
          )}
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <p className="text-3xl">
              #
              {dataFromDB?.couple
                ? dataFromDB.couple.split("&")[0].trim() +
                  dataFromDB.couple.split("&")[1].trim()
                : ""}
            </p>
            <div className="flex flex-col items-center p-3">
              <p className="flex gap-1 text-md font-light">
                <LuHeart size={20} fill="purple" color="purple" />
                <Link
                  className="cursor-pointer underline"
                  href={process.env.NEXT_PUBLIC_WEB_URL as Url}
                >
                  Tea Card
                </Link>{" "}
                by <span className="text-purple-700">Telekung Tea</span>{" "}
                <LuHeart size={20} fill="purple" color="purple" />
              </p>
              <p className="text-md font-light">Get in touch with us</p>
              <div className="flex gap-2">
                <Link
                  target="_blank"
                  href={`https://www.instagram.com/telekungtea`}
                >
                  <LuInstagram size={30} color="red" />
                </Link>
                <Link target="_blank" href={`https://telekungtea.com/`}>
                  <LuGlobe size={30} color="blue" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Bottom bar */}
      <Bar dataFromDB={dataFromDB} />
    </main>
  );
};

export default ECard;
