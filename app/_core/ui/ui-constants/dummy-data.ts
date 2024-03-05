import type { IDocument } from '@/interfaces/entities';

const userId = '<my user id>';

export const dummyData: IDocument[] = [
  {
    id: '123',
    user_id: userId,
    name: 'Photos',
    parent_id: '0',
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
    parent_id: '0',
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
    parent_id: '0',
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
