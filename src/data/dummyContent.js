const poster = (name) => `/posters/${name}.jpg`;
const backdrop = (name) => `/backdrops/${name}.jpg`;

export const heroContent = {
  title: 'Stranger Things',
  subtitle: 'NETFLIX',
  backdrop: backdrop('stranger-things'),
  rating: 'TV-MA',
};

export const contentRows = [
  {
    id: 'top',
    title: 'Top Picks for You',
    items: [
      { id: 'tp1', title: 'Stranger Things', image: poster('stranger-things'), badge: 'Top 10' },
      { id: 'tp2', title: 'Breaking Bad', image: poster('breaking-bad'), badge: null },
      { id: 'tp3', title: 'Wednesday', image: poster('wednesday'), badge: 'Top 10' },
      { id: 'tp4', title: 'The Witcher', image: poster('the-witcher'), badge: null },
      { id: 'tp5', title: 'Bridgerton', image: poster('bridgerton'), badge: null },
    ],
  },
  {
    id: 'favorites',
    title: 'Fan Favorites',
    items: [
      { id: 'ff1', title: 'Money Heist', image: poster('money-heist'), badge: 'Recently Added' },
      { id: 'ff2', title: 'The Crown', image: poster('the-crown'), badge: null },
      { id: 'ff3', title: 'Ozark', image: poster('ozark'), badge: null },
      { id: 'ff4', title: 'Lucifer', image: poster('lucifer'), badge: null },
      { id: 'ff5', title: 'Black Mirror', image: poster('black-mirror'), badge: null },
    ],
  },
];
