"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  //
};

export default function NotFoundPage({ }: Props) {
  return (
    <main className="w-full order min-h-main_min_height flex items-center justify-center gap-1 md:gap-4">
      <p className="text-[4.5rem] font-semibold md:text-[8rem] md:font-bold text-app_blue">
        404
      </p>

      <div className="flex flex-col gap-2 w-fit">
        <h1 className="font-semibold">Page Not Found</h1>

        <Button
          className="w-full"
          asChild
        >
          <Link href="/">
            Go Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
