import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LuLogOut, LuUser2 } from "react-icons/lu";

const NavDropdown = ({
  setState,
  user,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={` rounded-full bg-white p-1`}>
        {user?.image ? (
          <Image
            src={user?.image}
            alt={user?.name ?? "user"}
            className="rounded-full w-auto h-auto"
            height={30}
            width={30}
          />
        ) : (
          <LuUser2 size={30} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/cards`}>
          <DropdownMenuItem onClick={() => setState(false)}>
            Cards
          </DropdownMenuItem>
        </Link>
        {(user?.role === "admin" || user?.role === "super_admin") && (
          // use <a> to prevent dark mode bug on admin and home
          <a href={`/admin`}>
            <DropdownMenuItem onClick={() => setState(false)}>
              Admin
            </DropdownMenuItem>
          </a>
        )}

        <DropdownMenuItem
          className="justify-between  font-medium cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log out
          <LuLogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
