import { calculatePercentage } from '.';
import type { IUserProfile } from '@/interfaces/entities';

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

export {
  getUsedSpaceVisualRepresentation,
};
