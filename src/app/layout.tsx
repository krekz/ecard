import type { Metadata } from "next";
// import { jakarta_sans } from "@/components/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Loglib from "@loglib/tracker/react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title:
    "TeaCard by Telekung Tea | Affordable Customizable Digital Wedding Cards",
  description: "Create your own e-card for your special event",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html>
      <body>
        <Toaster />
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
          session={session}
        >
          {children}
        </SessionProvider>
        <Loglib
          config={{
            id: "e-card-test-tea",
          }}
        />
      </body>
    </html>
  );
}
