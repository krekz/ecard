"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import NavDropdown from "./navbar-dropdown";
import Banner from "./banner";

const navigation = [
  { title: "Catalog", path: "/catalog" },
  { title: "Pricing", path: "../#pricing" },
  { title: "FAQ", path: "../#faq" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [state, setState] = useState(false);

  // Complete additional information
  if (session && (!session?.user.state || !session?.user.district)) {
    if (pathname !== "/complete-registration") {
      redirect("/complete-registration");
    }
  }

  return (
    <nav className="sticky top-0 bg-purple-50  border-b w-full z-20 md:text-sm md:border-none">
      <Banner />
      <div className="items-center px-4 container mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-fuchsia-500">Tea</span>Card
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  <Link
                    href={item.path}
                    onClick={() => setState(false)}
                    className={cn(
                      "block",
                      pathname === item.path && "text-indigo-600 font-bold"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <ul className="space-y-3 items-center gap-x-2 md:flex md:space-y-0">
              <li>
                <Link
                  href="/catalog"
                  className="block py-3 px-4 font-medium text-center text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-lg shadow md:inline"
                >
                  Create Card
                </Link>
              </li>
              <li>
                {session ? (
                  <NavDropdown setState={setState} user={session.user} />
                ) : (
                  <Button
                    variant="link"
                    className="w-full"
                    onClick={() => signIn()}
                  >
                    Sign in
                  </Button>
                )}
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
