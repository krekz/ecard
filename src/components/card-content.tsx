import { euphoria } from "@/components/fonts";
import { cn } from "@/lib/utils";
import { HiCalendar, HiOutlineClock, HiLocationMarker } from "react-icons/hi";
import CardCarousel from "./card-carousel";

const ECardContent = () => {
  return (
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
      <div className="relative mt-10 flex flex-col gap-5 mx-auto items-center h-full max-w-64 text-center">
        <h1 className="text-sm font-semibold">
          Assalamualaikum WBT & Salam sejahtera
        </h1>

        <div className="flex flex-col text-2xl font-light">
          <h1>Shahruddin Bin Ahmad</h1>
          <span>&</span>
          <h1>Norhayani Binti Hussin</h1>
        </div>

        <p className="text-sm font-normal">
          Dengan penuh kesyukuran, kami menjemput Dato | Datin | Tuan | Puan |
          Encik | Cik ke majlis perkahwinan anakanda kami
        </p>

        <div className="flex flex-col  text-2xl font-medium italic  p-3 rounded-md bord bg-red-100/50 w-[350px]">
          <h1>Norain Binti Shahrudin</h1>
          <span>&</span>
          <h1>Nur Hidayat Bin Suradi</h1>
        </div>

        <div className="flex flex-col items-center">
          <HiCalendar size={25} />
          <h2 className="text-amber-700">Sabtu, 28 Disember 2024</h2>
        </div>

        <div className="flex flex-col items-center">
          <HiOutlineClock size={25} />
          <h2 className="text-amber-700">11.00 a.m - 4.00 p.m</h2>
        </div>

        <div className="flex flex-col items-center">
          <HiLocationMarker size={25} />
          <h2 className="text-amber-700">Dewan Tepi Sekolah</h2>
          <p className="font-light text-sm">
            No 5, Jalan tepi sekolah, belok kanan, jumpa lorong , 12345 London,
            India
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-amber-700">Atur Cara Majlis</h2>
          <div className="flex flex-col items-center font-light text-sm">
            <p>Jamuan Makan:</p>
            <p>11.00 a.m - 1.00 p.m</p>
          </div>
          <div className="flex flex-col items-center font-light text-sm">
            <p>Ketibaan Pengantin:</p>
            <p>12.30 Tengahari</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className={cn("text-4xl", euphoria.className)}>
            Menghitung Hari
          </h2>
          <div className="flex justify-center gap-10 border p-5 rounded-lg ">
            <div className="relative flex flex-col items-center">
              <h2>100</h2>
              <p>Hari</p>
              <span className="absolute top-3 left-10">:</span>
            </div>

            <div className="relative flex flex-col items-center">
              <h2>50</h2>
              <p>Jam</p>
              <span className="absolute top-3 left-10">:</span>
            </div>

            <div className="relative flex flex-col items-center">
              <h2>4</h2>
              <p>Minit</p>
              <span className="absolute top-3 left-10">:</span>
            </div>

            <div className="relative flex flex-col items-center">
              <h2>20</h2>
              <p>Saat</p>
            </div>
          </div>
        </div>

        <CardCarousel />

      </div>
    </section>
  );
};

export default ECardContent;
