/* FILE_DESC +=> =====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
==========================================//======= */

type DocumentType = 'FILE' | 'FOLDER';

type IStorageUnit = 'Bytes' | 'Kb' | 'Mb' | 'Gb' | 'Tb' | 'Pb';

type StoragePlanLabels = 'SIGMA' | 'OMEGA' | 'ZETA' | 'GAMMA' | 'BETA' | 'ALPHA';

type StoragePlanIds = '0' | '1' | '2' | '3' | '4' | '5';

interface IDocument {
  id: string;
  user_id: string;
  name: string;
  parent_id: string; // Id of parent folder should default to 0 for files/root under root.
  ancestor_ids: string[]; // an array of ids of the documents ancestors. 'root', is the very first ancestor.
  type: DocumentType;
  content_type: string | null; // eg. image/png, image/jpg, video/mp4 etc or null for when it's folders
  download_url: string | null; // null when it's folders
  filename: string | null; // null when it's a folder. also adding this to help reference the actual file when trying to delete it
  extension: string | null; // file extension for when it's files;
  capacity: {
    size: string; // size in Mbs or Gbs
    bytes: number; // actual bytes
    length: number | null; // number of items if it's a folder or null if it's a file
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

interface IUserPlan extends IStoragePlan {
  used_bytes: number
};

interface IUserProfile {
  id: string;
  email: string;
  date_of_birth: Date | string;
  phone_number: string;
  plan: IUserPlan;
};

interface IStoragePlan {
  id?: string;
  label: StoragePlanLabels;
  icon_url: string;
  capacity: string; // eg 1.5 Gb
  bytes: number; // eg 1610612736 in bytes
  rate: string;
  is_free: boolean;
}

export type {
  IDocument,
  IStorageUnit,
  StoragePlanIds,

  IUser,
  IUserPlan,
  IUserProfile,
  DocumentType,

  // storage plan
  IStoragePlan,
  StoragePlanLabels
};
