import { auth } from "@/auth";
import Sidebar from "@/components/admin/sidebar";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

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
      <section className="grid grid-cols-6 mx-auto">
        <SessionProvider session={session}>
          <Sidebar />
        </SessionProvider>
        {children}
      </section>
    </>
  );
}
