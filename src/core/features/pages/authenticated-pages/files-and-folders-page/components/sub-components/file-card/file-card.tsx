"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { SelectCheckbox, GridCardContainer, ListCardContainer } from "../shared";
import { DivCard, TextTag } from "@/components/atoms";
import {
  deriveDocumentPreviewImage,
  openFileUploadDialog,
  shortenText,
} from "@/core/utils/helpers";
import { FILE_FOLDER_MAX_NAME_LENGTH } from "@/core/utils/constants";
import {
  useContextMenuContext,
  useModalContext,
} from "@/providers/stores/context";
import { useAppStore } from "@/providers/stores/zustand";
import { CONTEXT_MENU_ICONS, MEDIA_ICONS } from "@/core/ui/icons";
import Image from "next/image";

import type { MouseEventHandler, MutableRefObject } from "react";
import type { SharedCardProps } from "../shared";
import type { ContextMenuContent } from "@/core/interfaces/app";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/core/lib/utils";

interface Props extends SharedCardProps {
  // PROPS
}

interface CardComponentProps extends Props {
  // doc: Document already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  imagePreview: { img: string; isCustom?: boolean }; // This helps to know weather or not to add the object-fit: cover; css style.
  fileRef: MutableRefObject<HTMLDivElement | undefined>;
}

function _GridFileCard({
  doc: file,
  imagePreview,
  fileRef,
  handleOpen,
}: CardComponentProps) {
  const [backupImage, setBackupImage] = useState<string | null>("");

  return (
    <GridCardContainer ref={fileRef as any} onDoubleClick={handleOpen}>
      <SelectCheckbox document={file} />

      <Image
        src={backupImage || imagePreview.img}
        className={cn("w-full max-h-[75px]", imagePreview?.isCustom ? "object-cover" : "")}
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
    </GridCardContainer>
  );
}

function _ListFileCard({
  doc: file,
  imagePreview,
  fileRef,
  handleOpen,
}: CardComponentProps) {
  return (
    <ListCardContainer
      ref={fileRef as any}
      onDoubleClick={handleOpen}
    >
      <SelectCheckbox document={file} />

      <span className="inline-block min-w-[40px]">
        <Image
          src={imagePreview.img}
          alt="file icon"
          width={25}
          height={25}
        />
      </span>

      <DivCard className="w-full justify-between">
        <TextTag
          title={file.name}
          className="inline-block m-0 whitespace-nowrap text-ellipsis overflow-hidden w-full max-w-[calc(100%_-_100px)] text-[0.8rem] sm:text-[0.9rem] font-[500] text-left"
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
    const fileRef = useRef<HTMLDivElement>();
    const pathname = usePathname();
    const router = useRouter();

    const { displayLayout } = useAppStore();

    const {
      handleDocCardContextMenu,

      selectionStart,
    } = useContextMenuContext();

    const { openEditDocumentModal, openDeleteDocumentModal } =
      useModalContext();

    // console.log({ selectedDocs });

    // console.log('is file include?', selectedDocs.includes(file.id));

    const handleOpen: MouseEventHandler<HTMLDivElement> = () => {
      router.push(`${pathname}?viewing=${file.id}`);
    };

    const FILE_CONTEXT_MENU_CONTENT = useMemo<ContextMenuContent[]>(
      () => [
        {
          text: "Open File",
          icon_url: CONTEXT_MENU_ICONS.open,
          action: handleOpen,
        },
        {
          text: "Rename File",
          icon_url: CONTEXT_MENU_ICONS.rename,
          action: () => openEditDocumentModal(file),
        },
        {
          text: "New File",
          icon_url: CONTEXT_MENU_ICONS.upload,
          action: openFileUploadDialog,
        },
        {
          text: "Copy File",
          icon_url: CONTEXT_MENU_ICONS.copy,
          action: () => null,
        },
        {
          text: "Delete File",
          icon_url: CONTEXT_MENU_ICONS.delete,
          action: () => openDeleteDocumentModal(file),
        },
      ],
      []
    );

    const imagePreview = useMemo<{ img: string; isCustom?: boolean }>(() => {
      return deriveDocumentPreviewImage(file, displayLayout);
    }, [displayLayout, file.content_type]);

    const handleContext = (e: MouseEvent) => {
      handleDocCardContextMenu({
        event: e,
        CONTEXT_MENU_CONTENT: FILE_CONTEXT_MENU_CONTENT,
      });
    };

    useEffect(() => {
      if (!fileRef.current) return;

      fileRef.current.addEventListener("contextmenu", handleContext, false);

      return () => {
        fileRef.current?.removeEventListener(
          "contextmenu",
          handleContext,
          false
        );
      };
    }, [selectionStart]);

    return (
      <CardComponent
        doc={file}
        handleOpen={handleOpen}
        fileRef={fileRef}
        imagePreview={imagePreview}
      />
    );
  };
}

const GridFileCard = FileCardHoc(_GridFileCard);

const ListFileCard = FileCardHoc(_ListFileCard);

export { GridFileCard, ListFileCard };
