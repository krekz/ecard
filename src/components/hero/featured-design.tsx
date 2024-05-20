"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const integrations = [
  {
    title: "Figma",
    desc: "Ut enim ad minim veniam",

  },
  {
    title: "Github",
    desc: "Ut enim ad minim veniam",
  },
  {
    title: "Discord",
    desc: "Ut enim ad minim veniam",
  },
];

const FeaturedDesign = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="py-16 flex flex-col items-center"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-md">
          <h1 className="text-gray-800 font-extrabold text-3xl">
            Our featured designs
          </h1>
          <p className="text-gray-600 mt-2">
            Extend and automate your workflow by using integrations for your
            favorite tools.
          </p>
        </div>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item, idx) => (
            <li key={idx} className="border rounded-lg">
              <div className="flex justify-center p-4 overflow-hidden">
                <Image
                  src="/phone-4.png"
                  alt="phone-1"
                  width={500}
                  height={500}
                  className="scale-150"
                />
              </div>
              <div className="flex flex-row justify-center p-5">
                <Button asChild className="w-full" variant="secondary">
                  <Link target="_blank" href="/preview/demo">
                    Preview
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/user/create">Buy</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button asChild className="mt-16">
        <Link href="/catalog">View all designs</Link>
      </Button>
    </motion.section>
  );
};

export default FeaturedDesign;
