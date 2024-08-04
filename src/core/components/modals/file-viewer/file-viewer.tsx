import { useCallback, useEffect, useMemo, useState } from "react";
import type { Document } from "@/core/interfaces/entities";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDocStore } from "@/providers/stores/zustand";
import Viewer from "./viewer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FileViewer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currenFile, setCurrentFile] = useState<Document>({} as Document);
  const [currentIndx, setCurrentIndx] = useState<number>(0);
  const [viewerOpen, setViewerOpen] = useState<boolean>(false);

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

  const handleModalClose = (open: boolean) => {
    if (!open) {
      // meaning trying to close modal
      router.replace(pathname);

      setViewerOpen(false);
      return;
    }

    console.log({ open });

    setViewerOpen(true);
  };

  useEffect(() => {
    const fileId = searchParams.get("viewing"); // this params is set whenever a file is opened, and it's value set to the file's Id.

    if (!files || !fileId?.trim()) {
      if (viewerOpen) setViewerOpen(false);
      return;
    }

    const curIndx = getCurrentIdex(fileId);

    setCurrentIndx(curIndx);

    setCurrentFile(files[curIndx]);

    if (!viewerOpen) {
      // if it's closed, we open it here
      setViewerOpen(true);
    }
  }, [searchParams, files, getCurrentIdex]);

  return (
    <Dialog open={viewerOpen} onOpenChange={handleModalClose}>
      <DialogContent className="flex h-[min(80vh,_1000px)] w-full max-w-[min(97vw,_1300px)] flex-col items-center justify-center border border-app_border bg-transparent">
        <DialogHeader className="w-fit">
          <DialogDescription className="w-fit text-center">
            {currenFile?.name}
          </DialogDescription>
        </DialogHeader>

        {!!(files && files[currentIndx - 1]) ? (
          <ChevronLeft
            size={20}
            height={35}
            onClick={() => handMotion("PREV")}
            className="absolute left-0 top-1/2 h-7 w-7 cursor-pointer rounded-full bg-app_blue text-app_text_white xl:h-9 xl:w-9"
          />
        ) : null}

        <Viewer fileInView={currenFile} />

        {!!(files && files[currentIndx + 1]) ? (
          <ChevronRight
            size={20}
            onClick={() => handMotion("NEXT")}
            className="absolute right-0 top-1/2 h-7 w-7 cursor-pointer rounded-full bg-app_blue text-app_text_white xl:h-9 xl:w-9"
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
