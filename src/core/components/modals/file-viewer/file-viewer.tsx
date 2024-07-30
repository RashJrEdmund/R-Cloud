import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import type { Document } from "@/core/interfaces/entities";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDocStore } from "@/providers/stores/zustand";
import Image from "next/image";
import Viewer from "./viewer";
import { StyledViewerContainer } from "./styles";
import { APP_ICONS } from "@/core/ui/icons";
import { TextTag } from "@/components/atoms";

export default function FileViewer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currenFile, setCurrentFile] = useState<Document>({} as Document);
  const [currentIndx, setCurrentIndx] = useState<number>(0);

  const fileViewerRef = useRef<any>();

  const { documents } = useDocStore();

  const handleCancelAction = () => {
    setCurrentFile({} as Document);
    router.replace(pathname);
    // fileViewerRef.current?.close();
  };

  const files = useMemo(() => {
    const _files = (documents || []).filter((doc) => doc.type !== "FOLDER");

    return _files.length ? _files : null;
  }, [documents]);

  const handMotion = (direction: "NEXT" | "PREV") => {
    if (!files) return;

    let newIndx = currentIndx;

    switch (direction) {
      case "NEXT":
        newIndx++;
        break;
      case "PREV":
        newIndx--;
        break;
      default:
        break;
    }

    if (!files[newIndx]) return;

    router.replace(`${pathname}?viewing=${files[newIndx].id}`);
  };

  const getCurrentIdex = useCallback(
    (fileId: string) => {
      if (!files) return 0;

      for (const i in files) {
        const file = files[i];

        if (file.id === fileId) return +i;
      }

      return 0;
    },
    [files]
  );

  useEffect(() => {
    // searchParams.set()
    const fileId = searchParams.get("viewing"); // this params is set whenever a file is opened, and it's value set to the file's Id.

    if (!files || !fileId?.trim()) {
      if (fileViewerRef.current?.isOpen) fileViewerRef.current?.close();
      return;
    }

    const curIndx = getCurrentIdex(fileId);

    setCurrentIndx(curIndx);

    setCurrentFile(files[curIndx]);

    if (!fileViewerRef.current?.isOpen) {
      // if it's closed, we open it here
      fileViewerRef.current?.open();
    }
  }, [searchParams, files, getCurrentIdex]);

  // searchParams.set()

  // console.log({ currenFile });

  return "abeg"

  return (
    <AppModalWrapper
      ref={fileViewerRef as MutableRefObject<ModalWrapperRef>}
      use_base_btns_instead={false}
      prevent_auto_focus
      cancelAction={handleCancelAction}
      sxContainer="min-width: unset; background: none; border: 0.5px solid grey;"
    >
      <StyledViewerContainer>
        {!!(files && files[currentIndx - 1]) ? (
          <Image
            src={APP_ICONS.ctrlLeft}
            draggable={false}
            alt="control left"
            width={35}
            height={35}
            onClick={() => handMotion("PREV")}
            className="control-left"
          />
        ) : null}

        {currenFile ? (
          <TextTag className="file-info left-1/2 top-0 z-[6] m-0 mt-[10px] text-[1rem] font-[500] text-app_text_invert md:absolute md:-translate-x-1/2">
            {currenFile?.name}
          </TextTag>
        ) : null}

        <Viewer fileInView={currenFile} />

        {!!(files && files[currentIndx + 1]) ? (
          <Image
            src={APP_ICONS.ctrlRight}
            draggable={false}
            alt="control right"
            width={35}
            height={35}
            onClick={() => handMotion("NEXT")}
            className="control-right"
          />
        ) : null}
      </StyledViewerContainer>
    </AppModalWrapper>
  );
}
