import Navbar from "@/components/navbar";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mt-20">{children}</main>
    </>
  );
}
