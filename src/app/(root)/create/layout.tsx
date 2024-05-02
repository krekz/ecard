import FormNavbar from "@/components/create/form-navbar";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormNavbar />
      {children}
    </>
  );
}
