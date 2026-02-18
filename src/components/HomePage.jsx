import { useState, useRef, useEffect } from 'react';
import { heroContent, contentRows } from '../data/dummyContent';
import tmdbCache from '../data/tmdbCache.json';
import {
  getRecentlyViewed,
  trackView,
  removeRecentlyViewed,
  clearRecentlyViewed,
  isUsingApi,
} from '../utils/recentlyViewed';
import './HomePage.css';

export default function HomePage({ onSignOut }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [hero, setHero] = useState(heroContent);
  const [rows, setRows] = useState(contentRows);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const userId = 'demo-user';

  useEffect(() => {
    const tmdbKey = import.meta.env.VITE_TMDB_KEY;
    const useTmdb = String(import.meta.env.VITE_USE_TMDB || '').toLowerCase() === 'true';
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
        image: img(item.backdrop_path, 'w780') || img(item.poster_path, 'w500') || heroContent.backdrop,
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
      if (!useTmdb) {
        return;
      }
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
    let mounted = true;
    const loadRecentlyViewed = async () => {
      const items = await getRecentlyViewed(userId);
      if (mounted) setRecentlyViewed(items);
    };
    loadRecentlyViewed();
    return () => {
      mounted = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!searchOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTrackView = async (rowId, item) => {
    const next = await trackView(userId, {
      id: item.id,
      contentId: item.id,
      title: item.title,
      thumbnailUrl: item.image,
      contentType: rowId,
    });
    if (Array.isArray(next)) {
      setRecentlyViewed(next);
      return;
    }

    if (isUsingApi()) {
      const items = await getRecentlyViewed(userId);
      setRecentlyViewed(items);
    }
  };

  const handleRemoveRecent = async (contentId) => {
    const next = await removeRecentlyViewed(userId, contentId);
    if (Array.isArray(next)) {
      setRecentlyViewed(next);
      return;
    }

    if (isUsingApi()) {
      const items = await getRecentlyViewed(userId);
      setRecentlyViewed(items);
    }
  };

  const handleClearAll = async () => {
    const next = await clearRecentlyViewed(userId);
    if (Array.isArray(next)) {
      setRecentlyViewed(next);
      return;
    }

    if (isUsingApi()) {
      const items = await getRecentlyViewed(userId);
      setRecentlyViewed(items);
    }
  };

  const formatRelativeTime = (iso) => {
    if (!iso) return '';
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.round(diffMs / 60000);
    if (mins < 1) return 'Viewed just now';
    if (mins < 60) return `Viewed ${mins} min ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `Viewed ${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.round(hours / 24);
    return `Viewed ${days} day${days === 1 ? '' : 's'} ago`;
  };

  const allItems = rows.flatMap((row) =>
    row.items.map((item) => ({
      ...item,
      rowId: row.id,
    }))
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults =
    normalizedQuery.length === 0
      ? []
      : allItems.filter((item) => item.title.toLowerCase().includes(normalizedQuery));

  const renderRow = (row) => (
    <section key={row.id} className="home-row">
      <div className="home-row-header">
        <h3 className="home-row-title">{row.title}</h3>
        {row.id === 'recently-viewed' && row.items.length > 0 && (
          <button type="button" className="home-row-clear" onClick={handleClearAll}>
            Clear all
          </button>
        )}
      </div>
      <div className="home-row-scroll">
        <div className="home-row-inner">
          {row.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="home-thumb"
              onClick={() => handleTrackView(row.id, item)}
              aria-label={`View ${item.title}`}
            >
              <div className="home-thumb-img-wrap">
                <img src={item.image} alt="" className="home-thumb-img" />
                {row.id === 'recently-viewed' && (
                  <button
                    type="button"
                    className="home-thumb-remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveRecent(item.id);
                    }}
                    aria-label={`Remove ${item.title}`}
                  >
                    ×
                  </button>
                )}
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
              {row.id === 'recently-viewed' && item.viewedAt && (
                <p className="home-thumb-time">{formatRelativeTime(item.viewedAt)}</p>
              )}
            </button>
          ))}
        </div>
        <button type="button" className="home-row-arrow home-row-arrow-right" aria-label="Scroll right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );

  const recentRow = {
    id: 'recently-viewed',
    title: 'Recently Viewed',
    items: recentlyViewed.map((item) => ({
      id: item.contentId,
      title: item.title,
      image: item.thumbnailUrl,
      viewedAt: item.viewedAt,
      badge: null,
    })),
  };

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
          <button
            type="button"
            className="home-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
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

      {searchOpen && (
        <div className="home-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="home-search-panel" onClick={(event) => event.stopPropagation()}>
            <aside className="home-search-sidebar">
              <div className="home-search-input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button type="button" className="home-search-clear" onClick={() => setSearchQuery('')}>
                    ×
                  </button>
                )}
              </div>
              <nav className="home-search-nav">
                <span className="home-search-nav-item active">Search</span>
                <span className="home-search-nav-item">Home</span>
                <span className="home-search-nav-item">Latest</span>
                <span className="home-search-nav-item">TV Shows</span>
                <span className="home-search-nav-item">Movies</span>
                <span className="home-search-nav-item">My List</span>
                <span className="home-search-nav-item muted">Get Help</span>
                <span className="home-search-nav-item muted">Exit Netflix</span>
              </nav>
            </aside>
            <div className="home-search-results">
              <h3>Popular Searches</h3>
              <div className="home-search-grid">
                {(searchResults.length > 0 ? searchResults : allItems.slice(0, 12)).map((item) => (
                  <button
                    key={`search-${item.id}`}
                    type="button"
                    className="home-search-card"
                    onClick={() => {
                      handleTrackView(item.rowId, item);
                      setSearchOpen(false);
                    }}
                  >
                    <img src={item.image} alt={item.title} />
                    <span className="home-search-card-title">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="home-hero" style={{ backgroundImage: `url(${hero.backdrop})` }}>
        <span className="home-env-badge">
          {isUsingApi() ? 'API Mode' : 'Local Mode'}
        </span>
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
        {recentlyViewed.length > 0 ? (
          renderRow(recentRow)
        ) : (
          <section className="home-row">
            <div className="home-row-header">
              <h3 className="home-row-title">Recently Viewed</h3>
            </div>
            <p className="home-row-empty">Nothing viewed yet. Click any title to see it here.</p>
          </section>
        )}
        {rows.map(renderRow)}
      </div>
    </div>
  );
}
