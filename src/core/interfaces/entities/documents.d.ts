/* FILE_DESC +=> =====================================
| database entity type definitions (interfaces) have |
| been defined here                                  |
==========================================//======= */

type DocumentType = "FILE" | "FOLDER";

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
}

const Access = {
  READ: "READ",
  WRITE: "WRITE",
} as const;

type DocumentAccess = keyof typeof Access;

interface SharedDocument {
  doc_id: string;
  /**
   * sharer's email
   */
  shared_by: string;
  access: DocumentAccess;
  type: DocumentType;
}

export { Access };

export type { Document, DocumentType, DocumentAccess, SharedDocument };
