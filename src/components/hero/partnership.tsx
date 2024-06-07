"use client";
import { motion } from "framer-motion";
import Image from "next/image";
const Partnership = () => {
  return (
    <div className="mt-14 px-4 md:px-8 overflow-hidden">
      <p className="text-center text-md text-gray-700 font-semibold">
        In partnership with
      </p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex justify-center items-center overflow-hidden"
      >
        <Image
          className="w-52 h-52"
          src="/telekungtea.svg"
          alt="Telekung Tea"
          width={70}
          height={70}
          quality={50}
        />
        <Image
          src="/krzmtq.svg"
          alt="Krzmtq"
          className="scale-125 w-52 h-52"
          width={70}
          height={70}
          quality={50}
        />
      </motion.div>
    </div>
  );
};

export default Partnership;
