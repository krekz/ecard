import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { buttonVariants } from "./ui/button";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const NavDropdown = ({
  setState,
  user,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`w-full ${buttonVariants({ variant: "secondary" })}`}
      >
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/cards`}>
          <DropdownMenuItem onClick={() => setState(false)}>Cards</DropdownMenuItem>
        </Link>
        <Link href={`/auth/admin`}>
          <DropdownMenuItem onClick={() => setState(false)}>Dashboard</DropdownMenuItem>
        </Link>

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
