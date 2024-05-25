import type { Metadata } from "next";
// import { jakarta_sans } from "@/components/fonts";
import { Montserrat } from "next/font/google";
import "./globals.css";
// import {Toaster} from 'react-hot-toast'
import { Toaster } from "@/components/ui/toaster";
import Loglib from "@loglib/tracker/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

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
    <html lang="en" className={montserrat.className}>
      <body className="min-h-screen bg-pink-100/50 font-sans antialiased ">
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
