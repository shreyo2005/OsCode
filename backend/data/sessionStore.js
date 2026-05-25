/**
 * THE ARCHIVE — Session Store
 * In-memory session store with TTL cleanup.
 * For production at scale: replace with Redis.
 */

'use strict';

const { v4: uuidv4 } = require('uuid');

// Session TTL: 6 hours
const SESSION_TTL = 6 * 60 * 60 * 1000;

// session store: Map<sessionId, sessionData>
const sessions = new Map();

// leaderboard store: Map<teamName, entry>
const leaderboard = new Map();

// Cleanup expired sessions every 15 minutes
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [id, sess] of sessions) {
    if (now - sess.lastActive > SESSION_TTL) {
      sessions.delete(id);
      cleaned++;
    }
  }
  if (cleaned > 0) console.log(`[SessionStore] Cleaned ${cleaned} expired sessions. Active: ${sessions.size}`);
}, 15 * 60 * 1000);

const SessionStore = {

  create(teamName) {
    const id = uuidv4();
    const now = Date.now();
    const sess = {
      id,
      teamName: teamName.trim().substring(0, 50),
      stage: 1,          // 1-indexed current stage
      clue: 1,           // 1-indexed current clue within stage
      stagesCleared: 0,
      attempts: 0,
      wrongAttempts: 0,
      hintsUsed: 0,
      hintUsedPerStage: {},  // { stageId: true }
      startTime: now,
      lastActive: now,
      lastSubmitTime: 0,     // for anti-spam
      stageStartTime: now,   // when current stage started
      completedAt: null,
      flagsCollected: [],    // array of collected flags
      stageTimings: {},      // { stageId: durationMs }
    };
    sessions.set(id, sess);
    return { id, sess };
  },

  get(id) {
    const sess = sessions.get(id);
    if (!sess) return null;
    if (Date.now() - sess.lastActive > SESSION_TTL) {
      sessions.delete(id);
      return null;
    }
    sess.lastActive = Date.now();
    return sess;
  },

  touch(id) {
    const sess = sessions.get(id);
    if (sess) sess.lastActive = Date.now();
  },

  count() {
    return sessions.size;
  },

  // Record stage clear and update leaderboard
  recordStageClear(sess, stageId, flag) {
    const now = Date.now();
    const stageDuration = now - sess.stageStartTime;
    sess.stageTimings[stageId] = stageDuration;
    sess.stagesCleared++;
    sess.flagsCollected.push(flag);
    sess.stage = stageId + 1;
    sess.clue = 1;
    sess.stageStartTime = now;

    if (stageId === 25) {
      sess.completedAt = now;
      sess.totalTime = now - sess.startTime;
      this.updateLeaderboard(sess);
    } else {
      this.updateLeaderboard(sess);
    }
  },

  updateLeaderboard(sess) {
    const existing = leaderboard.get(sess.teamName);
    const entry = {
      teamName: sess.teamName,
      stagesCleared: sess.stagesCleared,
      totalTime: sess.completedAt ? sess.completedAt - sess.startTime : Date.now() - sess.startTime,
      completedAt: sess.completedAt,
      attempts: sess.attempts,
      hintsUsed: sess.hintsUsed,
      lastUpdated: Date.now()
    };

    if (!existing ||
        entry.stagesCleared > existing.stagesCleared ||
        (entry.stagesCleared === existing.stagesCleared && entry.totalTime < existing.totalTime)) {
      leaderboard.set(sess.teamName, entry);
    }
  },

  getLeaderboard() {
    const board = Array.from(leaderboard.values());
    // Sort: most stages first, then fastest time
    board.sort((a, b) => {
      if (b.stagesCleared !== a.stagesCleared) return b.stagesCleared - a.stagesCleared;
      return a.totalTime - b.totalTime;
    });
    return board.slice(0, 100); // top 100
  },

  teamExists(teamName) {
    for (const [, sess] of sessions) {
      if (sess.teamName.toLowerCase() === teamName.toLowerCase()) return true;
    }
    return false;
  }
};

module.exports = SessionStore;
