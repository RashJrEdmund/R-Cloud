/* FILE_DESC +=> =====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
==========================================//======= */

type DocumentType = "FILE" | "FOLDER";

type ViewerRoles = "VIEWER" | "EDITOR";

type AccessType = "RESTRICTED" | "PUBLIC";

interface Document {
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
  sharedState: {
    isShared: boolean;
    accessType: AccessType;
    viewerRole: ViewerRoles;
    sharedWith: string[];
    firstSharedAt: Date | string | null;
    lastModified: Date | string | null;
  };
};

interface SharedDocument {
  doc_id: string;
  download_url: string;
  name: string;
  content_type: string;
  extension: string;
  type: DocumentType;
  extension: string | null; // file extension for when it's files;
  capacity: {
    size: string; // size in Mbs or Gbs
    bytes: number; // actual bytes
  };
  /**
   * sharer's email
  */
 shared_by: string;
 accessType: AccessType;
 viewerRole: ViewerRoles;
 sharedWith: string[];
 firstSharedAt: Date | string;
 lastModified: Date | string;
};

export type { Document, DocumentType, SharedDocument };
