import { IStorageUnit } from '@/interfaces/entities';
import { STORAGE_UNIT_LIST } from '../constants';

const isDirectory = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isDirectory;
};

const isFile = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isFile;
};

const getFileName = (file: File) => {
  const name_arr = file.name.split('.');

  const extension = name_arr.pop() || file.type.split('/').pop() || 'unknown'; // for unknown files
  const name = name_arr.join('.');

  return name + '-' + Date.now() + '.' + extension;
};

const getSize = (file_size: number, unit: IStorageUnit = 'Mb'): string => {
  return file_size + ' ' + unit;
};

const getSizeFromBytes = (bytes: number, _decimals: number = 2): {
  size: number;
  units: string;
  merged: string;
} => {
  if (bytes <= 0 || isNaN(bytes)) return {
    size: 0,
    units: STORAGE_UNIT_LIST[0],
    merged: 0 + ' ' + STORAGE_UNIT_LIST[0],
  };

  const k = 1024;
  const dm = _decimals < 0 ? 0 : _decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size: number = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  const units: string = STORAGE_UNIT_LIST[i];
  return {
    size,
    units,
    merged: size + ' ' + units
  };
};

export {
  isDirectory,
  isFile,

  getFileName,

  getSize,
  getSizeFromBytes,
};
