'use strict';

const express = require('express');
const router = express.Router();
const SessionStore = require('../data/sessionStore');
const { lbLimiter } = require('../middleware/rateLimiter');

// GET /api/leaderboard
router.get('/', lbLimiter, (req, res) => {
  try {
    const board = SessionStore.getLeaderboard();

    // Format for display — no sensitive session data
    const formatted = board.map((entry, idx) => ({
      rank: idx + 1,
      teamName: entry.teamName,
      stagesCleared: entry.stagesCleared,
      totalTime: entry.completedAt ? formatTime(entry.totalTime) : formatTimeOngoing(entry.totalTime),
      totalTimeMs: entry.totalTime,
      completed: !!entry.completedAt,
      hintsUsed: entry.hintsUsed,
      attempts: entry.attempts
    }));

    return res.json({
      leaderboard: formatted,
      activePlayers: SessionStore.count(),
      updatedAt: Date.now()
    });
  } catch (err) {
    console.error('[/leaderboard]', err);
    return res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

function formatTime(ms) {
  if (!ms) return '--:--';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${pad(h)}:${pad(m % 60)}:${pad(s % 60)}`;
  return `${pad(m)}:${pad(s % 60)}`;
}

function formatTimeOngoing(ms) {
  return formatTime(ms) + '+';
}

function pad(n) { return String(n).padStart(2, '0'); }

module.exports = router;
