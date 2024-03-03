/* TODO +=> =======================================
| Implement implement simple app utility functions |
================================================ */

import { IStorageUnit } from '@/interfaces/entities';

const shortenText = (text: string, max_length: number): string => {
  const isLong = text.length >= max_length + 1;

  return isLong ? text.substring(0, max_length).trim() + '...' : text;
};

const getSize = (bare_size: number, unit: IStorageUnit = 'Mb'): string => {
  // const oneGB = 1024;
  return bare_size + ' ' + unit;

  // return (bare_size / oneGB).toFixed(2) + ' ' + unit;
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

  getSize,

  openFileUploadDialog,
};
