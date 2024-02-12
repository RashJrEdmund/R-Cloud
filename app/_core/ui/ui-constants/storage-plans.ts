// TODO +=> UPLOAD STORAGE PLANS TO ONLINE DB AND MAKE API REQUEST TO GET IT.

import type { IStoragePlan } from '@/interfaces/entities';

const STORAGE_PLANS: IStoragePlan[] = [
  {
    label: 'SIGMA',
    icon_url: '/storage-plans/sigma.svg',
    capacity: '1 GB',
    rate: '0 XAF / Month',
    is_free: true,
    is_current_plan: true,
  },
  {
    label: 'OMEGA',
    icon_url: '/storage-plans/omega.svg',
    capacity: '5 GB',
    rate: '500 XAF / Month',
    is_free: false,
    is_current_plan: false,
  },
  {
    label: 'ZETA',
    icon_url: '/storage-plans/zeta.svg',
    capacity: '12 GB',
    rate: '1000 XAF / Month',
    is_free: false,
    is_current_plan: false,
  },
  {
    label: 'GAMMA',
    icon_url: '/storage-plans/gamma.svg',
    capacity: '25 GB',
    rate: '2000 XAF / Month',
    is_free: false,
    is_current_plan: false,
  },
  {
    label: 'BETA',
    icon_url: '/storage-plans/beta.svg',
    capacity: '30 GB',
    rate: '1200 XAF / Month',
    is_free: false,
    is_current_plan: false,
  },
  {
    label: 'ALPHA',
    icon_url: '/storage-plans/alpha.svg',
    capacity: '50 GB',
    rate: '2000 XAF / Month',
    is_free: false,
    is_current_plan: false,
  },
];

export {
  STORAGE_PLANS,
};
