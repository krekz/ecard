"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section
      className="py-5 min-h-[85dvh] overflow-hidden mx-auto"
      style={{
        backgroundImage: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
      }}
    >
      <motion.div
        className="max-w-screen-xl mx-auto text-gray-600 items-center  justify-between md:flex md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl text-center md:text-left">
          <h1 className="text-sm text-indigo-600 font-medium">
            Over 100 available designs
          </h1>
          <h2 className="text-6xl text-gray-800 font-extrabold md:text-6xl">
            <span className="text-purple-600">Going Digital?</span> <br></br>Tie
            the Knot with Online Invites
          </h2>
          <p className="text-lg">
            The modern, eco-friendly way to invite your loved ones to your
            special occasions! With our platform, you can create, and send your
            invitations in just Link few clicks.
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link href="/catalog">
              <Button>Lets get started</Button>
            </Link>
            <Link href="/#pricing">
              <Button className="bg-transparent outline outline-1 text-primary hover:text-white outline-primary" >
                Our pricing
                <LuArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-none mt-14 md:mt-0  ">
          <Image
            src="/laptop-mock.png"
            quality={25}
            width={700}
            height={600}
            placeholder="empty"
            alt="hero"
            priority={true}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
