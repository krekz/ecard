import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Loglib from "@loglib/tracker/react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import QueryProvider from "@/context/query-provider";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title:
    "TeaCard by Telekung Tea | Affordable Customizable Digital Wedding Cards",
  description: "Create your own e-card for your special event",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${montserrat.className} light`}>
      <body className={`min-h-screen font-sans antialiased `}>
        <Toaster />
        <QueryProvider>
          <SessionProvider
            refetchOnWindowFocus={false}
            refetchWhenOffline={false}
            session={session}
          >
            {children}
          </SessionProvider>
        </QueryProvider>
        <Loglib
          config={{
            id: "e-card-test-tea",
          }}
        />
      </body>
    </html>
  );
}
