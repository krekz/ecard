"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  LuLandmark,
  LuImage,
  LuUser,
  LuTag,
  LuArrowLeft,
  LuSettings,
} from "react-icons/lu";
import { Button } from "../ui/button";

const navigation = [
  {
    href: "/auth/admin",
    name: "Overview",
    icon: <LuLandmark size={20} />,
  },
  {
    href: "/auth/admin/upload-design",
    name: "Designs",
    icon: <LuImage size={20} />,
  },
  {
    href: "/auth/admin/voucher",
    name: "Voucher",
    icon: <LuTag size={20} />,
  },
  {
    href: "/auth/admin/roles",
    name: "Roles",
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
    href: "/",
    name: "Settings",
    icon: <LuSettings size={20} />,
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

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">
            <Link href="javascript:void(0)" className="flex-none">
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
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    {navsFooter.length === idx + 1 ? (
                      // Logout button
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-x-2 text-gray-600 p-2 rounded-lg duration-150"
                        onClick={item.href as () => void}
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        {item.name}
                      </Button>
                    ) : (
                      <Link
                        href={item.href as string}
                        className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
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
                    <span className="block text-gray-700 text-sm font-semibold">
                      {session?.user?.name}
                    </span>
                    <Link
                      href="javascript:void(0)"
                      className="block mt-px text-gray-600 hover:text-indigo-600 text-xs"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
