"use client";
import { LuAlignJustify, LuXCircle } from "react-icons/lu";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navbarContent = [
  {
    name: "Catalog",
    url: "/catalog",
    target: "_blank",
    className: "hover:text-muted-foreground",
  },
  {
    name: "Pricing",
    url: "/pricing",
    target: "_blank",
    className: "hover:text-muted-foreground",
  },
  {
    name: "FAQ",
    url: "/faq",
    target: "_blank",
    className: "hover:text-muted-foreground",
  },
  {
    name: "Sign in",
    url: "/signin",
    target: "_blank",
    className: "hover:text-muted-foreground ",
  },
  {
    name: "Create card",
    url: "/create",
    target: "_blank",
    className: `${buttonVariants({ variant: "default" })} font-semibold`,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-10  mx-auto top-0 left-0 right-0 bg-secondary font-bold ">
      <div
        className={cn(
          "relative flex justify-between container p-5",
          isOpen && "flex flex-col items-center"
        )}
      >
        <div className={cn("flex gap-2 cursor-pointer", isOpen && "hidden")}>
          <Image
            className="size-10"
            src="/favicon1.webp"
            width={35}
            height={25}
            alt="lol"
          />
          <Link href="/" className="text-lg md:text-2xl my-auto font-bold ">
            #TelekungTEA
          </Link>
        </div>
        <ul
          className={cn(
            "hidden md:flex gap-3 text-lg md:items-center ",
            isOpen && "flex flex-col min-h-screen items-center justify-center"
          )}
        >
          {navbarContent.slice(0, 3).map((item, index) => (
            <Link
              key={index}
              onClick={() => setIsOpen(false)}
              href={item.url}
              className={cn(
                "hover:text-primary",
                pathname === item.url ? "text-primary" : "text-gray-500"
              )}
            >
              {item.name}
            </Link>
          ))}
        </ul>
        <div className="space-x-3 text-lg hidden md:block">
          {navbarContent.slice(3).map((item, index) => (
            <Link key={index} href={item.url} className={item.className}>
              {item.name}
            </Link>
          ))}
        </div>
        <LuAlignJustify
          size={30}
          className="cursor-pointer my-auto md:hidden block"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <LuXCircle
            size={30}
            className="cursor-pointer absolute top-7 right-5"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
