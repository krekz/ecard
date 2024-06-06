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
          <h2 className="text-5xl text-gray-800 font-extrabold md:text-6xl">
            Going Digital?
            <br></br>
            Tie the Knot with{" "}
            <span className="text-fuchsia-600">Online Invites</span>
          </h2>
          <p className="text-lg">
            The modern, eco-friendly way to invite your loved ones to your
            special occasions! With our platform, you can create, and send your
            invitations in just Link few clicks.
          </p>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Link href="/catalog">
              <Button className="bg-fuchsia-500 hover:bg-fuchsia-600">
                Browse TeaCard
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button className="bg-transparent outline-fuchsia-500 outline outline-1 text-fuchsia-600 hover:bg-fuchsia-600  hover:text-white">
                Our pricing
                <LuArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-none mt-14 md:mt-0">
          <Image
            src="/laptop-mock.png"
            quality={75}
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
