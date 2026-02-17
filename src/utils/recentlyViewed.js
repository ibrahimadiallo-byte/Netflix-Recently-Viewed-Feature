/**
 * Recently Viewed API Service
 * Owner: Yaasameen
 * 
 * Connects to Railway backend with PostgreSQL database
 * for persistent recently viewed storage across devices.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get all recently viewed items for a user
 * @param {string} userId - The user's ID (default: 'demo-user')
 * @returns {Promise<Array>} - Array of recently viewed items, newest first
 */
export async function getRecentlyViewed(userId = 'demo-user') {
  try {
    const response = await fetch(`${API_URL}/api/recently-viewed/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching recently viewed:', error);
    return [];
  }
}

/**
 * Track a content view - adds item to recently viewed
 * @param {string} userId - The user's ID (default: 'demo-user')
 * @param {Object} content - The content object to track
 * @param {string} content.id - Unique content ID
 * @param {string} content.title - Content title
 * @param {string} content.image - Thumbnail URL
 * @param {string} [content.contentType] - 'movie' or 'series'
 * @returns {Promise<Object|null>} - The tracked item or null on error
 */
export async function trackView(userId = 'demo-user', content) {
  try {
    // Validate content has required fields
    if (!content || !content.id) {
      console.error('trackView: content must have an id');
      return null;
    }

    const response = await fetch(`${API_URL}/api/recently-viewed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: content.id,
        title: content.title || 'Untitled',
        thumbnailUrl: content.image || content.thumbnailUrl || '',
        contentType: content.contentType || 'movie',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Tracked view: "${content.title}" for user ${userId}`);
    return result;
  } catch (error) {
    console.error('Error tracking view:', error);
    return null;
  }
}

/**
 * Clear all recently viewed items for a user
 * @param {string} userId - The user's ID (default: 'demo-user')
 * @returns {Promise<boolean>} - Success status
 */
export async function clearRecentlyViewed(userId = 'demo-user') {
  try {
    const response = await fetch(`${API_URL}/api/recently-viewed/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Cleared recently viewed for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error clearing recently viewed:', error);
    return false;
  }
}

/**
 * Remove a single item from recently viewed
 * @param {string} userId - The user's ID
 * @param {string} contentId - The content ID to remove
 * @returns {Promise<boolean>} - Success status
 */
export async function removeFromRecentlyViewed(userId = 'demo-user', contentId) {
  try {
    const response = await fetch(
      `${API_URL}/api/recently-viewed/${userId}/${contentId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Removed ${contentId} from recently viewed`);
    return true;
  } catch (error) {
    console.error('Error removing from recently viewed:', error);
    return false;
  }
}
