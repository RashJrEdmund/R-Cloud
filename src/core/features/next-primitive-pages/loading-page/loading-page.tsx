"use client";

import { TextLogo } from "@/components/atoms";

interface Props {
  //
}

export default function LoadingPage({}: Props) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center gap-1 bg-app_bg">
      <TextLogo
        showLogo
        className="animate-pulse text-[1.5rem] font-semibold text-app_text_grayed"
        sxImgClassName="w-[50px] h-[50px]"
      />
    </div>
  );
}
