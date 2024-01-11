import { BgVariants } from '@/components/atoms/common/types';
import {
  IconDefinition,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface IIllustrationContent {
  url: string;
  alt: string;
  description: string;
}

export const LANDING_ILLUSTRATION_CONTENT: IIllustrationContent[] = [
  {
    url: '/landing/save_&_organise_ files.svg',
    alt: 'save_&_organise_ files',
    description: 'Save, organise and download your files',
  },
  {
    url: '/landing/share_files.svg',
    alt: 'share files animation',
    description: 'Find and share your files',
  },
];

export const CTA_CONTENT: {
  title: string;
  text: string;
  url: string;
  bt_bg: BgVariants;
  icon: IconDefinition;
}[] = [
  {
    title: 'go to home',
    text: 'My R-Cloud',
    url: '/home',
    bt_bg: 'blued',
    icon: faArrowRight,
  },
  {
    title: 'go to storage plans',
    text: 'Storage Plans',
    url: '/storage-plans',
    bt_bg: 'invert',
    icon: faArrowRight,
  }
];
