import { auth } from "@/auth";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

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
  // TODO: check if user is admin
  if (!session) redirect("/");
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <section className="grid grid-cols-6 mx-auto">
            <SessionProvider session={session}>
              <Sidebar />
            </SessionProvider>
            {children}
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
