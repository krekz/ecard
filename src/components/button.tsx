import React from "react";

import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";

const FormButton = ({ children }: { children: React.ReactNode }) => {
  const form = useFormContext();
  return (
    <Button disabled={form.formState.isSubmitting} type="submit">
      {children}
    </Button>
  );
};

export default FormButton;
