/**
 * THE ARCHIVE — main.js
 * App bootstrap. Wires all event listeners and initialises on DOMContentLoaded.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── Init visual effects ──────────────────────────
  UI.initMatrix();
  UI.typewriter(
    document.getElementById('landing-tagline'),
    [
      'CRYPTOGRAPHIC TREASURE HUNT',
      '25 STAGES OF ENCRYPTED SECRETS',
      'BREACH THE FINAL SEAL',
      'ONLY THE WORTHY MAY ENTER',
      'BINARY · HEX · CIPHERS · LOGIC',
    ],
    2500
  );

  // ── Session resume ───────────────────────────────
  // Check if a session exists on load
  API.loadSession();
  if (API.hasSession()) {
    // Small delay so landing page renders first
    setTimeout(async () => {
      const resumed = await Game.resume();
      if (!resumed) {
        UI.showPage('pg-landing');
      }
    }, 300);
  }

  // ─────────────────────────────────────────────────
  // LANDING PAGE
  // ─────────────────────────────────────────────────
  document.getElementById('btn-enter-archive')?.addEventListener('click', () => {
    UI.showPage('pg-login');
    setTimeout(() => document.getElementById('inp-team')?.focus(), 300);
  });

  document.getElementById('btn-view-lb-landing')?.addEventListener('click', async () => {
    await Game.openLeaderboard();
  });

  // ─────────────────────────────────────────────────
  // LOGIN PAGE
  // ─────────────────────────────────────────────────
  document.getElementById('btn-back-landing')?.addEventListener('click', () => {
    document.getElementById('login-error').textContent = '';
    UI.showPage('pg-landing');
  });

  document.getElementById('btn-start-game')?.addEventListener('click', async () => {
    await handleStartGame();
  });

  document.getElementById('inp-team')?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') await handleStartGame();
  });

  async function handleStartGame() {
    const inp = document.getElementById('inp-team');
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('btn-start-game');
    const btnText = document.getElementById('btn-start-text');
    const btnSpinner = document.getElementById('btn-start-spinner');

    if (!inp) return;
    const name = inp.value.trim();
    errEl.textContent = '';

    if (!name || name.length < 2) {
      errEl.textContent = 'Team name must be at least 2 characters.';
      inp.focus();
      return;
    }
    if (!/^[a-zA-Z0-9 _\-\.]+$/.test(name)) {
      errEl.textContent = 'Only letters, numbers, spaces, _ - . allowed.';
      inp.focus();
      return;
    }

    // Button loading state
    btn.disabled = true;
    btnText.textContent = 'CONNECTING...';
    btnSpinner.textContent = '⟳';

    const ok = await Game.start(name);

    btn.disabled = false;
    btnText.textContent = 'INITIALISE SESSION';
    btnSpinner.textContent = '→';

    if (!ok) inp.focus();
  }

  // ─────────────────────────────────────────────────
  // GAME PAGE
  // ─────────────────────────────────────────────────

  // Submit via button
  document.getElementById('btn-submit')?.addEventListener('click', async () => {
    await Game.submitAnswer();
  });

  // Submit via Enter key in input
  document.getElementById('inp-answer')?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await Game.submitAnswer();
    }
  });

  // Hint request
  document.getElementById('btn-hint')?.addEventListener('click', async () => {
    await Game.requestHint();
  });

  // Leaderboard button in game header
  document.getElementById('btn-open-lb')?.addEventListener('click', async () => {
    await Game.openLeaderboard();
  });

  // ─────────────────────────────────────────────────
  // FLAG MODAL
  // ─────────────────────────────────────────────────
  document.getElementById('btn-next-stage')?.addEventListener('click', async () => {
    await Game.advanceStage();
  });

  // ─────────────────────────────────────────────────
  // LEADERBOARD MODAL
  // ─────────────────────────────────────────────────
  document.getElementById('btn-close-lb')?.addEventListener('click', () => UI.hideLbModal());
  document.getElementById('btn-close-lb-bottom')?.addEventListener('click', () => UI.hideLbModal());

  document.getElementById('modal-lb')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-lb')) UI.hideLbModal();
  });

  // ─────────────────────────────────────────────────
  // VICTORY PAGE
  // ─────────────────────────────────────────────────
  document.getElementById('btn-vic-lb')?.addEventListener('click', async () => {
    await Game.openLeaderboard();
  });

  // ─────────────────────────────────────────────────
  // GLOBAL KEYBOARD SHORTCUTS
  // ─────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Escape closes modals
    if (e.key === 'Escape') {
      UI.hideLbModal();
    }
  });

  // ─────────────────────────────────────────────────
  // PREVENT COMMON CHEATING VECTORS
  // ─────────────────────────────────────────────────

  // Warn on right-click (doesn't block, just logs intent)
  document.addEventListener('contextmenu', (e) => {
    // Not blocking — just note that no answers are in the DOM anyway
  });

  // Detect DevTools open (just for analytics, not blocking)
  let devtoolsOpen = false;
  setInterval(() => {
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtoolsOpen) devtoolsOpen = true;
    }
  }, 2000);

  // Visibility change — pause timer display when tab hidden
  document.addEventListener('visibilitychange', () => {
    // Timer keeps running server-side; client timer is cosmetic
  });

  // ─────────────────────────────────────────────────
  // GLOBAL ERROR HANDLER
  // ─────────────────────────────────────────────────
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[Archive] Unhandled rejection:', e.reason);
    UI.showToast('An unexpected error occurred. Please refresh if issues persist.', 'error');
  });

  window.onerror = (msg, src, line) => {
    console.error(`[Archive] JS Error: ${msg} at ${src}:${line}`);
    return false;
  };

});
