import type { IDocument } from '@/interfaces/entities';

const userId = '<my user id>';

export const dummyData: IDocument[] = [
  {
    id: '123',
    user_id: userId,
    filename: null,
    name: 'Photos',
    parent_id: 'root',
    ancestor_ids: ['root'],
    type: 'FOLDER',
    content_type: '',
    download_url: '',
    extension: '',
    capacity: {
      size: '7 Mb',
      bytes: 7 * 1024,
      length: 3,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'abc',
    user_id: userId,
    name: 'Music',
    parent_id: 'root',
    ancestor_ids: ['root'],
    filename: null,
    type: 'FOLDER',
    content_type: '',
    download_url: '',
    extension: '',
    capacity: {
      size: '3 Mb',
      bytes: 3 * 1024,
      length: 2,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'jkl',
    user_id: userId,
    name: 'Elephant',
    parent_id: 'root',
    ancestor_ids: ['root'],
    filename: 'Elephant.png',
    type: 'FILE',
    content_type: 'image/png',
    download_url: 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg',
    extension: '.png',
    capacity: {
      size: '15 Mb',
      bytes: 15 * 1024,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },
];
