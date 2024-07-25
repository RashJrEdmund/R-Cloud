import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { RelativeModal } from "../generics";
import { TextTag } from "@/components/atoms";
import Image from "next/image";

import type { ModalWrapperRef } from "../generics";
import type { ContextMenuContentType } from "@/core/interfaces/app";

interface Props {
  content: ContextMenuContentType[];
  top: string;
  left: string;

  children?: React.ReactNode | null;
}

function ContextMenu(
  {
    content,
    top = "50%",
    left = "50%",

    children = null,
  }: Props,
  _ref: ForwardedRef<ModalWrapperRef>
) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useImperativeHandle(_ref, () => {
    return {
      open() {
        setShowModal(true);
      },
      close() {
        setShowModal(false);
      },
      isOpen: showModal,
    };
  }, [showModal]);

  return (
    <RelativeModal
      showModal={showModal}
      setShowModal={setShowModal}
      position="absolute" // no parent has position relative
      top={top}
      left={left}
    >
      {children}

      {content.map(({ text, icon_url, action }) => (
        <TextTag
          key={text}
          className="cursor-pointer whitespace-nowrap"
          onClick={() => action()}
        >
          <Image
            src={icon_url}
            alt={text}
            className="cursor-pointer"
            height={17}
            width={17}
          />
          {text}
        </TextTag>
      ))}
    </RelativeModal>
  );
}

export default forwardRef(ContextMenu);
