"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutError() {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="font-semibold text-2xl">400</h3>
          <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Bad Request
          </p>
          <p className="text-gray-600">
            Oopss, something went wrong. Please re-create your card and try
            again. Sorry for the inconvenience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="block py-2 px-4 text-white font-medium bg-fuchsia-500 hover:bg-fuchsia-600"
            >
              <Link href="/catalog">To catalog</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
