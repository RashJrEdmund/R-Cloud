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

const getResponsiveMenuPosition = (
  e: MouseEvent,
  component_approximates?: { height?: number; width?: number }
) => {
  const x = e.clientX;
  const y = e.clientY;

  const menu_width = component_approximates?.width || 220; // approximate
  const menu_height = component_approximates?.height || 240; // approximates

  const screen_width = window.innerWidth;
  const screen_height = window.innerHeight;

  const coordinates = {
    x: 0,
    y: 0,
    extra_x: 0, // how much extra space was added to x axi before causing overflow
    extra_y: 0, // how much extra space was added to y axi before causing overflow
  };

  if (x + menu_width > screen_width) {
    coordinates.x = screen_width - menu_width;
    coordinates.extra_x = x + menu_width - screen_width;
  } else coordinates.x = x;

  if (y + menu_height > screen_height) {
    coordinates.y = screen_height - menu_height;
    coordinates.extra_y = y + menu_height - screen_height;
  } else coordinates.y = y;

  // console.log({ x, y, menu_height, menu_width, screen_height, screen_width, coordinates });

  return coordinates;
};

export {
  shortenText,
  calculatePercentage,
  openFileUploadDialog,
  getResponsiveMenuPosition,
};
