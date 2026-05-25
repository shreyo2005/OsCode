/**
 * THE ARCHIVE — config.js
 * Client-side configuration. NO secrets here.
 */
'use strict';

window.ARCHIVE_CONFIG = {
  // Change this to your deployed backend URL in production
  API_BASE: 'http://localhost:3001/api',

  // Polling interval for leaderboard refresh (ms)
  LB_POLL_INTERVAL: 30000,

  // Game settings
  TOTAL_STAGES: 25,
  CLUES_PER_STAGE: 5,

  // Anti-spam: match backend cooldown
  SUBMIT_COOLDOWN_MS: 2000,

  // Session storage key
  SESSION_KEY: 'archive_session_id',
  TEAM_KEY: 'archive_team_name',

  // Max wrong answer log lines shown in terminal
  MAX_LOG_LINES: 80,
};
