/**
 * THE ARCHIVE — ui.js
 * All UI rendering, animations, DOM updates.
 * Purely presentational — no game logic here.
 */
'use strict';

const UI = (() => {
  const CFG = window.ARCHIVE_CONFIG;

  // ── Page navigation ──────────────────────────────
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = '';
    });
    const pg = document.getElementById(id);
    if (pg) {
      pg.classList.add('active');
      pg.classList.add('page-enter');
      setTimeout(() => pg.classList.remove('page-enter'), 400);
    }
  }

  // ── Loading overlay ──────────────────────────────
  function showLoading(msg = 'CONNECTING...') {
    const ov = document.getElementById('loading-overlay');
    const txt = document.getElementById('loader-text');
    if (txt) txt.textContent = msg;
    ov?.classList.remove('hidden');
  }

  function hideLoading() {
    document.getElementById('loading-overlay')?.classList.add('hidden');
  }

  // ── Toast notifications ──────────────────────────
  let toastTimer = null;
  function showToast(msg, type = 'info', duration = 4000) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = `toast ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  }

  // ── Terminal log ─────────────────────────────────
  function tlog(text, type = 'system') {
    const log = document.getElementById('term-log');
    if (!log) return;

    // Trim old entries
    const lines = log.querySelectorAll('.tlog-line');
    if (lines.length > CFG.MAX_LOG_LINES) {
      lines[0].remove();
    }

    const line = document.createElement('div');
    line.className = `tlog-line ${type}`;

    const pre = document.createElement('span');
    pre.className = 'tlog-pre';
    const prefixMap = {
      system: '◆', clue: '▸', correct: '✓', wrong: '✗',
      input: '▶', flag: '⚑', hint: '💡', info: '·'
    };
    pre.textContent = prefixMap[type] || '·';

    const txt = document.createElement('span');
    txt.className = 'tlog-text';
    txt.textContent = text;

    line.appendChild(pre);
    line.appendChild(txt);
    log.appendChild(line);

    // Scroll to bottom
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function tlogInput(val) {
    tlog(val, 'input');
  }

  function clearLog() {
    const log = document.getElementById('term-log');
    if (log) log.innerHTML = '';
  }

  // ── Render clue text in terminal ─────────────────
  function renderClue(clueText, clueNum, stageNum) {
    tlog(`──── STAGE ${stageNum} · CLUE ${clueNum}/5 ────`, 'system');
    tlog(clueText, 'clue');
    tlog('', 'system');
  }

  // ── Clue steps sidebar ───────────────────────────
  function updateClueSteps(currentClue) {
    const container = document.getElementById('clue-steps');
    if (!container) return;
    container.innerHTML = '';

    const labels = ['Clue 1 — Easy', 'Clue 2 — Medium-Easy', 'Clue 3 — Medium', 'Clue 4 — Hard', 'Clue 5 — Extreme'];
    for (let i = 1; i <= 5; i++) {
      const step = document.createElement('div');
      const state = i < currentClue ? 'done' : i === currentClue ? 'active' : '';
      step.className = `clue-step ${state}`;

      const pip = document.createElement('div');
      pip.className = 'step-pip';

      const lbl = document.createElement('span');
      lbl.textContent = labels[i - 1];

      step.appendChild(pip);
      step.appendChild(lbl);
      container.appendChild(step);
    }
  }

  // ── Stage map (top progress bar) ─────────────────
  function buildStageMap(currentStage, stagesCleared) {
    const map = document.getElementById('stage-map');
    if (!map) return;
    map.innerHTML = '';

    for (let i = 1; i <= CFG.TOTAL_STAGES; i++) {
      const dot = document.createElement('div');
      const tier = Math.ceil(i / 5);
      dot.className = 'smap-dot';
      dot.setAttribute('data-tier', tier);
      dot.setAttribute('title', `Stage ${i}`);

      if (i < currentStage) dot.classList.add('done');
      else if (i === currentStage) dot.classList.add('active');

      map.appendChild(dot);
    }

    // Update progress fill bar
    const fill = document.getElementById('progress-fill');
    if (fill) {
      const pct = (stagesCleared / CFG.TOTAL_STAGES) * 100;
      fill.style.width = pct + '%';
    }
  }

  // ── Mini map (sidebar) ────────────────────────────
  function buildMiniMap(currentStage) {
    const map = document.getElementById('mini-map');
    if (!map) return;
    map.innerHTML = '';

    for (let i = 1; i <= CFG.TOTAL_STAGES; i++) {
      const dot = document.createElement('div');
      dot.className = 'mm-dot';
      if (i < currentStage) dot.classList.add('done');
      else if (i === currentStage) dot.classList.add('active');
      map.appendChild(dot);
    }
  }

  // ── Update header ─────────────────────────────────
  function updateHeader(teamName, stage, stagesCleared) {
    const teamEl = document.getElementById('hdr-team');
    const stageEl = document.getElementById('hdr-stage-label');
    if (teamEl) teamEl.textContent = teamName;
    if (stageEl) stageEl.textContent = `STAGE ${stage} / ${CFG.TOTAL_STAGES}`;
  }

  // ── Update sidebar info ───────────────────────────
  function updateSidebar(data) {
    const tier = document.getElementById('sb-tier');
    const name = document.getElementById('sb-stage-name');
    const stStages = document.getElementById('st-stages');
    const stWrong = document.getElementById('st-wrong');
    const stHints = document.getElementById('st-hints');

    if (tier) tier.textContent = data.tier?.split('—')[0]?.trim() || '';
    if (name) name.textContent = data.stageName || '';
    if (stStages) animateVal(stStages, data.stagesCleared);
    if (stWrong) animateVal(stWrong, data.wrongAttempts || 0);
    if (stHints) animateVal(stHints, data.hintsUsed || 0);
  }

  function animateVal(el, val) {
    const current = parseInt(el.textContent) || 0;
    if (current !== val) {
      el.textContent = val;
      el.classList.remove('tick-up');
      void el.offsetWidth;
      el.classList.add('tick-up');
      setTimeout(() => el.classList.remove('tick-up'), 300);
    }
  }

  // ── Hint button state ─────────────────────────────
  function setHintState(available, hintText = null) {
    const btn = document.getElementById('btn-hint');
    const area = document.getElementById('hint-area');
    const content = document.getElementById('hint-content');

    if (!btn) return;
    if (available) {
      btn.disabled = false;
      btn.classList.remove('used');
    } else {
      btn.disabled = true;
      btn.classList.add('used');
    }

    if (hintText && area && content) {
      content.textContent = hintText;
      area.classList.add('visible');
    }
  }

  // ── Feedback message ──────────────────────────────
  function setFeedback(msg, type = 'info') {
    const el = document.getElementById('feedback-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = `feedback-msg ${type}`;
    if (msg) {
      setTimeout(() => {
        if (el.textContent === msg) el.textContent = '';
      }, 3000);
    }
  }

  // ── Wrong answer shake ────────────────────────────
  function wrongShake() {
    const win = document.querySelector('.terminal-window');
    if (!win) return;
    win.classList.add('wrong-flash', 'shake');
    setTimeout(() => win.classList.remove('wrong-flash', 'shake'), 500);
  }

  // ── Correct flash ─────────────────────────────────
  function correctFlash() {
    const win = document.querySelector('.terminal-window');
    if (!win) return;
    win.classList.add('correct-flash', 'correct-pulse');
    setTimeout(() => win.classList.remove('correct-flash', 'correct-pulse'), 600);
  }

  // ── Answer input control ──────────────────────────
  function lockInput(locked) {
    const inp = document.getElementById('inp-answer');
    const btn = document.getElementById('btn-submit');
    if (inp) inp.disabled = locked;
    if (btn) btn.disabled = locked;
  }

  function clearInput() {
    const inp = document.getElementById('inp-answer');
    if (inp) { inp.value = ''; inp.focus(); }
  }

  function focusInput() {
    const inp = document.getElementById('inp-answer');
    if (inp) inp.focus();
  }

  // ── Cooldown bar ──────────────────────────────────
  let cooldownTimer = null;
  function showCooldown(ms) {
    const bar = document.getElementById('cooldown-bar');
    const fill = document.getElementById('cooldown-fill');
    if (!bar || !fill) return;

    bar.classList.add('active');
    fill.style.width = '100%';
    const start = Date.now();

    clearInterval(cooldownTimer);
    cooldownTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / ms) * 100);
      fill.style.width = pct + '%';
      if (elapsed >= ms) {
        clearInterval(cooldownTimer);
        bar.classList.remove('active');
        fill.style.width = '0%';
      }
    }, 50);
  }

  // ── FLAG modal ────────────────────────────────────
  function showFlagModal(flag, stageName, stageId, nextStageId) {
    const modal = document.getElementById('modal-flag');
    const flagVal = document.getElementById('flag-value');
    const flagLabel = document.getElementById('flag-stage-label');
    const flagSub = document.getElementById('flag-sub');
    const btnNext = document.getElementById('btn-next-stage');
    const btnNextText = document.getElementById('btn-next-text');

    if (!modal) return;

    if (flagLabel) flagLabel.textContent = `STAGE ${stageId} CLEARED — ${stageName}`;
    if (flagVal) {
      flagVal.textContent = flag;
      flagVal.classList.remove('flag-scan');
      void flagVal.offsetWidth;
      flagVal.classList.add('flag-scan');
    }
    if (flagSub) flagSub.textContent = `Stage ${stageId} complete.`;
    if (btnNext && btnNextText) {
      if (nextStageId) {
        btnNextText.textContent = `ADVANCE TO STAGE ${nextStageId} →`;
      } else {
        btnNextText.textContent = 'COMPLETE THE ARCHIVE →';
      }
    }

    modal.classList.remove('hidden');
    const box = modal.querySelector('.modal-box');
    if (box) {
      box.classList.remove('flag-modal-enter');
      void box.offsetWidth;
      box.classList.add('flag-modal-enter');
    }

    burstParticles();
  }

  function hideFlagModal() {
    document.getElementById('modal-flag')?.classList.add('hidden');
  }

  function burstParticles() {
    const container = document.getElementById('flag-particles');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['p-amber', 'p-cyan', 'p-green'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = `particle ${colors[i % 3]}`;
      const angle = (i / 24) * Math.PI * 2;
      const dist = 60 + Math.random() * 80;
      p.style.cssText = `
        left: 50%; top: 50%;
        --dx: ${Math.cos(angle) * dist}px;
        --dy: ${Math.sin(angle) * dist - 40}px;
        --dur: ${0.6 + Math.random() * 0.5}s;
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // ── Leaderboard modal ─────────────────────────────
  function showLbModal(data, myTeam) {
    const modal = document.getElementById('modal-lb');
    const body = document.getElementById('lb-body');
    const meta = document.getElementById('lb-meta');
    if (!modal || !body) return;

    if (meta) {
      meta.textContent = `${data.activePlayers} active players · Updated ${new Date(data.updatedAt).toLocaleTimeString()}`;
    }

    body.innerHTML = '';
    const medals = ['🥇', '🥈', '🥉'];

    if (!data.leaderboard?.length) {
      body.innerHTML = '<tr><td colspan="5" class="lb-empty">No entries yet. Be the first!</td></tr>';
    } else {
      data.leaderboard.forEach((entry) => {
        const tr = document.createElement('tr');
        const isMe = myTeam && entry.teamName.toLowerCase() === myTeam.toLowerCase();
        if (isMe) tr.classList.add('my-row');
        if (entry.rank <= 3) tr.classList.add(`rank-${entry.rank}`);
        if (entry.completed) tr.classList.add('completed-row');

        tr.innerHTML = `
          <td class="td-rank">
            <span class="rank-medal">${medals[entry.rank - 1] || entry.rank}</span>
          </td>
          <td class="td-team">${escHtml(entry.teamName)}${isMe ? ' ◀' : ''}</td>
          <td class="td-stages">${entry.stagesCleared}/25</td>
          <td class="td-time">${escHtml(entry.totalTime)}</td>
          <td class="td-hints">${entry.hintsUsed}</td>
        `;
        body.appendChild(tr);
      });
    }

    modal.classList.remove('hidden');
  }

  function hideLbModal() {
    document.getElementById('modal-lb')?.classList.add('hidden');
  }

  // ── Victory screen ────────────────────────────────
  function showVictory(data) {
    document.getElementById('vic-team').textContent = data.teamName || '';
    document.getElementById('vic-time').textContent = data.totalTime || '--:--:--';
    document.getElementById('vic-stages').textContent = '25/25';
    document.getElementById('vic-hints').textContent = data.hintsUsed || 0;

    const flagsEl = document.getElementById('vic-flags');
    if (flagsEl && data.flags) {
      flagsEl.innerHTML = '';
      data.flags.forEach(f => {
        const chip = document.createElement('div');
        chip.className = 'vic-flag-chip';
        chip.textContent = f;
        flagsEl.appendChild(chip);
      });
    }

    showPage('pg-victory');
  }

  // ── Timer display ─────────────────────────────────
  function updateTimer(ms) {
    const el = document.getElementById('game-timer');
    if (!el) return;
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    el.textContent = `${pad(h)}:${pad(m % 60)}:${pad(s % 60)}`;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  // ── Typewriter effect ─────────────────────────────
  function typewriter(el, texts, delay = 3000) {
    if (!el) return;
    let textIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const current = texts[textIdx];
      el.textContent = deleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

      if (!deleting && charIdx > current.length) {
        deleting = true;
        setTimeout(tick, delay);
        return;
      }
      if (deleting && charIdx < 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        charIdx = 0;
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
  }

  // ── XSS escape ───────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Boot sequence in terminal ─────────────────────
  function bootSequence(teamName, stage, stageName) {
    clearLog();
    const lines = [
      `ARCHIVE TERMINAL v2.4.1`,
      `SESSION ESTABLISHED`,
      `AGENT: ${teamName}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `STAGE ${stage}: ${stageName}`,
      `Type your answer and press ENTER or click SUBMIT.`,
      `One HINT available per stage.`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ];
    lines.forEach((line, i) => {
      setTimeout(() => tlog(line, 'system'), i * 60);
    });
    return lines.length * 60;
  }

  // ── Matrix canvas background ──────────────────────
  function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, cols, drops;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / 18);
      drops = new Array(cols).fill(1);
    }

    const chars = '0123456789ABCDEF◆◈⚑▸✓✗→←↑↓';

    function draw() {
      ctx.fillStyle = 'rgba(3,5,8,0.06)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#00d4ff';
      ctx.font = '13px Share Tech Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(c, i * 18, drops[i] * 18);
        if (drops[i] * 18 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 80);
  }

  return {
    showPage, showLoading, hideLoading, showToast,
    tlog, tlogInput, clearLog, renderClue,
    updateClueSteps, buildStageMap, buildMiniMap,
    updateHeader, updateSidebar, setHintState,
    setFeedback, wrongShake, correctFlash,
    lockInput, clearInput, focusInput,
    showCooldown, showFlagModal, hideFlagModal,
    showLbModal, hideLbModal, showVictory,
    updateTimer, typewriter, bootSequence,
    initMatrix, escHtml
  };
})();

window.UI = UI;
