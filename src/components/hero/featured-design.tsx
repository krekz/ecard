"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

const FeaturedDesign = () => {
  return (
    <section className="pb-16 flex flex-col items-center">
      <motion.div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: true }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-w-md"
        >
          <h1 className="text-gray-800 font-extrabold text-3xl">
            Our featured designs
          </h1>
          <p className="text-gray-600 mt-2">
            Send your invitations instantly via email or social media, ensuring
            they reach your guests promptly.
          </p>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: true }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="py-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
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
              <div className="flex flex-row justify-center gap-2 p-5">
                <Button asChild className="w-full" variant="secondary">
                  <Link target="_blank" href="/preview/demo?id=wed-1">
                    Preview
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-fuchsia-500 hover:bg-fuchsia-600"
                >
                  <Link href="/user/create">Buy</Link>
                </Button>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
      <Button asChild variant="outline" className="mt-16 p-6">
        <Link
          href="/catalog"
          className="outline outline-fuchsia-500 outline-1 hover:bg-fuchsia-600 hover:text-white hover:outline-none flex gap-2 items-center"
        >
          View all designs <LuArrowRight />
        </Link>
      </Button>
    </section>
  );
};

export default FeaturedDesign;
