# ◈ THE ARCHIVE
### A Large-Scale Technical Treasure Hunt Platform

> *"25 stages. 125 clues. One archive. Only the worthy may enter."*

A production-ready, security-hardened web application for running large-scale cryptographic treasure hunt events. Supports hundreds of concurrent participants with full anti-cheat measures.

---

## ⚡ Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
cp .env.example .env
node server.js
# → Running on http://localhost:3001
```

### 2. Serve the Frontend
```bash
cd frontend
npx serve . -p 3000
# → Open http://localhost:3000
```

---

## 📁 Repository Structure

```
the-archive/
│
├── backend/                        # Node.js + Express API server
│   ├── server.js                   # Express app entry point
│   ├── package.json
│   ├── .env.example                # Environment template
│   │
│   ├── data/
│   │   ├── stages.js               # ⚠️  ALL stage data, answers, flags (NEVER sent to client)
│   │   └── sessionStore.js         # In-memory session + leaderboard store
│   │
│   ├── routes/
│   │   ├── game.js                 # /api/game/* — start, clue, submit, hint, status
│   │   └── leaderboard.js          # /api/leaderboard
│   │
│   ├── middleware/
│   │   ├── auth.js                 # Session validation middleware
│   │   └── rateLimiter.js          # Per-endpoint rate limiting
│   │
│   └── utils/
│       └── logger.js               # Structured console logger
│
└── frontend/                       # Pure HTML + CSS + Vanilla JS
    ├── index.html                  # Single-page app shell
    ├── package.json
    │
    ├── css/
    │   ├── main.css                # Full design system + layout
    │   ├── animations.css          # Glitch, transitions, particles
    │   └── components.css          # Tier colors, leaderboard, responsive
    │
    └── js/
        ├── config.js               # API base URL, client settings
        ├── api.js                  # Fetch wrapper, session header injection
        ├── ui.js                   # All DOM manipulation and rendering
        ├── game.js                 # Game state machine
        └── main.js                 # Event wiring, app bootstrap
```

---

## 🎮 Game Structure

| Tier | Stages | Theme | Difficulty |
|------|--------|-------|------------|
| I — INITIATION | 1–5 | Logic, patterns, binary, hex | Beginner |
| II — THE STACKS | 6–10 | Networking, hashing, regex, web | Moderate |
| III — RESTRICTED | 11–15 | Linux, algorithms, JS quirks, crypto | Technical |
| IV — DEEP ARCHIVE | 16–20 | Base64, SQL injection, stego, RE | Advanced |
| V — THE VAULT | 21–25 | Vigenère, memory exploits, TCP, Turing | Extreme |

Each stage: **5 clues** (Easy → Medium-Easy → Medium → Hard → Extreme) → **FLAG{...}**

---

## 🔒 Security Architecture

### What NEVER reaches the client
- Stage answers
- Hints (until explicitly requested, one per stage)
- Future clue text
- Flag values (only returned after correct final answer)
- Other teams' session data

### Anti-cheat measures
| Threat | Mitigation |
|--------|-----------|
| Source code inspection | All answers/hints in backend `data/stages.js` only |
| Stage skipping | Server enforces sequential progression via session state |
| Brute force | Rate limit: 20 submissions/minute per IP+session |
| Answer spam | 2-second server-side cooldown between submissions |
| Session theft | Sessions tied to UUID; expire after 6 hours of inactivity |
| API flooding | Global rate limit: 100 req/min per IP |
| Route manipulation | All `/api/game/*` routes require valid session header |

### API Security
```
x-session-id: <uuid>   ← sent in header, never in URL
```
No JWT, no cookies — session ID in request header only.

---

## 🌐 API Reference

### POST /api/game/start
```json
{ "teamName": "TEAM_ALPHA" }
→ { "sessionId": "uuid", "teamName": "...", "stage": 1, "clue": 1, ... }
```

### GET /api/game/clue
```
Header: x-session-id: <uuid>
→ { "clueText": "...", "stage": 1, "clue": 1, "hintAvailable": true, ... }
```

### POST /api/game/submit
```json
{ "answer": "hello" }
→ { "result": "correct|wrong|stage_clear", "correct": true, ... }
```
On `stage_clear`, returns `flag` value.

### POST /api/game/hint
```
→ { "hint": "...", "hintsUsed": 1 }
```
One hint per stage, consumed permanently.

### GET /api/leaderboard
```
→ { "leaderboard": [...], "activePlayers": 42 }
```

### GET /api/game/status
Reconnect endpoint — returns full session state without clue answer.

---

## 🚀 Production Deployment

### Backend (Railway / Render / VPS)
```bash
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://your-frontend-domain.com
LOG_LEVEL=warn
```

### Frontend (Vercel / Netlify / GitHub Pages)
1. Update `js/config.js`:
   ```js
   API_BASE: 'https://your-backend.railway.app/api'
   ```
2. Deploy `frontend/` as static site — no build step needed.

### For high scale (1000+ concurrent)
- Replace `data/sessionStore.js` in-memory Map with **Redis** (`ioredis`)
- Add **PM2** cluster mode for multi-core
- Put **Nginx** reverse proxy in front
- Add **Redis** pub/sub for real-time leaderboard

---

## 🛠 Customisation

### Adding/editing clues
Edit `backend/data/stages.js` — add stages or modify existing ones:
```js
{
  id: 1,
  name: "Stage Name",
  tier: "TIER I — INITIATION",
  flag: makeFlag("MY_FLAG"),
  clues: [
    {
      id: 1,
      text: "Question text shown to users...",
      answer: norm("the answer"),  // always lowercase, trimmed
      hint: "Helpful hint shown on request."
    },
    // ...5 clues per stage
  ]
}
```
`norm()` normalises answers (lowercase + trim). Answers are never sent to the client.

### Changing API URL
Edit `frontend/js/config.js`:
```js
API_BASE: 'https://your-backend.com/api'
```

---

## 📊 Leaderboard Scoring

Ranking priority:
1. Most stages cleared (descending)
2. Fastest total time (ascending)
3. Fewest hints used (ascending, tiebreaker)

---

## 🔧 Dependencies

**Backend only:**
- `express` — HTTP server
- `express-rate-limit` — rate limiting
- `cors` — CORS headers
- `helmet` — security headers
- `uuid` — session ID generation
- `morgan` — request logging

**Frontend:** Zero dependencies. Pure HTML/CSS/JS.

---

## 📜 License

MIT — free for educational and event use.

---

*The Archive was designed for college-level technical treasure hunt events.*
*Handle with care. The vault does not forgive the unworthy.*
