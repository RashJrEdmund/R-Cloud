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

export {
  shortenText,

  getSize,
};
