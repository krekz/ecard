"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const Hero = () => {
  return (
    <section
      className="py-32 md:py-5 min-h-[85vh]"
      style={{
        backgroundImage: "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
      }}
    >
      <motion.div
        className="max-w-screen-xl mx-auto text-gray-600 items-center overflow-hidden justify-between md:flex md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{amount: 0.5 ,once: true}}
        transition={{ duration: 0.3, ease:"easeInOut"}}
      >
        <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl text-center md:text-left">
          <h1 className="text-sm text-indigo-600 font-medium">
            Over 100 available designs
          </h1>
          <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
            Create your <span className="text-indigo-600">card</span> and share
            with others
          </h2>
          <p>
            The modern, eco-friendly way to invite your loved ones to your
            special occasions! With our platform, you can create, and send your
            invitations in just Link few clicks.
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link
              href="/catalog"
              className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Lets get started
            </Link>
            <Link
              href="/#pricing"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
            >
              Our pricing
              <LuArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex-none mt-14 md:mt-0 ">
          <Image src="/laptop-mock.png" width={600} height={600} alt="hero" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
