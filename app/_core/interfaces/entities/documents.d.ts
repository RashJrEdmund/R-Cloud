interface IDocument {
  id: string;
  userId: string;
  name: string;
  path: string;
  pathIds: string; // is a path to a file base on folder is. eg /0/123/456/789 where zero is Home
  type: 'FILE' | 'FOLDER';
  contentType: string | null; // eg. image/png, image/jpg, video/mp4 etc or null for when it's folders
  downloadUrl: string | null; // null when it's folders
  extension: string | null; // file extention for when it's files;
  capacity: {
    size: string; // size in Mbs or Gbs
    length: string | number | null; // number of items if it's a folder or null if it's a file
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type {
  IDocument,
};
