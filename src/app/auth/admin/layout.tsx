import { auth } from "@/auth";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // TODO: check if user is admin

  if (!session) redirect("/");
  return (
    <>
      <SessionProvider session={session}>
        <Sidebar />
      </SessionProvider>
      {children}
    </>
  );
}
