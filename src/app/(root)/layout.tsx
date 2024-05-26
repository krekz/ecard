import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import getServerSession from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className={montserrat.className}>
      <body className="min-h-screen bg-pink-100/50 font-sans antialiased ">
        <SessionProvider session={session}>
          <Navbar />
        </SessionProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
