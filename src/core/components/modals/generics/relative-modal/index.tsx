/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */
"use client";

import { useEffect, useRef } from "react";
import { DivCard } from "@/components/atoms";
import { CONTEXT_MENU_ICONS } from "@/core/ui/icons";
import Image from "next/image";
import { cn } from "@/core/lib/utils";

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  sx?: string; // for overriding styles;
}

export default function RelativeModal({
  // generic modal
  children,
  showModal,
  setShowModal,

  sx,
}: Props) {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    showModal && modalRef?.current?.focus();
  }, [showModal]);

  return showModal ? (
    <DivCard
      className={cn(
        "min-h-[170px] min-w-[min(91vw,_200px)] flex-col items-start justify-start gap-3 bg-app_bg_grayed p-4 shadow",
        sx
      )}
      tabIndex={1}
      ref={modalRef}
      id="relative-modal" // used by the getResponsivePosition function to get component's height and width
      onBlur={() => setShowModal(false)}
    >
      <DivCard className="mb-2" onClick={() => setShowModal(false)}>
        <Image
          src={CONTEXT_MENU_ICONS.close}
          alt="Show more"
          className="cursor-pointer"
          height={24}
          width={24}
        />
      </DivCard>

      {children}
    </DivCard>
  ) : null;
}
