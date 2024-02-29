// TODO +=> UPLOAD STORAGE PLANS TO ONLINE DB AND MAKE API REQUEST TO GET IT.

import type { IStoragePlan } from '@/interfaces/entities';

const STORAGE_PLANS: IStoragePlan[] = [
  {
    label: 'SIGMA',
    icon_url: '/storage-plans/sigma.svg',
    capacity: 1.5,
    rate: '0 XAF / Month',
    is_free: true,
  },
  {
    label: 'OMEGA',
    icon_url: '/storage-plans/omega.svg',
    capacity: 15,
    rate: '500 XAF / Month',
    is_free: false,
  },
  {
    label: 'ZETA',
    icon_url: '/storage-plans/zeta.svg',
    capacity: 40,
    rate: '1000 XAF / Month',
    is_free: false,
  },
  {
    label: 'GAMMA',
    icon_url: '/storage-plans/gamma.svg',
    capacity: 85,
    rate: '1500 XAF / Month',
    is_free: false,
  },
  {
    label: 'BETA',
    icon_url: '/storage-plans/beta.svg',
    capacity: 190,
    rate: '2000 XAF / Month',
    is_free: false,
  },
  {
    label: 'ALPHA',
    icon_url: '/storage-plans/alpha.svg',
    capacity: 400,
    rate: '2500 XAF / Month',
    is_free: false,
  },
];

export {
  STORAGE_PLANS,
};
