/* TODO +=> =======================================
| Implement implement simple app utility functions |
================================================ */

const shortenText = (text: string, max_length: number): string => {
  const isLong = text.length > max_length;

  return isLong ? text.substring(0, max_length - 3).trim() + "..." : text;
};

const calculatePercentage = (
  a: number,
  b: number
): { ans: number; merged: string } => {
  const ans = (a / b) % 100;
  return {
    ans,
    merged: ans + " " + "%",
  };
};

const openFileUploadDialog = () => {
  /* FUNC_DESC +=> ==============================================================================
  | This function simulates a click on the file-upload input field in the FilesFolderDisplayPage |
  | component in app/(strictly-protected)/r-drive/_components/files-folder-display-page/         |
  | this is so as to open the file select dialog. It has been used as the action function in the |
  | content of context Menus that have an Upload file(s) option                                  |
  ===============================================================================//=============*/

  const fileUploadField =
    document.querySelector<HTMLInputElement>("#file-upload-field");

  if (!fileUploadField) return;

  fileUploadField.click();
};

export { shortenText, calculatePercentage, openFileUploadDialog };
