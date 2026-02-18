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

const getLocalRecentlyViewed = (userId) => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(storageKey(userId));
  const items = safeParse(raw);
  return items
    .filter((item) => item && item.viewedAt)
    .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt))
    .slice(0, MAX_ITEMS);
};

const trackLocalView = (userId, content) => {
  if (typeof window === 'undefined') return [];
  if (!content || !content.contentId) return getLocalRecentlyViewed(userId);

  const now = new Date().toISOString();
  const current = getLocalRecentlyViewed(userId);
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

const removeLocalRecentlyViewed = (userId, contentId) => {
  if (typeof window === 'undefined') return [];
  const current = getLocalRecentlyViewed(userId);
  const next = current.filter((item) => item.contentId !== contentId);
  window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
  return next;
};

const clearLocalRecentlyViewed = (userId) => {
  if (typeof window === 'undefined') return [];
  window.localStorage.removeItem(storageKey(userId));
  return [];
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_API = String(import.meta.env.VITE_USE_API || '').toLowerCase() === 'true';

const getApiRecentlyViewed = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/recently-viewed/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recently viewed:', error);
    return [];
  }
};

const trackApiView = async (userId, content) => {
  try {
    if (!content || !content.contentId) {
      console.error('trackView: content must have contentId');
      return null;
    }

    const response = await fetch(`${API_URL}/api/recently-viewed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: content.contentId,
        title: content.title || 'Untitled',
        thumbnailUrl: content.thumbnailUrl || '',
        contentType: content.contentType || 'movie',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error tracking view:', error);
    return null;
  }
};

const removeApiRecentlyViewed = async (userId, contentId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/recently-viewed/${userId}/${contentId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error removing from recently viewed:', error);
    return false;
  }
};

const clearApiRecentlyViewed = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/recently-viewed/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error clearing recently viewed:', error);
    return false;
  }
};

export const getRecentlyViewed = (userId) =>
  USE_API ? getApiRecentlyViewed(userId) : getLocalRecentlyViewed(userId);

export const trackView = (userId, content) =>
  USE_API ? trackApiView(userId, content) : trackLocalView(userId, content);

export const removeRecentlyViewed = (userId, contentId) =>
  USE_API ? removeApiRecentlyViewed(userId, contentId) : removeLocalRecentlyViewed(userId, contentId);

export const clearRecentlyViewed = (userId) =>
  USE_API ? clearApiRecentlyViewed(userId) : clearLocalRecentlyViewed(userId);

export const isUsingApi = () => USE_API;
