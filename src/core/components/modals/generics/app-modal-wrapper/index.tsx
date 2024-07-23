"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { ModalWrapperRef } from "..";
import { DivCard, Overlay } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { CONTEXT_MENU_ICONS } from "@/core/ui/icons";
import { cn } from "@/core/lib/utils";

import Image from "next/image";
import type { ForwardedRef, LegacyRef, MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;

  use_base_btns_instead?: boolean; // false by default

  confirmAction?: Function;
  cancelAction?: Function;
  confirmMsg?: string;
  cancelMsg?: string;

  isLoading?: boolean;
  loadingMsg?: string;

  prevent_auto_focus?: boolean; // to prevent the dialog's auto focus effect

  sxContainer?: string;
}

function AppModalWrapper(
  {
    children,
    confirmMsg,
    cancelMsg,
    confirmAction,
    cancelAction,

    use_base_btns_instead = false,
    isLoading = false,
    loadingMsg = "Loading...",

    prevent_auto_focus = false,

    sxContainer = "",
  }: Props,
  _ref: ForwardedRef<ModalWrapperRef>
) {
  const dialogRef = useRef<HTMLDialogElement>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalClose = () => {
    if (isLoading) return;

    if (cancelAction) {
      cancelAction();
      return;
    }
    dialogRef.current?.close();
  };

  useImperativeHandle(_ref, () => {
    return {
      open() {
        setShowModal(true);
        dialogRef.current?.showModal();
      },
      close() {
        dialogRef.current?.close();
        setShowModal(false);
      },
      isOpen: showModal,
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showModal]);

  return (
    <>
      <dialog
        ref={dialogRef as LegacyRef<HTMLDialogElement>}
        autoFocus={!prevent_auto_focus}
      >
        <Overlay
          isOpen={showModal}
          onClick={handleModalClose}
          className="z-[9]"
        />

        {showModal ? (
          <DivCard
            className={cn(
              "fixed left-1/2 top-1/2 z-10 min-h-[180px] w-[min(97vw,_400px)] -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-between gap-4 rounded-[8px] bg-app_bg text-app_text",
              sxContainer
            )}
          >
            {!use_base_btns_instead && (
              <Image
                src={CONTEXT_MENU_ICONS.close}
                alt="Show more"
                className="cursor-pointer"
                height={24}
                width={24}
                onClick={handleModalClose}
                style={{ alignSelf: "end" }}
              />
            )}

            <DivCard className="mt-4 w-full flex-col items-start justify-start gap-[10px]">
              {children}
            </DivCard>

            {use_base_btns_instead && (
              <DivCard className="mt-4 w-full justify-end gap-4">
                <Button
                  variant="error"
                  className={cn(
                    // className="rounded-[5px]"
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={cancelAction as MouseEventHandler<HTMLButtonElement>}
                  disabled={isLoading}
                >
                  {cancelMsg || "Cancel"}
                </Button>

                <Button
                  variant="blued"
                  className={cn(
                    // className="rounded-[5px]"
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={
                    confirmAction as MouseEventHandler<HTMLButtonElement>
                  }
                  disabled={isLoading}
                >
                  {isLoading ? loadingMsg : confirmMsg || "Confirm"}
                </Button>
              </DivCard>
            )}
          </DivCard>
        ) : null}
      </dialog>
    </>
  );
}

export default forwardRef(AppModalWrapper);
