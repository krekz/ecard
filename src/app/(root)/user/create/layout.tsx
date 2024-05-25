import FormNavbar from "@/components/forms/form-navbar";

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
