'use strict';

const SessionStore = require('../data/sessionStore');

/**
 * Middleware: require a valid session cookie
 */
function requireSession(req, res, next) {
  const sessionId = req.headers['x-session-id'] || req.cookies?.sessionId;
  if (!sessionId) {
    return res.status(401).json({ error: 'No session. Start a game first.' });
  }

  const sess = SessionStore.get(sessionId);
  if (!sess) {
    return res.status(401).json({ error: 'Session expired or invalid. Please restart.' });
  }

  req.sess = sess;
  req.sessionId = sessionId;
  next();
}

module.exports = { requireSession };
