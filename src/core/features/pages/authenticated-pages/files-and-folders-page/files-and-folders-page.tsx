"use client";

/* FILE_PURPOSE +=> ==================================
| Just didn't want to repeat rendering <TopSection /> |
| component in the routes r-drive/ and r-drive/[...id]|
| decided to wrap both in a common holder and call    |
| the holder                                          |
=======================================//============*/

import { FilesFolderDisplay, MainAndTopSection } from "./components";
import { PathWrapper } from "@/providers/guards";

import {
  ModalContextProvider,
  ContextMenuContextProvider,
} from "@/providers/stores/context";

interface Props {
  //
}

export default function FilesFolderDisplayPage({}: Props) {
  return (
    <>
      {/* INPUT_DES +=> ========================================================================
      | This is a special input field. The one used to open the select file dialog in the       |
      | FilesFolderDisplay component, and open/activated by the openFileUploadDialog utility    |
      | function in app/_core/utils/helpers/. It's changeEvent is handled by the useEffect in   |
      | FilesFolderDisplay component in app/_core/ui/components/molecules/files-folder-display  |
      | which inturn calls the readyUploadModal function in FilesFolderDisplayContext           |
      =========================================================================//=============*/}

      <PathWrapper>
        {/* IT'S HERE DOCUMENTS ARE FETCHED AS PARAMS CHANGE */}
        <ModalContextProvider>
          <ContextMenuContextProvider>
            <input hidden multiple type="file" id="file-upload-field" />

            <FilesFolderDisplay />
          </ContextMenuContextProvider>
        </ModalContextProvider>
      </PathWrapper>
    </>
  );
};
