"use client";

import { useMemo, useState } from "react";
import { WithMeGridCardContainer, WithMeListCardContainer } from "../shared";
import { DivCard, TextTag } from "@/components/atoms";
import { deriveDocumentPreviewImage, shortenText } from "@/core/utils/helpers";
import { FILE_FOLDER_MAX_NAME_LENGTH } from "@/core/utils/constants";
import { useAppStore } from "@/providers/stores/zustand";
import { MEDIA_ICONS } from "@/core/ui/icons";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/core/lib/utils";
import { WithMeFileContextMenu } from "./file-context-menu";
import Image from "next/image";

import type { MouseEventHandler } from "react";
import type { SharedDocument, Document } from "@/core/interfaces/entities";

interface CardComponentProps {
  file: SharedDocument;
  handleOpen: MouseEventHandler<HTMLDivElement>;
  imagePreview: { img: string; isCustom?: boolean }; // This helps to know weather or not to add the object-fit: cover; css style.
}

function _WithMeGridFileCard({
  file,
  imagePreview,
  handleOpen,
}: CardComponentProps) {
  const [backupImage, setBackupImage] = useState<string | null>("");

  return (
    <WithMeGridCardContainer onDoubleClick={handleOpen}>
      <Image
        src={backupImage || imagePreview.img}
        className={cn(
          "max-h-[75px] w-full",
          imagePreview?.isCustom ? "object-cover" : ""
        )}
        onError={() => {
          if (imagePreview.isCustom) setBackupImage(MEDIA_ICONS.img);
        }}
        alt="file icon"
        width={60}
        height={60}
      />

      <DivCard className="flex-col items-start">
        <DivCard className="mt-[5px]">
          <TextTag
            title={file.name}
            className="m-0 whitespace-nowrap text-[0.9rem] font-[500]"
          >
            {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </DivCard>

        <DivCard className="mt-[10px] w-full gap-[5px]">
          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.extension}
          </TextTag>

          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.capacity.size}
          </TextTag>
        </DivCard>
      </DivCard>
    </WithMeGridCardContainer>
  );
}

function _WithMeListFileCard({
  file,
  imagePreview,
  handleOpen,
}: CardComponentProps) {
  return (
    <WithMeListCardContainer onDoubleClick={handleOpen}>
      <span className="inline-block min-w-[40px]">
        <Image src={imagePreview.img} alt="file icon" width={25} height={25} />
      </span>

      <DivCard className="w-full justify-between">
        <TextTag
          title={file.name}
          className="m-0 inline-block w-full max-w-[calc(100%_-_100px)] overflow-hidden text-ellipsis whitespace-nowrap text-left text-[0.8rem] font-[500] sm:text-[0.9rem]"
        >
          {file.name}
        </TextTag>

        <DivCard className="w-fit min-w-[90px] justify-between gap-[5px]">
          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.extension}
          </TextTag>

          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.capacity.size}
          </TextTag>
        </DivCard>
      </DivCard>
    </WithMeListCardContainer>
  );
}

// HOC STARTS HERES

function WithMeFileCardHoc(
  CardComponent: (props: CardComponentProps) => JSX.Element
) {
  return function Card({ file }: { file: SharedDocument }) {
    const pathname = usePathname();
    const router = useRouter();

    const { displayLayout } = useAppStore();

    const handleOpen = () => {
      router.push(`${pathname}/${file.doc_id}`);
    };

    const imagePreview = useMemo<{ img: string; isCustom?: boolean }>(() => {
      return deriveDocumentPreviewImage(
        file as unknown as Document,
        displayLayout
      );
    }, [displayLayout, file]);

    return (
      <WithMeFileContextMenu doc={file}>
        <CardComponent
          file={file}
          handleOpen={handleOpen}
          imagePreview={imagePreview}
        />
      </WithMeFileContextMenu>
    );
  };
}

const WithMeGridFileCard = WithMeFileCardHoc(_WithMeGridFileCard);

const WithMeListFileCard = WithMeFileCardHoc(_WithMeListFileCard);

export { WithMeGridFileCard, WithMeListFileCard };
