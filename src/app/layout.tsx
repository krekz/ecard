import type { Metadata } from "next";
// import { jakarta_sans } from "@/components/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Loglib from "@loglib/tracker/react";

export const metadata: Metadata = {
  title: "E-Card",
  description: "Create your own e-card for your special event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body>
        <Toaster />
        {children}
        <Loglib
          config={{
            id: "e-card-test-tea",
          }}
        />
      </body>
    </html>
  );
}
