"use client";

import { SelectCheckbox, StyledDisplayCard } from "../shared";
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
import type { ISharedCardProps } from "../shared";
import type { ContextMenuContent } from "@/core/interfaces/app";

interface Props extends ISharedCardProps {
  //
}

interface ICardComponentProps extends Props {
  // doc: Document already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  folderRef: MutableRefObject<HTMLDivElement | undefined>;
  folderLength: number;
}

function _GridFolderCard({
  doc: folder,
  folderLength,
  folderRef,
  handleOpen,
}: ICardComponentProps) {
  return (
    <StyledDisplayCard ref={folderRef as any} onDoubleClick={handleOpen}>
      <SelectCheckbox document={folder} />

      <Image
        src={MEDIA_ICONS.folder}
        alt="file icon"
        width={100}
        height={100}
      />

      <DivCard className="flex-col items-start">
        <DivCard className="mt-[5px]">
          <TextTag title={folder.name} weight="500" size="0.9rem" margin="0">
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </DivCard>

        <DivCard className="mt-[10px] w-full justify-start gap-[5px]">
          <TextTag color_type="grayed" size="0.75rem" no_white_space>
            {folderLength > 0
              ? folderLength + ` item${folderLength > 1 ? "s" : ""}`
              : "Empty"}
          </TextTag>

          <TextTag color_type="grayed" size="0.75rem" no_white_space>
            {folderLength > 0 ? folder.capacity.size : null}
          </TextTag>
        </DivCard>
      </DivCard>
    </StyledDisplayCard>
  );
}

function _ListFolderCard({
  doc: folder,
  folderLength,
  folderRef,
  handleOpen,
}: ICardComponentProps) {
  return (
    <>
      <DivCard
        ref={folderRef as any}
        className="card relative w-full cursor-pointer flex-nowrap justify-start p-[12px_10px]"
        onDoubleClick={handleOpen}
      >
        <SelectCheckbox document={folder} />

        <Image
          src={MEDIA_ICONS.folder}
          alt="file icon"
          width={32}
          height={30}
        />

        <DivCard className="mb-[10px]">
          <TextTag
            title={folder.name}
            weight="500"
            size="0.9rem"
            no_white_space
          >
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH + 14)}
          </TextTag>

          <DivCard className="w-full justify-start gap-[5px]">
            <TextTag color_type="grayed" size="0.75rem" no_white_space>
              {folderLength > 0
                ? folderLength + ` item${folderLength > 1 ? "s" : ""}`
                : "Empty"}
            </TextTag>

            <TextTag color_type="grayed" size="0.75rem" no_white_space>
              {folderLength > 0 ? folder.capacity.size : null}
            </TextTag>
          </DivCard>
        </DivCard>
      </DivCard>
    </>
  );
}

// HOC STARTS HERES

function FolderCardHoc(
  CardComponent: (props: ICardComponentProps) => JSX.Element
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
}

const GridFolderCard = FolderCardHoc(_GridFolderCard);

const ListFolderCard = FolderCardHoc(_ListFolderCard);

export { GridFolderCard, ListFolderCard };
