'use strict';

const express = require('express');
const router = express.Router();
const { STAGES, norm } = require('../data/stages');
const SessionStore = require('../data/sessionStore');
const { requireSession } = require('../middleware/auth');
const { submitLimiter, startLimiter } = require('../middleware/rateLimiter');

const TOTAL_STAGES = 25;
const COOLDOWN_MS = 2000; // 2-second anti-spam cooldown between submissions

// ─────────────────────────────────────────────────────────
// POST /api/game/start
// ─────────────────────────────────────────────────────────
router.post('/start', startLimiter, (req, res) => {
  try {
    const { teamName } = req.body;

    if (!teamName || typeof teamName !== 'string') {
      return res.status(400).json({ error: 'Team name required.' });
    }

    const name = teamName.trim().substring(0, 50);
    if (name.length < 2) {
      return res.status(400).json({ error: 'Team name must be at least 2 characters.' });
    }
    if (!/^[a-zA-Z0-9 _\-\.]+$/.test(name)) {
      return res.status(400).json({ error: 'Team name contains invalid characters.' });
    }

    const { id, sess } = SessionStore.create(name);

    // Return session ID — client stores in memory/localStorage
    return res.status(201).json({
      sessionId: id,
      teamName: sess.teamName,
      stage: sess.stage,
      clue: sess.clue,
      stagesCleared: sess.stagesCleared,
      totalStages: TOTAL_STAGES,
      startTime: sess.startTime,
      message: 'The Archive awaits. Good luck.'
    });
  } catch (err) {
    console.error('[/start]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────────────────────
// GET /api/game/clue
// Returns ONLY the current clue text — NO answer, NO hint by default
// ─────────────────────────────────────────────────────────
router.get('/clue', requireSession, (req, res) => {
  try {
    const { sess } = req;
    const stage = STAGES[sess.stage - 1];
    if (!stage) return res.status(500).json({ error: 'Stage not found.' });

    const clue = stage.clues[sess.clue - 1];
    if (!clue) return res.status(500).json({ error: 'Clue not found.' });

    return res.json({
      stage: sess.stage,
      stageName: stage.name,
      tier: stage.tier,
      clue: sess.clue,
      totalClues: 5,
      totalStages: TOTAL_STAGES,
      stagesCleared: sess.stagesCleared,
      clueText: clue.text,
      attempts: sess.attempts,
      wrongAttempts: sess.wrongAttempts,
      hintsUsed: sess.hintsUsed,
      hintAvailable: !sess.hintUsedPerStage[sess.stage],
      startTime: sess.startTime,
      stageStartTime: sess.stageStartTime,
      completed: !!sess.completedAt,
      // NEVER include: answer, hint (unless requested), flag
    });
  } catch (err) {
    console.error('[/clue]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────────────────────
// POST /api/game/hint
// Use once per stage — costs a hint token
// ─────────────────────────────────────────────────────────
router.post('/hint', requireSession, (req, res) => {
  try {
    const { sess } = req;

    if (sess.hintUsedPerStage[sess.stage]) {
      return res.status(400).json({ error: 'Hint already used for this stage.' });
    }

    const stage = STAGES[sess.stage - 1];
    const clue = stage.clues[sess.clue - 1];

    sess.hintUsedPerStage[sess.stage] = true;
    sess.hintsUsed++;

    return res.json({
      hint: clue.hint,
      hintsUsed: sess.hintsUsed
    });
  } catch (err) {
    console.error('[/hint]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────────────────────
// POST /api/game/submit
// Validate answer server-side. Never expose correct answer.
// ─────────────────────────────────────────────────────────
router.post('/submit', requireSession, submitLimiter, (req, res) => {
  try {
    const { sess, sessionId } = req;
    const { answer } = req.body;

    // Input validation
    if (!answer || typeof answer !== 'string') {
      return res.status(400).json({ error: 'Answer required.' });
    }

    const trimmed = answer.trim().substring(0, 500);
    if (!trimmed) {
      return res.status(400).json({ error: 'Answer cannot be empty.' });
    }

    // Anti-spam cooldown
    const now = Date.now();
    if (now - sess.lastSubmitTime < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (now - sess.lastSubmitTime)) / 1000);
      return res.status(429).json({ error: `Wait ${wait}s before submitting again.`, cooldown: wait });
    }
    sess.lastSubmitTime = now;

    // Already completed?
    if (sess.completedAt) {
      return res.json({ result: 'already_complete', message: 'You already completed The Archive!' });
    }

    const stage = STAGES[sess.stage - 1];
    const clue = stage.clues[sess.clue - 1];

    sess.attempts++;
    const normalized = norm(trimmed);
    const expected = norm(clue.answer);

    if (normalized === expected) {
      // CORRECT
      const isLastClue = sess.clue === 5;

      if (isLastClue) {
        // Stage cleared! — reveal flag
        const flag = stage.flag;
        SessionStore.recordStageClear(sess, stage.id, flag);

        const isComplete = stage.id === TOTAL_STAGES;

        return res.json({
          result: 'stage_clear',
          correct: true,
          flag,
          stageName: stage.name,
          stagesCleared: sess.stagesCleared,
          nextStage: isComplete ? null : sess.stage,
          completed: isComplete,
          totalTime: isComplete ? (sess.completedAt - sess.startTime) : undefined,
          message: isComplete
            ? 'ARCHIVE COMPLETE. You have breached the final seal.'
            : `Stage ${stage.id} cleared. Flag: ${flag}`
        });
      } else {
        // Advance to next clue
        sess.clue++;
        const nextClue = stage.clues[sess.clue - 1];

        return res.json({
          result: 'correct',
          correct: true,
          nextClue: sess.clue,
          clueText: nextClue.text,
          hintAvailable: !sess.hintUsedPerStage[sess.stage],
          message: `Correct. Clue ${sess.clue - 1} solved. Next clue unlocked.`
        });
      }
    } else {
      // WRONG
      sess.wrongAttempts++;
      return res.json({
        result: 'wrong',
        correct: false,
        wrongAttempts: sess.wrongAttempts,
        message: 'Incorrect. Try again.',
        // NEVER include: hint, answer, or anything that reveals the solution
      });
    }
  } catch (err) {
    console.error('[/submit]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────────────────────
// GET /api/game/status
// Full session status for reconnecting
// ─────────────────────────────────────────────────────────
router.get('/status', requireSession, (req, res) => {
  const { sess } = req;
  const stage = STAGES[sess.stage - 1];
  const clue = stage ? stage.clues[sess.clue - 1] : null;

  return res.json({
    teamName: sess.teamName,
    stage: sess.stage,
    stageName: stage?.name,
    tier: stage?.tier,
    clue: sess.clue,
    clueText: clue?.text,
    stagesCleared: sess.stagesCleared,
    totalStages: TOTAL_STAGES,
    attempts: sess.attempts,
    wrongAttempts: sess.wrongAttempts,
    hintsUsed: sess.hintsUsed,
    hintAvailable: !sess.hintUsedPerStage[sess.stage],
    startTime: sess.startTime,
    stageStartTime: sess.stageStartTime,
    flagsCollected: sess.flagsCollected,
    completed: !!sess.completedAt,
    totalTime: sess.completedAt ? sess.completedAt - sess.startTime : null
  });
});

module.exports = router;
