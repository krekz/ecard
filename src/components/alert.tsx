import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
type PromptAlertProps = {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
};

const PromptAlert = ({ children, onSubmit }: PromptAlertProps) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="w-full md:w-24 mx-auto bg-primary p-3 rounded-md">{children}</DialogTrigger>
      <DialogContent className="w-3/4 rounded-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Make sure your <span className="font-bold">EVENT DATE</span> is
            correct otherwise you cannot change or modify the date in the future
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2  justify-center" >
          <DialogClose asChild>
            <Button variant="destructive" className="w-24">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            className="w-24"
            onClick={() =>
              form
                .handleSubmit(onSubmit)()
                .then(() => setOpen(false))
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptAlert;
