"use client";

import { SelectCheckbox, GridCardContainer, ListCardContainer } from "../shared";
import Image from "next/image";
import { DivCard, TextTag } from "@/core/components/atoms";
import { useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { shortenText } from "@/core/utils/helpers";
import { FILE_FOLDER_MAX_NAME_LENGTH } from "@/core/utils/constants";
import {
  useContextMenuContext,
  useModalContext,
} from "@/providers/stores/context";
import { CONTEXT_MENU_ICONS, MEDIA_ICONS } from "@/core/ui/icons";

import type { MutableRefObject, MouseEventHandler } from "react";
import type { SharedCardProps } from "../shared";
import type { ContextMenuContent } from "@/core/interfaces/app";

interface Props extends SharedCardProps {
  //
};

interface CardComponentProps extends Props {
  // doc: Document already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  folderRef: MutableRefObject<HTMLDivElement | undefined>;
  folderLength: number;
};

function _GridFolderCard({
  doc: folder,
  folderLength,
  folderRef,
  handleOpen,
}: CardComponentProps) {
  return (
    <GridCardContainer ref={folderRef as any} onDoubleClick={handleOpen}>
      <SelectCheckbox document={folder} />

      <Image
        src={MEDIA_ICONS.folder}
        alt="file icon"
        width={100}
        height={100}
      />

      <DivCard className="flex-col items-start w-full">
        <DivCard className="mt-[5px]">
          <TextTag title={folder.name} className="m-0 text-[0.9rem] font-[500]">
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </DivCard>

        <DivCard className="mt-[10px] w-full justify-start gap-[5px]">
          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {folderLength > 0
              ? folderLength + ` item${folderLength > 1 ? "s" : ""}`
              : "Empty"}
          </TextTag>

          <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
            {folderLength > 0 ? folder.capacity.size : null}
          </TextTag>
        </DivCard>
      </DivCard>
    </GridCardContainer>
  );
}

function _ListFolderCard({
  doc: folder,
  folderLength,
  folderRef,
  handleOpen,
}: CardComponentProps) {
  return (
    <>
      <ListCardContainer
        ref={folderRef as any}
        onDoubleClick={handleOpen}
      >
        <SelectCheckbox document={folder} />

        <span className="inline-block min-w-[40px]">
          <Image
            src={MEDIA_ICONS.folder}
            alt="file icon"
            width={32}
            height={30}
          />
        </span>

        <DivCard className="w-full justify-between">
          <TextTag
            title={folder.name}
            className="inline-block m-0 whitespace-nowrap text-ellipsis overflow-hidden w-full max-w-[calc(100%_-_100px)] text-[0.8rem] sm:text-[0.9rem] font-[500] text-left"
          >
            {folder.name}
          </TextTag>

          <DivCard className="w-fit min-w-[90px] justify-between gap-[5px]">
            <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
              {folderLength > 0
                ? folderLength + ` item${folderLength > 1 ? "s" : ""}`
                : "Empty"}
            </TextTag>

            <TextTag className="whitespace-nowrap text-[0.75rem] text-app_text_grayed">
              {folderLength > 0 ? folder.capacity.size : null}
            </TextTag>
          </DivCard>
        </DivCard>
      </ListCardContainer>
    </>
  );
}

// HOC STARTS HERES

function FolderCardHoc(
  CardComponent: (props: CardComponentProps) => JSX.Element
) {
  /* FUNC_DESC +=> ===================================================================
  | Could not bring myself to copying the same logic and using in both variations of |
  | the FolderCard components so i built this high order component to handle all the |
  | necessary computation, and then pass down props to each variation                |
  ================================================================//================*/
  return function Card({ doc: folder }: Props) {
    const router = useRouter();
    const folderLength = useMemo(
      () => Number(folder?.capacity?.length),
      [folder?.capacity?.length]
    );
    const folderRef = useRef<HTMLDivElement>();

    const {
      handleDocCardContextMenu,

      selectionStart,
    } = useContextMenuContext();

    const { openEditDocumentModal, openDeleteDocumentModal } =
      useModalContext();

    const handleOpen = () => {
      if (selectionStart) return; // to prevent opening folders when selection has started

      router.push("/r-drive/root/" + folder.id);
    };

    const FOLDER_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(
      () => [
        {
          text: "Open Folder",
          icon_url: CONTEXT_MENU_ICONS.open,
          action: handleOpen,
        },
        {
          text: "Rename Folder",
          icon_url: CONTEXT_MENU_ICONS.rename,
          action: () => openEditDocumentModal(folder),
        },
        {
          text: "Delete Folder",
          icon_url: CONTEXT_MENU_ICONS.delete,
          action: () => openDeleteDocumentModal(folder),
        },
      ],
      [selectionStart]
    );

    const handleContext = (e: MouseEvent) => {
      handleDocCardContextMenu({
        event: e,
        CONTEXT_MENU_CONTENT: FOLDER_CONTEXT_MENU_CONTENT,
      });
    };

    useEffect(() => {
      if (!folderRef.current) return;

      folderRef.current.addEventListener("contextmenu", handleContext, false);

      return () => {
        folderRef.current?.removeEventListener(
          "contextmenu",
          handleContext,
          false
        );
      };
    }, [selectionStart]);

    return (
      <CardComponent
        doc={folder}
        handleOpen={handleOpen}
        folderRef={folderRef}
        folderLength={folderLength}
      />
    );
  };
};

const GridFolderCard = FolderCardHoc(_GridFolderCard);

const ListFolderCard = FolderCardHoc(_ListFolderCard);

export { GridFolderCard, ListFolderCard };
