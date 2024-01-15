/* FILE_DESC +=> ====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
================================================= */

type DocumentType = 'FILE' | 'FOLDER';

interface IDocument {
  id: string;
  userId: string;
  name: string;
  path: string;
  pathIds: string; // is a path to a file base on folder is. eg /0/123/456/789 where zero is Home
  type: DocumentType;
  contentType: string; // eg. image/png, image/jpg, video/mp4 etc or null for when it's folders
  downloadUrl: string; // null when it's folders
  extension: string; // file extention for when it's files;
  capacity: {
    size: string; // size in Mbs or Gbs
    length: string | number | null; // number of items if it's a folder or null if it's a file
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

interface IUser {
  id: string;
  email: string;
  username: string;
  date_of_birth: Date | string;
  phone_number: string;
  photo_url: string;
  accessToken: string;
  metadata: {
    createdAt: Date | string;
    creationTime: Date | string;
    lastLoginAt: Date | string;
    lastSignInTime: Date | string;
  }
}

export type {
  IDocument,
  IUser,
  DocumentType,
};
