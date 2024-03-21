import { MEDIA_ICONS } from '@/core/ui/icons';
import { calculatePercentage } from '.';

import type { IDocument, IUserProfile } from '@/interfaces/entities';
import type { IDisplayLayout } from '@/interfaces/app';

const getUsedSpaceVisualRepresentation = (userProfile: IUserProfile | null): number => {
  /* FUNC_DESC +=> ====================================================
  | Used in the for get a nice percentage to beautifully represent the |
  | percentage used in the progress bars that show percentage usage    |
  ==================================================//================*/

  if (!userProfile) return 0;
  const min_return = 3;

  const percentage = +calculatePercentage(userProfile?.plan.used_bytes, userProfile?.plan.bytes).ans.toFixed(2);

  if (percentage === 0) return 0;

  return percentage < min_return ? min_return : percentage;
};

const deriveDocumentPreviewImage = (file: IDocument, displayLayout: IDisplayLayout): { img: string, isCustom?: boolean } => {
  /* FUNC_DESC +=> ====================================================
  | used to derive the icon to represent the file documents on the DOM |
  | used in file-card                                                  |
  ==================================================//================*/

  if (displayLayout === 'LIST') {
    if (file.content_type?.includes('image')) {
      return { img: MEDIA_ICONS.img };
    }
  }

  if (file.content_type?.includes('image') && file.download_url) {
    return { img: file.download_url, isCustom: true }; // adding object-fit: cover; to custom image;
  }

  // The below apply for both LIST and GRID views;

  if (file.content_type?.includes('video')) {
    return { img: MEDIA_ICONS.vid };
  }

  return { img: MEDIA_ICONS.doc };
};

export {
  getUsedSpaceVisualRepresentation,
  deriveDocumentPreviewImage,
};
