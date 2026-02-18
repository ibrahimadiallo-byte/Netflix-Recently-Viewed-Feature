/**
 * Netflix Clone Backend Server
 * Owner: Yaasameen
 * 
 * Express server with PostgreSQL database for Recently Viewed feature
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration (allow all origins in development)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database table
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recently_viewed (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        content_id VARCHAR(255) NOT NULL,
        title VARCHAR(500) NOT NULL,
        thumbnail_url TEXT,
        content_type VARCHAR(50) DEFAULT 'movie',
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, content_id)
      )
    `);
    
    // Create index for faster queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_recently_viewed_user 
      ON recently_viewed(user_id, viewed_at DESC)
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// ==================== API ROUTES ====================

/**
 * GET /api/recently-viewed/:userId
 * Get last 10 recently viewed items for a user
 */
app.get('/api/recently-viewed/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      `SELECT content_id, title, thumbnail_url, content_type, viewed_at 
       FROM recently_viewed 
       WHERE user_id = $1 
       ORDER BY viewed_at DESC 
       LIMIT 10`,
      [userId]
    );
    
    // Transform to camelCase for frontend
    const items = result.rows.map(row => ({
      id: row.content_id,
      contentId: row.content_id,
      title: row.title,
      thumbnailUrl: row.thumbnail_url,
      contentType: row.content_type,
      viewedAt: row.viewed_at
    }));
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching recently viewed:', error);
    res.status(500).json({ error: 'Failed to fetch recently viewed' });
  }
});

/**
 * POST /api/recently-viewed
 * Track a content view
 * Body: { userId, contentId, title, thumbnailUrl, contentType }
 */
app.post('/api/recently-viewed', async (req, res) => {
  try {
    const { userId, contentId, title, thumbnailUrl, contentType } = req.body;
    
    // Validate required fields
    if (!userId || !contentId || !title) {
      return res.status(400).json({ error: 'userId, contentId, and title are required' });
    }
    
    // Upsert: Insert or update if exists (updates viewed_at timestamp)
    const result = await pool.query(
      `INSERT INTO recently_viewed (user_id, content_id, title, thumbnail_url, content_type, viewed_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, content_id) 
       DO UPDATE SET 
         title = EXCLUDED.title,
         thumbnail_url = EXCLUDED.thumbnail_url,
         viewed_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, contentId, title, thumbnailUrl || '', contentType || 'movie']
    );
    
    // Cleanup: Keep only last 10 items per user
    await pool.query(
      `DELETE FROM recently_viewed 
       WHERE user_id = $1 
       AND id NOT IN (
         SELECT id FROM recently_viewed 
         WHERE user_id = $1 
         ORDER BY viewed_at DESC 
         LIMIT 10
       )`,
      [userId]
    );
    
    const row = result.rows[0];
    res.json({
      id: row.content_id,
      contentId: row.content_id,
      title: row.title,
      thumbnailUrl: row.thumbnail_url,
      contentType: row.content_type,
      viewedAt: row.viewed_at
    });
  } catch (error) {
    console.error('Error tracking view:', error);
    res.status(500).json({ error: 'Failed to track view' });
  }
});

/**
 * DELETE /api/recently-viewed/:userId/:contentId
 * Remove a single item from recently viewed
 */
app.delete('/api/recently-viewed/:userId/:contentId', async (req, res) => {
  try {
    const { userId, contentId } = req.params;
    
    await pool.query(
      'DELETE FROM recently_viewed WHERE user_id = $1 AND content_id = $2',
      [userId, contentId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing from recently viewed:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

/**
 * DELETE /api/recently-viewed/:userId
 * Clear all recently viewed for a user
 */
app.delete('/api/recently-viewed/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    await pool.query(
      'DELETE FROM recently_viewed WHERE user_id = $1',
      [userId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing recently viewed:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Health check endpoint (useful for Railway)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
