'use client'
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import  useStore  from "@/store/store";

const linkItems: Array<{ id: number; href: string; label: string }> = [
  { id: 1, href: "/create?step=1", label: "Organizers" },
  { id: 2, href: "/create?step=2", label: "Event" },
  { id: 3, href: "/create?step=3", label: "Others" }
];


const FormNavbar = () => {

  const {currentStep, setCurrentStep}=useStore();

  const pathname = usePathname();
  return (
    <div className="flex justify-center w-full p-5 container">
      <ul className="flex w-1/2 justify-center border border-gray-500 rounded p-2">
        {linkItems.map((item) => (
          <li key={item.href} className="w-full">
            <Button
              className={cn(`${buttonVariants({ variant: "secondary" })} w-full hover:bg-purple-300`, 
               item.id === currentStep ? "bg-purple-300" : null
              )}
              onClick={() => {setCurrentStep(item.id) }}
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormNavbar;
