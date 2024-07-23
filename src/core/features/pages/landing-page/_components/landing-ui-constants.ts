import { BgVariants } from "@/components/atoms/common/types";

interface IIllustrationContent {
  url: string;
  alt: string;
  description: string;
}

export const LANDING_ILLUSTRATION_CONTENT: IIllustrationContent[] = [
  {
    url: "/landing/save_&_organize_ files.svg",
    alt: "save & organize files illustration",
    description: "Save, organize and download your files",
  },
  {
    url: "/landing/share_files.svg",
    alt: "share files illustration",
    description: "Find and share with friends and colleges",
  },
];

export const CTA_CONTENT: {
  text: string;
  url: string;
  bt_bg: BgVariants;
}[] = [
  {
    text: "My R Drive",
    url: "/r-drive",
    bt_bg: "blued",
  },
  {
    text: "Storage Plans",
    url: "/storage-plans",
    bt_bg: "default",
  },
];
