import "../globals.css";
import { auth } from "@/auth";
import Sidebar from "@/components/admin/sidebar";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Admin Dashboard | TEACard",
  description: "Admin page for TEACard",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {/* <section className="grid grid-cols-6 mx-auto"> */}
        <section className="flex">
          <SessionProvider
            refetchOnWindowFocus={false}
            refetchWhenOffline={false}
            session={session}
          >
            <Sidebar />
          </SessionProvider>
          <section className="flex flex-col justify-center mx-auto items-center gap-2 h-full pt-10 w-full">
            {children}
          </section>
        </section>
      </ThemeProvider>
    </main>
  );
}
