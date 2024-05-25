"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuInfinity, LuLeaf, LuPackageCheck, LuSparkles } from "react-icons/lu";

const plan = {
  name: "One Single Card",
  desc: "Browse through our extensive collection to find the perfect match for your event.",
  price: "9.90",
  isMostPop: true,
  features: [
    "Calendar",
    "Money Gift",
    "Gallery",
    "Music",
    "Location",
    "Contact",
  ],
};

const features = [
  {
    name: "Gorgeous Designs",
    desc: " Choose from a curated collection of templates crafted by top designers",
    icon: <LuSparkles />,
  },
  {
    name: "Eco Friendly",
    desc: "Celebrate sustainably with zero paper waste. Go green without compromising on elegance or quality.",
    icon: <LuLeaf />,
  },
  {
    name: "Seamless Delivery",
    desc: "Send your digital invitations instantly via email, text or social media. ",
    icon: <LuPackageCheck />
  },
  {
    name: "Flexible",
    desc: "Customize every detail – from fonts to images and messages to make your invitation truly one-of-a-kind.",
    icon: <LuInfinity />
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-14">
      <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5, once: true }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative max-w-xl space-y-3 px-4 md:px-0"
        >
          <h3 className="text-indigo-600 font-semibold">Pricing</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            <span className="text-red-500 font-extrabold">
              No SUBSCRIPTIONS.
            </span>{" "}
            Just One Perfect Card.
          </p>
          <div className="max-w-xl">
            <p>
              Select from a wide array of exquisite designs, personalize to your
              heart’s content and enjoy an array of premium features – all for a
              single card.
            </p>
          </div>
        </motion.div>
        <div className="mt-16 justify-between gap-8 md:flex">
          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 max-w-md space-y-10 px-4 md:px-0"
          >
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-3">
                <div className="flex-none w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-gray-800 font-medium">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mt-2 md:text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0"
          >
            <div className="p-4 py-8 border-b md:p-8 flex flex-col">
              <div className="justify-between flex">
                <div className="max-w-xs">
                  <span className="text-2xl text-gray-800 font-semibold sm:text-3xl">
                    {plan.name}
                  </span>
                  <p className="mt-3 sm:text-sm">{plan.desc}</p>
                </div>
                <div className="flex-none text-gray-800 text-2xl font-semibold sm:text-3xl">
                  RM{plan.price}
                </div>
              </div>
              <Link href="/catalog" className="mt-4 px-3 py-3 rounded-lg text-center font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                Choose your design
              </Link>
            </div>
            <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
              <div className="pb-2 col-span-2 text-gray-800 font-medium">
                <p>Features</p>
              </div>
              {plan.features.map((featureItem, idx) => (
                <li key={idx} className="flex items-center gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {featureItem}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
