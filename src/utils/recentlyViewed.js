const MAX_ITEMS = 10;

const storageKey = (userId) => `netflix-recently-viewed-${userId}`;

const safeParse = (value) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
};

export const getRecentlyViewed = (userId) => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(storageKey(userId));
  const items = safeParse(raw);
  return items
    .filter((item) => item && item.viewedAt)
    .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt))
    .slice(0, MAX_ITEMS);
};

export const trackView = (userId, content) => {
  if (typeof window === 'undefined') return [];
  if (!content || !content.contentId) return getRecentlyViewed(userId);

  const now = new Date().toISOString();
  const current = getRecentlyViewed(userId);
  const filtered = current.filter((item) => item.contentId !== content.contentId);
  const next = [
    {
      id: content.id || content.contentId,
      userId,
      contentId: content.contentId,
      title: content.title,
      thumbnailUrl: content.thumbnailUrl,
      viewedAt: now,
      contentType: content.contentType || 'unknown',
    },
    ...filtered,
  ].slice(0, MAX_ITEMS);

  window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
  return next;
};

export const removeRecentlyViewed = (userId, contentId) => {
  if (typeof window === 'undefined') return [];
  const current = getRecentlyViewed(userId);
  const next = current.filter((item) => item.contentId !== contentId);
  window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
  return next;
};

export const clearRecentlyViewed = (userId) => {
  if (typeof window === 'undefined') return [];
  window.localStorage.removeItem(storageKey(userId));
  return [];
};
