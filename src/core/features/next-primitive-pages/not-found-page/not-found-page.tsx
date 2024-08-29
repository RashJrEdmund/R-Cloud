import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  //
}

export default function NotFoundPage({}: Props) {
  return (
    <main className="order flex min-h-main_min_h w-full items-center justify-center gap-1 md:gap-4">
      <p className="text-[4.5rem] font-semibold text-app_blue md:text-[8rem] md:font-bold">
        404
      </p>

      <div className="flex w-fit flex-col gap-2">
        <h1 className="font-semibold">Page Not Found</h1>

        <Button className="w-full" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
}
