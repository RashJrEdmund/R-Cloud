import type { StorageUnit } from "@/core/interfaces/entities";

const FILE_FOLDER_MAX_NAME_LENGTH = 10; // used for creating ellipsis;

const STORAGE_UNIT_LIST: StorageUnit[] = [
  "Bytes",
  "Kb",
  "Mb",
  "Gb",
  "Tb",
  "Pb",
];

export { FILE_FOLDER_MAX_NAME_LENGTH, STORAGE_UNIT_LIST };
