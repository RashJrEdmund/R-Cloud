import type { IStorageUnit } from '@/interfaces/entities';

const FILE_FOLDER_MAX_NAME_LENGTH = 10; // used for creating ellipsis;

const STORAGE_UNIT_LIST: IStorageUnit[] = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];

export {
  FILE_FOLDER_MAX_NAME_LENGTH,
  STORAGE_UNIT_LIST,
};
