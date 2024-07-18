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
    description: "Find and share your files",
  },
];

export const CTA_CONTENT: {
  title: string;
  text: string;
  url: string;
  bt_bg: BgVariants;
}[] = [
  {
    title: "go to r-drive",
    text: "My R Drive",
    url: "/r-drive",
    bt_bg: "blued",
  },
  {
    title: "go to storage plans",
    text: "Storage Plans",
    url: "/storage-plans",
    bt_bg: "invert",
  },
];
