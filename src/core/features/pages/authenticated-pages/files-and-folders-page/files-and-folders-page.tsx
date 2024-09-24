import { DocDetailsSheet, FilesFolderDisplay } from "./components";
import { PathWrapper } from "@/providers/guards";

import { ModalContextProvider } from "@/providers/stores/context";

export default function FilesFolderDisplayPage() {
  return (
    <PathWrapper>
      <ModalContextProvider>
        {/* This input is among the most important things in app as it helps open upload file-explorer window on our machines */}
        <input hidden multiple type="file" id="file-upload-field" />

        <FilesFolderDisplay />

        <DocDetailsSheet />
      </ModalContextProvider>
    </PathWrapper>
  );
}
