/* TODO +=> =======================================
| Implement implement simple app utility functions |
================================================ */

const shortenText = (text: string, max_length: number): string => {
  const isLong = text.length >= max_length + 1;

  return isLong ? text.substring(0, max_length).trim() + '...' : text;
};

const openFileUploadDialog = () => {
  /* FUNC_DESC +=> ==============================================================================
  | This function simulates a click on the file-upload input field in the FilesFolderDisplayPage |
  | component in app/(strictly-protected)/home/_components/files-folder-display-page/            |
  | this is so as to open the file select dialog. It has been used as the action function in the |
  | content of context Menus that have an Upload file(s) option                                  |
  ================================================================================//=============*/
  const fileUploadField = document.querySelector<HTMLInputElement>('#file-upload-field');

  if (!fileUploadField) return;

  fileUploadField.click();
};

export {
  shortenText,

  openFileUploadDialog,
};
