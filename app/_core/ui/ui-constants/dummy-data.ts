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
      size: 7,
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
      size: 3,
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
      size: 15,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },

  // Nested FILES AND FOLDERS UNDER PHOTOS DIR
  {
    id: 'wxy',
    user_id: userId,
    name: 'test-folder',
    parent_id: '123', // 123 is id of Photos folder
    type: 'FOLDER',
    content_type: '',
    download_url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    extension: '',
    capacity: {
      size: 0,
      length: 0,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'xyz',
    user_id: userId,
    name: 'photography and some other long name',
    parent_id: '123', // 123 is id of Photos folder
    type: 'FILE',
    content_type: 'image/png',
    download_url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    extension: '.png',
    capacity: {
      size: 5,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'nmo',
    user_id: userId,
    name: 'Camera',
    parent_id: '123',
    type: 'FILE',
    content_type: 'image/png',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '.png',
    capacity: {
      size: 2,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },

  // NESTED FILES AND FOLDERS UNDER MUSIC DIR
  {
    id: 'stu',
    user_id: userId,
    name: 'Test Folder',
    parent_id: 'abc',
    type: 'FOLDER',
    content_type: '',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '',
    capacity: {
      size: 1,
      length: 2,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'pqr',
    user_id: userId,
    name: 'Camera',
    parent_id: 'abc',
    type: 'FILE',
    content_type: 'image/png',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '.png',
    capacity: {
      size: 2,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },
  // NESTED FILES AND FOLDERS UNDER MUSIC/TEST+FOLDER/ DIR
  {
    id: 'stu',
    user_id: userId,
    name: 'my Folder',
    parent_id: 'stu',
    type: 'FOLDER',
    content_type: '',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '',
    capacity: {
      size: 0,
      length: 0,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'pqr',
    user_id: userId,
    name: 'Camera',
    parent_id: 'stu',
    type: 'FILE',
    content_type: 'image/png',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '.png',
    capacity: {
      size: 1,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 'uvw',
    user_id: userId,
    name: 'some song',
    parent_id: 'stu',
    type: 'FILE',
    content_type: 'audio/mp3',
    download_url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    extension: '.mp3',
    capacity: {
      size: 2,
      length: null,
    },
    createdAt: new Date().toDateString(),
  },
];
