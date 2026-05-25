/**
 * THE ARCHIVE — game.js
 * Core game state machine. Orchestrates API calls and UI updates.
 * SECURITY: All answer validation is server-side. This file holds NO answers.
 */
'use strict';

const Game = (() => {
  const CFG = window.ARCHIVE_CONFIG;

  // ── Game State ───────────────────────────────────
  let state = {
    teamName: '',
    stage: 1,
    stageName: '',
    tier: '',
    clue: 1,
    stagesCleared: 0,
    wrongAttempts: 0,
    hintsUsed: 0,
    hintAvailable: true,
    startTime: 0,
    stageStartTime: 0,
    flags: [],
    completed: false,
    timerHandle: null,
    lbPollHandle: null,
    submitting: false,
    lastSubmitTime: 0,
  };

  // ── Initialise new game ──────────────────────────
  async function start(teamName) {
    UI.showLoading('INITIALISING SESSION...');

    const res = await API.startGame(teamName);
    UI.hideLoading();

    if (!res.ok) {
      const msg = res.data?.error || 'Failed to start game.';
      UI.showToast(msg, 'error');
      document.getElementById('login-error').textContent = msg;
      return false;
    }

    const d = res.data;
    sessionStorage.setItem(CFG.TEAM_KEY, d.teamName);

    // Hydrate state from server response
    state.teamName      = d.teamName;
    state.stage         = d.stage;
    state.clue          = d.clue;
    state.stagesCleared = d.stagesCleared;
    state.startTime     = d.startTime;
    state.stageStartTime = Date.now();
    state.flags         = [];
    state.completed     = false;
    state.wrongAttempts = 0;

    await enterGameScreen();
    return true;
  }

  // ── Resume existing session ───────────────────────
  async function resume() {
    if (!API.hasSession()) return false;
    UI.showLoading('RESTORING SESSION...');

    const res = await API.getStatus();
    UI.hideLoading();

    if (!res.ok) {
      API.clearSession();
      return false;
    }

    const d = res.data;
    if (d.completed) {
      // Already finished
      state.teamName = d.teamName;
      state.flags = d.flagsCollected || [];
      state.hintsUsed = d.hintsUsed || 0;
      showCompletionScreen(d.totalTime);
      return true;
    }

    sessionStorage.setItem(CFG.TEAM_KEY, d.teamName);
    state.teamName      = d.teamName;
    state.stage         = d.stage;
    state.stageName     = d.stageName;
    state.tier          = d.tier;
    state.clue          = d.clue;
    state.stagesCleared = d.stagesCleared;
    state.wrongAttempts = d.wrongAttempts || 0;
    state.hintsUsed     = d.hintsUsed || 0;
    state.hintAvailable = d.hintAvailable;
    state.startTime     = d.startTime;
    state.stageStartTime = d.stageStartTime;
    state.flags         = d.flagsCollected || [];
    state.completed     = false;

    await enterGameScreen(d.clueText);
    return true;
  }

  // ── Enter main game screen ────────────────────────
  async function enterGameScreen(existingClueText = null) {
    UI.showPage('pg-game');
    startTimer();

    // Build static UI
    UI.updateHeader(state.teamName, state.stage, state.stagesCleared);
    UI.buildStageMap(state.stage, state.stagesCleared);
    UI.buildMiniMap(state.stage);
    UI.updateClueSteps(state.clue);

    // Boot sequence with delay, then load clue
    const bootDelay = UI.bootSequence(state.teamName, state.stage, state.stageName);

    if (existingClueText) {
      // Resuming — we already have clue text
      state.stageName = state.stageName || '';
      setTimeout(() => {
        UI.updateSidebar({
          tier: state.tier,
          stageName: state.stageName,
          stagesCleared: state.stagesCleared,
          wrongAttempts: state.wrongAttempts,
          hintsUsed: state.hintsUsed
        });
        UI.renderClue(existingClueText, state.clue, state.stage);
        UI.setHintState(state.hintAvailable);
        UI.focusInput();
      }, bootDelay + 100);
    } else {
      // Fresh start — fetch first clue
      setTimeout(async () => await loadCurrentClue(), bootDelay + 100);
    }
  }

  // ── Load current clue from server ────────────────
  async function loadCurrentClue() {
    const res = await API.getClue();

    if (!res.ok) {
      if (res.sessionExpired) {
        handleSessionExpiry();
        return;
      }
      UI.showToast(res.data?.error || 'Failed to load clue.', 'error');
      return;
    }

    const d = res.data;
    state.stage         = d.stage;
    state.stageName     = d.stageName;
    state.tier          = d.tier;
    state.clue          = d.clue;
    state.stagesCleared = d.stagesCleared;
    state.hintAvailable = d.hintAvailable;

    UI.updateHeader(state.teamName, state.stage, state.stagesCleared);
    UI.updateSidebar({
      tier: state.tier,
      stageName: state.stageName,
      stagesCleared: state.stagesCleared,
      wrongAttempts: state.wrongAttempts,
      hintsUsed: state.hintsUsed
    });
    UI.updateClueSteps(state.clue);
    UI.buildStageMap(state.stage, state.stagesCleared);
    UI.buildMiniMap(state.stage);
    UI.renderClue(d.clueText, state.clue, state.stage);
    UI.setHintState(state.hintAvailable);
    UI.focusInput();

    // Reset hint display for new stage
    const hintArea = document.getElementById('hint-area');
    if (hintArea) {
      hintArea.classList.remove('visible');
      const content = document.getElementById('hint-content');
      if (content) content.textContent = '';
    }
  }

  // ── Submit answer ─────────────────────────────────
  async function submitAnswer() {
    const inp = document.getElementById('inp-answer');
    if (!inp) return;
    const raw = inp.value.trim();
    if (!raw) { UI.focusInput(); return; }

    // Client-side cooldown check
    const now = Date.now();
    if (now - state.lastSubmitTime < CFG.SUBMIT_COOLDOWN_MS) {
      const wait = Math.ceil((CFG.SUBMIT_COOLDOWN_MS - (now - state.lastSubmitTime)) / 1000);
      UI.setFeedback(`Wait ${wait}s...`, 'wrong');
      UI.showCooldown(CFG.SUBMIT_COOLDOWN_MS - (now - state.lastSubmitTime));
      return;
    }

    if (state.submitting) return;
    state.submitting = true;
    state.lastSubmitTime = Date.now();

    UI.tlogInput(`> ${raw}`);
    UI.clearInput();
    UI.lockInput(true);

    const res = await API.submitAnswer(raw);

    state.submitting = false;
    UI.lockInput(false);

    if (!res.ok) {
      if (res.sessionExpired) { handleSessionExpiry(); return; }
      if (res.rateLimited) {
        const wait = res.data?.cooldown || 2;
        UI.setFeedback(`Rate limited. Wait ${wait}s.`, 'wrong');
        UI.showCooldown(wait * 1000);
        UI.focusInput();
        return;
      }
      UI.showToast(res.data?.error || 'Submission failed.', 'error');
      UI.focusInput();
      return;
    }

    const d = res.data;

    if (d.result === 'wrong') {
      state.wrongAttempts++;
      UI.tlog(`✗ Incorrect. Attempt ${state.wrongAttempts}.`, 'wrong');
      UI.wrongShake();
      UI.setFeedback('Incorrect. Try again.', 'wrong');
      UI.showCooldown(CFG.SUBMIT_COOLDOWN_MS);
      const stWrong = document.getElementById('st-wrong');
      if (stWrong) stWrong.textContent = state.wrongAttempts;

    } else if (d.result === 'correct') {
      // Correct — advance to next clue
      state.clue = d.nextClue;
      UI.tlog('✓ Correct!', 'correct');
      UI.correctFlash();
      UI.setFeedback(`Clue ${state.clue - 1} solved!`, 'correct');
      UI.updateClueSteps(state.clue);

      setTimeout(() => {
        UI.tlog('', 'system');
        UI.renderClue(d.clueText, state.clue, state.stage);
        UI.setHintState(d.hintAvailable);
        UI.focusInput();
      }, 400);

    } else if (d.result === 'stage_clear') {
      // Stage cleared!
      state.stagesCleared++;
      state.clue = 1;
      state.flags.push(d.flag);

      UI.tlog('✓ Correct!', 'correct');
      UI.tlog(`⚑ ${d.flag}`, 'flag');
      UI.correctFlash();

      // Update sidebar immediately
      const stStages = document.getElementById('st-stages');
      if (stStages) stStages.textContent = state.stagesCleared;

      if (d.completed) {
        // Game complete!
        setTimeout(() => {
          showCompletionScreen();
        }, 800);
      } else {
        state.stage = d.nextStage;
        setTimeout(() => {
          UI.showFlagModal(d.flag, d.stageName, state.stagesCleared, state.stage);
        }, 600);
      }

    } else if (d.result === 'already_complete') {
      showCompletionScreen();
    }

    UI.focusInput();
  }

  // ── Request hint ──────────────────────────────────
  async function requestHint() {
    if (!state.hintAvailable) {
      UI.showToast('Hint already used for this stage.', 'info');
      return;
    }

    const res = await API.requestHint();
    if (!res.ok) {
      UI.showToast(res.data?.error || 'Could not get hint.', 'error');
      return;
    }

    const d = res.data;
    state.hintsUsed = d.hintsUsed;
    state.hintAvailable = false;

    UI.tlog(`💡 Hint: ${d.hint}`, 'hint');
    UI.setHintState(false, d.hint);
    UI.setFeedback('Hint revealed.', 'info');

    const stHints = document.getElementById('st-hints');
    if (stHints) stHints.textContent = state.hintsUsed;
  }

  // ── Advance to next stage (from flag modal) ───────
  async function advanceStage() {
    UI.hideFlagModal();
    UI.clearLog();

    const bootDelay = UI.bootSequence(state.teamName, state.stage, '');
    setTimeout(async () => await loadCurrentClue(), bootDelay + 100);
  }

  // ── Timer ─────────────────────────────────────────
  function startTimer() {
    clearInterval(state.timerHandle);
    state.timerHandle = setInterval(() => {
      if (state.startTime) {
        UI.updateTimer(Date.now() - state.startTime);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerHandle);
  }

  // ── Completion ────────────────────────────────────
  function showCompletionScreen(totalTimeMs = null) {
    stopTimer();
    state.completed = true;

    const ms = totalTimeMs || (Date.now() - state.startTime);
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const timeStr = `${pad(h)}:${pad(m % 60)}:${pad(s % 60)}`;

    UI.showVictory({
      teamName: state.teamName,
      totalTime: timeStr,
      hintsUsed: state.hintsUsed,
      flags: state.flags
    });
  }

  // ── Leaderboard polling ───────────────────────────
  async function openLeaderboard() {
    UI.showLoading('FETCHING LEADERBOARD...');
    const res = await API.getLeaderboard();
    UI.hideLoading();

    if (!res.ok) {
      UI.showToast('Could not fetch leaderboard.', 'error');
      return;
    }

    UI.showLbModal(res.data, state.teamName);
  }

  // ── Session expiry handler ────────────────────────
  function handleSessionExpiry() {
    stopTimer();
    API.clearSession();
    UI.showToast('Session expired. Please restart.', 'error');
    UI.showPage('pg-landing');
  }

  // ── Reset for new game ────────────────────────────
  function reset() {
    stopTimer();
    clearInterval(state.lbPollHandle);
    Object.assign(state, {
      teamName: '', stage: 1, stageName: '', tier: '', clue: 1,
      stagesCleared: 0, wrongAttempts: 0, hintsUsed: 0,
      hintAvailable: true, startTime: 0, stageStartTime: 0,
      flags: [], completed: false, submitting: false, lastSubmitTime: 0
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  // ── Public API ────────────────────────────────────
  return {
    start,
    resume,
    submitAnswer,
    requestHint,
    advanceStage,
    openLeaderboard,
    reset,
    getState: () => ({ ...state }),
  };
})();

window.Game = Game;
