"use client";

import { useMemo, useState } from "react";
import { DocNameWithToolTip, GridCardContainer, ListCardContainer } from "../shared";
import { DivCard, TextTag } from "@/components/atoms";
import { deriveDocumentPreviewImage, shortenText } from "@/core/utils/helpers";
import { FILE_FOLDER_MAX_NAME_LENGTH } from "@/core/utils/constants";
import { useAppStore, useSelectionStore } from "@/providers/stores/zustand";
import { MEDIA_ICONS } from "@/core/ui/icons";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/core/lib/utils";
import { FileContextMenu } from "./file-context-menu";
import Image from "next/image";

import type { MouseEventHandler } from "react";
import type { SharedCardProps } from "../shared";

interface Props extends SharedCardProps {
  // PROPS
}

interface CardComponentProps extends Props {
  // doc: Document already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  imagePreview: { img: string; isCustom?: boolean }; // This helps to know weather or not to add the object-fit: cover; css style.
}

function _GridFileCard({
  doc: file,
  imagePreview,
  handleOpen,
}: CardComponentProps) {
  const [backupImage, setBackupImage] = useState<string | null>("");

  return (
    <GridCardContainer document={file} onDoubleClick={handleOpen}>
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
          <DocNameWithToolTip title={file.name}>
            <TextTag
              className="m-0 whitespace-nowrap text-[0.9rem] font-[500]"
            >
              {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH)}
            </TextTag>
          </DocNameWithToolTip>
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
    </GridCardContainer>
  );
}

function _ListFileCard({
  doc: file,
  imagePreview,
  handleOpen,
}: CardComponentProps) {
  return (
    <ListCardContainer document={file} onDoubleClick={handleOpen}>
      <span className="inline-block min-w-[40px]">
        <Image src={imagePreview.img} alt="file icon" width={25} height={25} />
      </span>

      <DivCard className="w-full justify-between">
        <DocNameWithToolTip title={file.name}>
          <TextTag
            className="m-0 inline-block w-full max-w-[calc(100%_-_100px)] overflow-hidden text-ellipsis whitespace-nowrap text-left text-[0.8rem] font-[500] sm:text-[0.9rem]"
          >
            {file.name}
          </TextTag>
        </DocNameWithToolTip>

        <DivCard className="w-fit min-w-[90px] justify-between gap-[5px]">
          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.extension}
          </TextTag>

          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {file.capacity.size}
          </TextTag>
        </DivCard>
      </DivCard>
    </ListCardContainer>
  );
}

// HOC STARTS HERES

function FileCardHoc(
  CardComponent: (props: CardComponentProps) => JSX.Element
) {
  /* FUNC_DESC +=> ===================================================================
  | Could not bring myself to copying the same logic and using in both variations of |
  | the FileCard components so i built this high order component to handle all the   |
  | necessary computation, and then pass down props to each variation                |
  ================================================================//================*/
  return function Card({ doc: file }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const { displayLayout } = useAppStore();

    const { selectionStart } = useSelectionStore();

    const handleOpen: MouseEventHandler<HTMLDivElement> = () => {
      if (selectionStart) return;

      router.push(`${pathname}?viewing=${file.id}`);
    };

    const imagePreview = useMemo<{ img: string; isCustom?: boolean }>(() => {
      return deriveDocumentPreviewImage(file, displayLayout);
    }, [displayLayout, file.content_type]);

    return (
      <FileContextMenu doc={file}>
        <CardComponent
          doc={file}
          handleOpen={handleOpen}
          imagePreview={imagePreview}
        />
      </FileContextMenu>
    );
  };
}

const GridFileCard = FileCardHoc(_GridFileCard);

const ListFileCard = FileCardHoc(_ListFileCard);

export { GridFileCard, ListFileCard };
