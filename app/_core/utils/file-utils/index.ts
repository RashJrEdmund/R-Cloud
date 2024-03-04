import { IStorageUnit } from '@/interfaces/entities';
import { STORAGE_UNIT_LIST } from '../constants';

const isDirectory = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isDirectory;
};

const isFile = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isFile;
};

const getFileName = (file: File) => file.name + '-' + Date.now() + file.type.split('/').pop();

const getSizeFromBytes = (file_size: number, unit_or_index: number = 0): string => {
  let final_size = file_size;
  let final_index = unit_or_index;

  while (final_size >= 1024 && STORAGE_UNIT_LIST[final_index + 1]) {
    final_size /= 1024;
    final_index += 1;
  };

  return final_size + ' ' + STORAGE_UNIT_LIST[final_index];
};

const getSize = (file_size: number, unit: IStorageUnit = 'Mb'): string => {
  return file_size + ' ' + unit;
};

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export {
  isDirectory,
  isFile,

  getFileName,

  getSizeFromBytes,
  getSize,
};
