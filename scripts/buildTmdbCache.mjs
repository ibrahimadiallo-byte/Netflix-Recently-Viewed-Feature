import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const apiKey = process.env.TMDB_API_KEY || process.env.VITE_TMDB_KEY;

if (!apiKey) {
  console.error('Missing TMDB API key. Set TMDB_API_KEY or VITE_TMDB_KEY.');
  process.exit(1);
}

const endpoints = {
  trending: `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`,
  movies: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
  tv: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`,
};

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

const [trending, movies, tv] = await Promise.all([
  fetchJson(endpoints.trending),
  fetchJson(endpoints.movies),
  fetchJson(endpoints.tv),
]);

const payload = { trending, movies, tv };

const outPath = path.join(projectRoot, 'src', 'data', 'tmdbCache.json');
await fs.writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

console.log(`TMDB cache written to ${outPath}`);
