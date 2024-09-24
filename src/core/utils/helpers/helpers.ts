const shortenText = (text: string, max_length: number): string => {
  const isLong = text.length > max_length;

  return isLong ? text.substring(0, max_length - 3).trim() + "..." : text;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
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

/**
 /* This function simulates a click on the file-upload input field in the FilesFolderDisplayPage
 /* component in app/(strictly-protected)/r-drive/_components/files-folder-display-page/
 /* this is so as to open the file select dialog. It has been used as the action function in the
 /* content of context Menus that have an Upload file(s) option
*/
const openFileUploadDialog = () => {
  const fileUploadField =
    document.querySelector<HTMLInputElement>("#file-upload-field");

  if (!fileUploadField) return;

  fileUploadField.click();
};

const triggerFileDownload = (url: string, filename: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;

  // Set the download attribute with a default filename
  // You can customize the filename if you want
  anchor.download = "filename.png";

  // Append the anchor to the document body
  // document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
};

export {
  shortenText,
  isValidUrl,
  calculatePercentage,
  openFileUploadDialog,
  triggerFileDownload,
};
