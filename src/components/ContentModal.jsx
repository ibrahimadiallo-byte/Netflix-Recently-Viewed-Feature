import { useEffect } from 'react';
import './ContentModal.css';

export default function ContentModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div
          className="modal-hero"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="modal-hero-gradient" />
          <div className="modal-hero-content">
            <h2 className="modal-title">{item.title}</h2>
            <div className="modal-actions">
              <button type="button" className="modal-play">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button type="button" className="modal-icon-btn" aria-label="Add to My List">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button type="button" className="modal-icon-btn" aria-label="Like">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            {item.badge && <span className="modal-badge">{item.badge}</span>}
            <span className="modal-rating">TV-MA</span>
            <span className="modal-type">
              {item.contentType === 'series' || item.contentType === 'popular-tv'
                ? 'Series'
                : 'Movie'}
            </span>
          </div>
          <p className="modal-description">
            When a mysterious event disrupts the lives of everyone in town,
            a group of unlikely heroes must band together to uncover the
            truth and protect everything they hold dear.
          </p>
        </div>
      </div>
    </div>
  );
}