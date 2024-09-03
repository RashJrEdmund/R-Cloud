import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface CopyProps {
  data: string;
  toast_header: string;
  toast_desc?: string;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const copyToClipboard = (p: CopyProps) => {
  navigator.clipboard.writeText(p.data).then(() => {
    toast(p.toast_header, {
      description: p.toast_desc,
    });
  });
};

export { cn, copyToClipboard };
