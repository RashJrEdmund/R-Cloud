import { DivCard } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { UsedSpaceDisplay } from "@/components/molecules";
import Link from "next/link";
import Image from "next/image";

interface Props {}

export default function DriveDisplay({}: Props) {
  return (
    <DivCard className="w-full flex-col gap-4">
      <DivCard className="w-full flex-col gap-4">
        <UsedSpaceDisplay className="" />

        <Button asChild variant="blued">
          <Link href="/r-drive/root">Open Drive</Link>
        </Button>
      </DivCard>

      <Image
        src="/landing/my-r-drive.svg"
        alt="my-r-drive"
        width={500}
        height={500}
        draggable={false}
      />
    </DivCard>
  );
}
