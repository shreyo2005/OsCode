'use strict';

const rateLimit = require('express-rate-limit');

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,         // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Slow down.' },
  skip: (req) => req.path === '/health'
});

// Answer submission: strict per-IP
const submitLimiter = rateLimit({
  windowMs: 60 * 1000,         // 1 minute
  max: 20,                      // 20 attempts per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many answer submissions. Rate limited.' },
  keyGenerator: (req) => req.ip + ':' + (req.headers['x-session-id'] || 'anon')
});

// Start game: prevent spam creation
const startLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,     // 5 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many game starts from this IP.' }
});

// Leaderboard: read-heavy, generous
const lbLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Leaderboard request limit reached.' }
});

module.exports = { apiLimiter, submitLimiter, startLimiter, lbLimiter };
