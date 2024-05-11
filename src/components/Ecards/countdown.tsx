"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getFont } from "@/lib/utils";
import { TFonts} from "@/lib/types";

const Countdown = ({ event_date, secondary_font }: { event_date: Date, secondary_font: TFonts | undefined }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const targetDate = new Date(event_date);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className={cn("text-4xl", secondary_font?.font.className)}>
        Menghitung Hari
      </h2>
      <div className="flex justify-center gap-10 border p-5 rounded-lg ">
        <div className="relative flex flex-col items-center">
          <h2>{countdown.days}</h2>
          <p>Hari</p>
          <span className="absolute top-3 left-10">:</span>
        </div>

        <div className="relative flex flex-col items-center">
          <h2>{countdown.hours}</h2>
          <p>Jam</p>
          <span className="absolute top-3 left-10">:</span>
        </div>

        <div className="relative flex flex-col items-center">
          <h2>{countdown.minutes}</h2>
          <p>Minit</p>
          <span className="absolute top-3 left-10">:</span>
        </div>

        <div className="relative flex flex-col items-center">
          <h2>{countdown.seconds}</h2>
          <p>Saat</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
