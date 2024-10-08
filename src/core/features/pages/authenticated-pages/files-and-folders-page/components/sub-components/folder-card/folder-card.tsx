"use client";

import {
  DocNameWithToolTip,
  GridCardContainer,
  ListCardContainer,
} from "../shared";
import { DivCard, TextTag } from "@/core/components/atoms";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { shortenText } from "@/core/utils/helpers";
import { FILE_FOLDER_MAX_NAME_LENGTH } from "@/core/utils/constants";
import { MEDIA_ICONS } from "@/core/ui/icons";
import Image from "next/image";

import type { MouseEventHandler } from "react";
import type { SharedCardProps } from "../shared";
import { FolderContextMenu } from "./folder-context-menu";
import { useSelectionStore } from "@/providers/stores/zustand";

interface Props extends SharedCardProps {
  //
}

interface CardComponentProps extends Props {
  // doc: Document already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  folderLength: number;
}

function _GridFolderCard({
  doc: folder,
  folderLength,
  handleOpen,
}: CardComponentProps) {
  return (
    <GridCardContainer document={folder} onDoubleClick={handleOpen}>
      <Image
        src={MEDIA_ICONS.folder}
        alt="file icon"
        width={100}
        height={100}
        className="w-full"
      />

      <DivCard className="w-full flex-col items-start">
        <DivCard className="mt-[5px]">
          <DocNameWithToolTip title={folder.name}>
            <TextTag className="m-0 text-[0.9rem] font-[500]">
              {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH)}
            </TextTag>
          </DocNameWithToolTip>
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
  handleOpen,
}: CardComponentProps) {
  return (
    <>
      <ListCardContainer document={folder} onDoubleClick={handleOpen}>
        <span className="inline-block min-w-[40px]">
          <Image
            src={MEDIA_ICONS.folder}
            alt="file icon"
            width={32}
            height={30}
          />
        </span>

        <DivCard className="w-full justify-between">
          <DocNameWithToolTip title={folder.name}>
            <TextTag className="m-0 inline-block w-full max-w-[calc(100%_-_100px)] overflow-hidden text-ellipsis whitespace-nowrap text-left text-[0.8rem] font-[500] sm:text-[0.9rem]">
              {folder.name}
            </TextTag>
          </DocNameWithToolTip>

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

    const { selectionStart } = useSelectionStore();

    const handleOpen = () => {
      if (selectionStart) return; // to prevent opening folders when selection has started

      router.push("/r-drive/root/" + folder.id);
    };

    return (
      <FolderContextMenu doc={folder}>
        <CardComponent
          doc={folder}
          handleOpen={handleOpen}
          folderLength={folderLength}
        />
      </FolderContextMenu>
    );
  };
}

const GridFolderCard = FolderCardHoc(_GridFolderCard);

const ListFolderCard = FolderCardHoc(_ListFolderCard);

export { GridFolderCard, ListFolderCard };
