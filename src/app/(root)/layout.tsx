import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="min-h-screen font-sans antialiased ">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
