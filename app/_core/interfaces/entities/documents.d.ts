/* FILE_DESC +=> =====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
==========================================//======= */

type DocumentType = 'FILE' | 'FOLDER';

type IStorageUnit = 'Kb' | 'Mb' | 'Gb' | 'Tb';

type StoragePlanLabels = 'SIGMA' | 'OMEGA' | 'ZETA' | 'GAMMA' | 'BETA' | 'ALPHA';

type StoragePlanIds = '0' | '1' | '2' | '3' | '4' | '5';

interface IDocument {
  id: string;
  user_id: string;
  name: string;
  parent_id: string; // Id of parent folder should default to 0 for files/folders under root.
  type: DocumentType;
  content_type: string; // eg. image/png, image/jpg, video/mp4 etc or null for when it's folders
  download_url: string | null; // null when it's folders
  extension: string | null; // file extention for when it's files;
  capacity: {
    size: number; // size in Mbs or Gbs
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

interface IUserProfile {
  id: string;
  email: string;
  date_of_birth: Date | string;
  phone_number: string;
  plan: {
    id: string;
    is_free: boolean;
    total_capacity: number;
    used_space: number;
  };
};

interface IStoragePlan {
  id?: string;
  label: StoragePlanLabels;
  icon_url: string;
  capacity: number;
  rate: string;
  is_free: boolean;
}

export type {
  IDocument,
  IStorageUnit,
  StoragePlanIds,

  IUser,
  IUserProfile,
  DocumentType,

  // storage plan
  IStoragePlan,
  StoragePlanLabels
};
