"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleList = [
  {
    id: "super_admin",
    name: "Super Admin",
  },
  {
    id: "admin",
    name: "Admin",
  },
  {
    id: "user",
    name: "User",
  },
];

type User = {
  cards: { id: string }[];
  id: string;
  name?: string | null;
  state?: string | null;
  district?: string | null;
  referral?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role?: string;
  createdAt?: Date;
} | null;

const UserForm = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5>Username</h5>
      <h5>Email</h5>
      <p className="border p-3 text-xs rounded-lg">{user?.email}</p>
      <h5>Role</h5>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={user?.role || "Role"} />
        </SelectTrigger>
        <SelectContent>
          {roleList.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserForm;
