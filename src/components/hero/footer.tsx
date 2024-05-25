'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";

const Footer = () => {
  const footerNavs = [
    {
      href: "https://telekungtea.com/pages/our-stores",
      name: "Stores",
    },
    {
      href: "https://telekungtea.com/pages/contact",
      name: "Contact",
    },
    {
      href: "https://telekungtea.com/pages/careers",
      name: "Careers",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-white bg-purple-300 px-4 py-5 mx-auto md:px-8"
    >
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <h1 className="text-2xl font-bold">TELEKUNGTEA</h1>
        <p className="leading-relaxed mt-2 text-[15px]">
          Transform the way you invite with our Digital Wedding Invitations and
          make your special day even more memorable.
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li key={idx} className=" hover:text-gray-800">
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-around sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} TelekungTEA All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          {/* Icon */}
          <ul className="flex items-center space-x-4">
            <LuFacebook size={20} color="blue" />
            <LuInstagram size={20} color="red" />
            <LuTwitter size={20} color="#544bae" />
          </ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
