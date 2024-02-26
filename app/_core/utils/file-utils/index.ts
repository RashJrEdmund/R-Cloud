const isDirectory = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isDirectory;
};

const isFile = (item: DataTransferItem) => {
  return item.kind === 'file' && item.webkitGetAsEntry()?.isFile;
};

const getFileName = (file: File) => file.name + '-' + Date.now() + file.type.split('/').pop();

export {
  isDirectory,
  isFile,

  getFileName,
};
