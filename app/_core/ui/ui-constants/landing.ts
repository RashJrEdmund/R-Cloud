import { BgVariants } from '@/components/atoms/common/types';

interface IIllustrationContent {
  url: string;
  alt: string;
  description: string;
}

export const LANDING_ILLUSTRATION_CONTENT: IIllustrationContent[] = [
  {
    url: '/save_&_organise_ files.svg',
    alt: 'save_&_organise_ files',
    description: 'Save, organise and download your files',
  },
  {
    url: '/share_files.svg',
    alt: 'share files animation',
    description: 'Find and share your files',
  },
];

export const CTA_CONTENT: {
  title: string;
  text: string;
  bt_bg: BgVariants;
  icon?: any;
}[] = [
  {
    title: 'go to home',
    text: 'My R-Cloud',
    bt_bg: 'blued',
  },
  {
    title: 'go to storage plans',
    text: 'Storage Plans',
    bt_bg: 'invert',
  }
];
