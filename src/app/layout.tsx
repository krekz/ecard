import type { Metadata } from "next";
import { jakarta_sans } from "@/components/fonts";
import "./globals.css";
import {Toaster} from 'react-hot-toast'

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
    <html lang="en" className={jakarta_sans.className}>
      <body
        className="min-h-screen bg-[#FAFAFA] font-sans antialiased "
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
