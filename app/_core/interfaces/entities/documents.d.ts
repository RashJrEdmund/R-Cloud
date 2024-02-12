/* FILE_DESC +=> =====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
==========================================//======= */

type DocumentType = 'FILE' | 'FOLDER';

interface IDocument {
  id: string;
  userId: string;
  name: string;
  path: string;
  parentId: string; // Id of parent folder should default to 0 for files/folders under root.
  type: DocumentType;
  contentType: string; // eg. image/png, image/jpg, video/mp4 etc or null for when it's folders
  downloadUrl: string | null; // null when it's folders
  extension: string | null; // file extention for when it's files;
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
  displayName?: string;
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

type StoragePlanLabels = 'SIGMA' | 'OMEGA' | 'ZETA' | 'GAMMA' | 'BETA' | 'ALPHA';

interface IStoragePlan {
  id?: string;
  label: StoragePlanLabels;
  icon_url: string;
  capacity: string;
  rate: string;
  is_free: boolean;
  is_current_plan: boolean;
}

export type {
  IDocument,
  IUser,
  DocumentType,

  // storage plan
  IStoragePlan,
  StoragePlanLabels
};
