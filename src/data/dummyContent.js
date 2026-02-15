// Placeholder images from picsum.photos (free, no copyright) - replace with real thumbnails later
const img = (id, w = 400, h = 225) =>
  `https://picsum.photos/seed/${id}/${w}/${h}`;

export const heroContent = {
  title: 'KATT WILLIAMS THE LAST REPORT',
  subtitle: 'NETFLIX',
  backdrop: img('hero', 1920, 1080),
  rating: 'TV-MA',
};

export const contentRows = [
  {
    id: 'boredom',
    title: 'Boredom Busters',
    items: [
      { id: 'bb1', title: 'Breaking Bad', image: img('bb1'), badge: null },
      { id: 'bb2', title: 'How to Train Your Dragon', image: img('bb2'), badge: 'Recently Added' },
      { id: 'bb3', title: 'Stranger Things', image: img('bb3'), badge: 'Top 10' },
      { id: 'bb4', title: 'Seinfeld', image: img('bb4'), badge: null },
      { id: 'bb5', title: 'Pixels', image: img('bb5'), badge: null },
      { id: 'bb6', title: 'Independence Day', image: img('bb6'), badge: 'Recently Added' },
      { id: 'bb7', title: 'Suits', image: img('bb7'), badge: null },
      { id: 'bb8', title: 'Peaky Blinders', image: img('bb8'), badge: null },
    ],
  },
  {
    id: 'blockbuster',
    title: 'Blockbuster Movies',
    items: [
      { id: 'bm1', title: 'Spider-Man: Into the Spider-Verse', image: img('bm1'), badge: null },
      { id: 'bm2', title: 'Casino Royale', image: img('bm2'), badge: 'Recently Added' },
      { id: 'bm3', title: 'Anger Management', image: img('bm3'), badge: null },
      { id: 'bm4', title: 'Happy Gilmore 2', image: img('bm4'), badge: null },
      { id: 'bm5', title: 'Night at the Museum', image: img('bm5'), badge: 'Recently Added' },
      { id: 'bm6', title: 'GoldenEye 007', image: img('bm6'), badge: 'Recently Added' },
      { id: 'bm7', title: 'Wednesday', image: img('bm7'), badge: null },
      { id: 'bm8', title: 'Lincoln Lawyer', image: img('bm8'), badge: null },
    ],
  },
  {
    id: 'continue',
    title: 'Continue Watching for Edwin',
    items: [
      { id: 'cw1', title: 'Dahmer', image: img('cw1'), badge: null, progress: 0.35 },
      { id: 'cw2', title: 'Ginny & Georgia', image: img('cw2'), badge: null, progress: 0.6 },
    ],
    progressBar: true,
  },
  {
    id: 'dad',
    title: 'From Dad Jokes to Dad Watches',
    items: [
      { id: 'dj1', title: 'Arrested Development', image: img('dj1'), badge: null },
      { id: 'dj2', title: 'The Last Dance', image: img('dj2'), badge: null },
      { id: 'dj3', title: 'Mrs. Doubtfire', image: img('dj3'), badge: 'Recently Added' },
      { id: 'dj4', title: 'Miracle: The Boys of Winter', image: img('dj4'), badge: 'Recently Added' },
      { id: 'dj5', title: 'Harry and the Hendersons', image: img('dj5'), badge: null },
      { id: 'dj6', title: 'Home Improvement', image: img('dj6'), badge: null },
      { id: 'dj7', title: 'Hellboy', image: img('dj7'), badge: null },
    ],
  },
  {
    id: 'favorites',
    title: 'Familiar Favorites',
    items: [
      { id: 'ff1', title: 'Hellboy', image: img('ff1'), badge: null },
      { id: 'ff2', title: 'Crazy Stupid Love', image: img('ff2'), badge: null },
      { id: 'ff3', title: 'Braveheart', image: img('ff3'), badge: null },
      { id: 'ff4', title: 'The Rip', image: img('ff4'), badge: null },
      { id: 'ff5', title: 'Bridgerton', image: img('ff5'), badge: null },
    ],
  },
];
