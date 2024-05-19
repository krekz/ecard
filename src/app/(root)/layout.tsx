import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import getServerSession from "next-auth";
import { SessionProvider } from "next-auth/react";

export default async function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
      <main>{children}</main>
    </>
  );
}
