import { useState, useRef, useEffect } from 'react';
import { heroContent, contentRows } from '../data/dummyContent';
import tmdbCache from '../data/tmdbCache.json';
import './HomePage.css';

export default function HomePage({ onSignOut }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [hero, setHero] = useState(heroContent);
  const [rows, setRows] = useState(contentRows);
  const profileRef = useRef(null);

  useEffect(() => {
    const tmdbKey = import.meta.env.VITE_TMDB_KEY;
    let canceled = false;

    const img = (path, size = 'w500') => {
      if (!path) return null;
      if (path.startsWith('http')) return path;
      return `https://image.tmdb.org/t/p/${size}${path}`;
    };

    const toItems = (list) =>
      (list || []).slice(0, 8).map((item, index) => ({
        id: String(item.id ?? item.title ?? index),
        title: item.title || item.name || 'Untitled',
        image: img(item.poster_path) || img(item.backdrop_path) || heroContent.backdrop,
        badge: index < 3 ? 'Top 10' : null,
      }));

    const applyData = (data) => {
      if (!data) return;
      const heroItem = (data?.trending?.results || [])[0];
      if (heroItem) {
        setHero({
          title: heroItem.title || heroItem.name || heroContent.title,
          subtitle: 'NETFLIX',
          backdrop: img(heroItem.backdrop_path, 'original') || heroContent.backdrop,
          rating: heroContent.rating,
        });
      }

      const nextRows = [
        {
          id: 'trending',
          title: 'Trending Now',
          items: toItems(data?.trending?.results),
        },
        {
          id: 'popular-movies',
          title: 'Popular Movies',
          items: toItems(data?.movies?.results),
        },
        {
          id: 'popular-tv',
          title: 'Popular TV',
          items: toItems(data?.tv?.results),
        },
      ].filter((row) => row.items.length > 0);

      if (nextRows.length > 0) {
        setRows(nextRows);
      }
    };

    async function loadTmdb() {
      if (!tmdbKey) {
        applyData(tmdbCache);
        return;
      }

      try {
        const [trendingRes, moviesRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${tmdbKey}`),
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbKey}`),
        ]);

        const [trending, movies, tv] = await Promise.all([
          trendingRes.json(),
          moviesRes.json(),
          tvRes.json(),
        ]);

        if (canceled) return;
        applyData({ trending, movies, tv });
      } catch (err) {
        console.warn('TMDB fetch failed, using cached data.', err);
        if (!canceled) applyData(tmdbCache);
      }
    }

    loadTmdb();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header-left">
          <div className="home-logo">NETFLIX</div>
          <nav className="home-nav">
            <a href="#home" className="home-nav-link active">Home</a>
            <a href="#shows" className="home-nav-link">Shows</a>
            <a href="#movies" className="home-nav-link">Movies</a>
            <a href="#games" className="home-nav-link">Games</a>
            <a href="#new" className="home-nav-link">New & Popular</a>
            <a href="#list" className="home-nav-link">My List</a>
            <a href="#browse" className="home-nav-link">Browse by Languages</a>
          </nav>
        </div>
        <div className="home-header-right">
          <button type="button" className="home-icon-btn" aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button type="button" className="home-icon-btn home-notifications" aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="home-notif-badge">14</span>
          </button>
          <div className="home-profile-wrap" ref={profileRef}>
            <button
              type="button"
              className="home-profile"
              onClick={() => setProfileOpen((o) => !o)}
              aria-expanded={profileOpen}
              aria-haspopup="true"
            >
              <div className="home-profile-avatar" />
              <span className="home-profile-chevron">▼</span>
            </button>
            {profileOpen && (
              <div className="home-profile-dropdown">
                <button type="button" className="home-profile-dropdown-item" onClick={onSignOut}>
                  Sign out of Netflix
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="home-hero" style={{ backgroundImage: `url(${hero.backdrop})` }}>
        <div className="home-hero-gradient" />
        <div className="home-hero-content">
          <span className="home-hero-brand">{hero.subtitle}</span>
          <h2 className="home-hero-title">{hero.title}</h2>
          <div className="home-hero-actions">
            <button type="button" className="home-hero-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button type="button" className="home-hero-more">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              More Info
            </button>
          </div>
        </div>
        <div className="home-hero-right">
          <button type="button" className="home-hero-volume" aria-label="Volume">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </button>
          <span className="home-hero-rating">{hero.rating}</span>
        </div>
      </section>

      <div className="home-rows">
        {rows.map((row) => (
          <section key={row.id} className="home-row">
            <h3 className="home-row-title">{row.title}</h3>
            <div className="home-row-scroll">
              <div className="home-row-inner">
                {row.items.map((item) => (
                  <div key={item.id} className="home-thumb">
                    <div className="home-thumb-img-wrap">
                      <img src={item.image} alt="" className="home-thumb-img" />
                      {item.badge && (
                        <span className="home-thumb-badge">{item.badge}</span>
                      )}
                      {row.progressBar && item.progress != null && (
                        <div className="home-thumb-progress">
                          <div
                            className="home-thumb-progress-fill"
                            style={{ width: `${item.progress * 100}%` }}
                          />
                        </div>
                      )}
                      <div className="home-thumb-netflix-n" aria-hidden>N</div>
                    </div>
                    <p className="home-thumb-title">{item.title}</p>
                  </div>
                ))}
              </div>
              <button type="button" className="home-row-arrow home-row-arrow-right" aria-label="Scroll right">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
