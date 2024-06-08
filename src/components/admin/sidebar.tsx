"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  LuLandmark,
  LuImage,
  LuUser,
  LuTag,
  LuArrowLeft,
  LuAlignJustify,
} from "react-icons/lu";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { ModeToggle } from "../theme-button";

const navigation = [
  {
    href: "/admin",
    name: "Overview",
    icon: <LuLandmark size={20} />,
  },
  {
    href: "/admin/designs",
    name: "Designs",
    icon: <LuImage size={20} />,
  },
  {
    href: "/admin/vouchers",
    name: "Voucher",
    icon: <LuTag size={20} />,
  },
  {
    href: "/admin/users",
    name: "Users",
    icon: <LuUser size={20} />,
  },
];

const navsFooter = [
  {
    href: "/",
    name: "Back to Home",
    icon: <LuArrowLeft size={20} />,
  },
  {
    href: () => signOut({ callbackUrl: "/" }),
    name: "Logout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
    ),
  },
];

const SidebarContent = ({ session }: { session: Session }) => (
  <div className="flex flex-col h-screen w-full">
    <div className="h-20 flex items-center px-8">
      {/* Logo */}
      <Link href="/auth/admin" className="flex-none">
        {/* <Image
          src="https://floatui.com/logo.svg"
          width={140}
          height={140}
          className="mx-auto"
          alt="logo"
        /> */}
      </Link>
    </div>
    <div className="flex-1 flex flex-col h-full overflow-auto">
      {/* Nav content */}
      <ul className="px-4 sm:text-md text-sm font-medium flex-1">
        {navigation.map((item, idx) => {
          if (item.name === "Users" && session?.user?.role !== "super_admin") {
            return null;
          }
          return (
            <li key={idx}>
              <Link
                href={item.href}
                className="flex items-center gap-x-2 dark:text-primary-foreground p-2 rounded-lg hover:bg-primary active:bg-primary duration-150"
              >
                <div className="text-gray-500 dark:text-primary-foreground">
                  {item.icon}
                </div>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        {/* Nav Footer */}
        <ul className="px-4 pb-4 text-sm sm:text-md font-medium">
          {navsFooter.map((item, idx) => (
            <li key={idx}>
              {navsFooter.length === idx + 1 ? (
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-x-2 dark:text-primary-foreground p-2 rounded-lg duration-150"
                  onClick={item.href as () => void}
                >
                  <div className="text-gray-500 dark:text-primary-foreground">
                    {item.icon}
                  </div>
                  {item.name}
                </Button>
              ) : (
                <Link
                  href={item.href as string}
                  className="flex items-center gap-x-2 dark:text-primary-foreground p-2 rounded-lg hover:bg-primary active:bg-primary duration-150"
                >
                  <div className="text-gray-500 dark:text-primary-foreground">
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* User info */}
        <div className="py-4 px-4 border-t">
          <div className="flex items-center gap-x-4">
            <Image
              src={session?.user?.image || ""}
              width={40}
              height={40}
              className="rounded-full"
              alt="avatar"
            />
            <div>
              <span className="block dark:text-primary-foreground text-sm font-semibold">
                {session?.user?.name}
              </span>
              <Link
                href="/auth/admin"
                className="block mt-px dark:text-primary-foreground hover:text-indigo-600 text-xs"
              >
                {session?.user?.role === "super_admin"
                  ? "Super Admin"
                  : session?.user?.role === "admin"
                  ? "Admin"
                  : "User"}
              </Link>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* Desktop View */}
      <nav className="hidden dark:bg-background xl:block  top-0 left-0 h-full border-r bg-white space-y-8 w-full z-20">
        <SidebarContent session={session!} />
      </nav>
      {/* Mobile View */}
      <Sheet>
        <SheetTrigger className="xl:hidden fixed top-5 left-5 cursor-pointer">
          <LuAlignJustify size={30} />
        </SheetTrigger>
        <SheetContent side="left" className="w-1/2 p-0">
          <SidebarContent session={session!} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
