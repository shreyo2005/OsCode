/**
 * THE ARCHIVE — api.js
 * All communication with the backend.
 * Session ID is sent via header — never in URL.
 * SECURITY: No answers, flags, or stage data are stored here.
 */
'use strict';

const API = (() => {
  const BASE = window.ARCHIVE_CONFIG.API_BASE;
  let _sessionId = null;
  let _retryCount = 0;
  const MAX_RETRIES = 3;

  // ── Session Management ────────────────────────────
  function setSession(id) {
    _sessionId = id;
    if (id) sessionStorage.setItem(window.ARCHIVE_CONFIG.SESSION_KEY, id);
    else sessionStorage.removeItem(window.ARCHIVE_CONFIG.SESSION_KEY);
  }

  function loadSession() {
    _sessionId = sessionStorage.getItem(window.ARCHIVE_CONFIG.SESSION_KEY);
    return _sessionId;
  }

  function clearSession() {
    _sessionId = null;
    sessionStorage.removeItem(window.ARCHIVE_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(window.ARCHIVE_CONFIG.TEAM_KEY);
  }

  function hasSession() {
    return !!(_sessionId || sessionStorage.getItem(window.ARCHIVE_CONFIG.SESSION_KEY));
  }

  // ── Core fetch wrapper ───────────────────────────
  async function request(method, path, body = null, retryOn5xx = true) {
    const url = BASE + path;
    const headers = { 'Content-Type': 'application/json' };

    const sid = _sessionId || sessionStorage.getItem(window.ARCHIVE_CONFIG.SESSION_KEY);
    if (sid) headers['x-session-id'] = sid;

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    try {
      const res = await fetch(url, opts);
      const data = await res.json().catch(() => ({ error: 'Invalid server response.' }));

      if (!res.ok) {
        // Rate limited
        if (res.status === 429) {
          return { ok: false, status: 429, data, rateLimited: true };
        }
        // Session expired
        if (res.status === 401) {
          clearSession();
          return { ok: false, status: 401, data, sessionExpired: true };
        }
        return { ok: false, status: res.status, data };
      }

      _retryCount = 0;
      return { ok: true, status: res.status, data };

    } catch (err) {
      // Network error — retry on 5xx or network failure
      if (retryOn5xx && _retryCount < MAX_RETRIES) {
        _retryCount++;
        await new Promise(r => setTimeout(r, 800 * _retryCount));
        return request(method, path, body, retryOn5xx);
      }
      _retryCount = 0;
      return { ok: false, status: 0, data: { error: 'Network error. Check connection.' }, networkError: true };
    }
  }

  // ── Public API methods ───────────────────────────

  async function startGame(teamName) {
    const res = await request('POST', '/game/start', { teamName }, false);
    if (res.ok) setSession(res.data.sessionId);
    return res;
  }

  async function getStatus() {
    return request('GET', '/game/status');
  }

  async function getClue() {
    return request('GET', '/game/clue');
  }

  async function submitAnswer(answer) {
    return request('POST', '/game/submit', { answer });
  }

  async function requestHint() {
    return request('POST', '/game/hint');
  }

  async function getLeaderboard() {
    return request('GET', '/leaderboard', null, false);
  }

  async function health() {
    return request('GET', '/../health', null, false);
  }

  return {
    startGame,
    getStatus,
    getClue,
    submitAnswer,
    requestHint,
    getLeaderboard,
    health,
    setSession,
    loadSession,
    clearSession,
    hasSession,
  };
})();

window.API = API;
