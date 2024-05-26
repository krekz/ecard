import { auth } from "@/auth";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";

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
    <html className={montserrat.className}>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
