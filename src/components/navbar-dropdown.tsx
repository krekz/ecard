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

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const NavDropdown = ({ user }: { user: User | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{user?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/profile`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}

        <DropdownMenuItem
          className="justify-between bg-red-500 text-white font-medium cursor-pointer"
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
