export interface Post {
  id: number;
  username: string;
  userImage: string;
  location: string;
  postImage: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
}

export const DUMMY_DATA = {
  stories: [
    { id: 1, name: 'Your Story', image: 'https://i.pravatar.cc/150?u=my' },
    { id: 2, name: 'herlambang', image: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'lalat_terbang', image: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'dev_vue', image: 'https://i.pravatar.cc/150?u=4' },
  ],
  posts: [
    {
      id: 101,
      username: 'herlambang_dev',
      userImage: 'https://i.pravatar.cc/150?u=2',
      location: 'Jakarta, Indonesia',
      postImage: 'https://picsum.photos/id/20/800/800',
      caption: 'Slicing UI InstaApp dengan Ionic Vue dalam 3 jam! 🚀 #coding #vuejs',
      likes: 1250,
      hasLiked: false
    },
    {
      id: 102,
      username: 'lalat_terbang',
      userImage: 'https://i.pravatar.cc/150?u=3',
      location: 'Surabaya, Indonesia',
      postImage: 'https://picsum.photos/id/30/800/800',
      caption: 'semangggat buat semua yayayayayayyaya',
      likes: 890,
      hasLiked: true
    }
  ]
};