# OpenClaw Mission Control

Mission Control is a multi-view control room for a coordinated AI office.

Current prototype includes screenshot-inspired views for:
- Tasks
- Calendar
- Projects
- Memory
- Team
- Office

## What this repo is for
This repo is **not** the Refined website and must stay separate from `refinedmedicalaestheticsuk`.

Its purpose is to become the backend + UI control layer for:
- manager orchestration
- lane state
- task routing
- approvals
- summaries
- event history
- Discord / Telegram relay

## Current status
Working now:
- shared app shell
- multi-page UI
- local dev/build works
- GitHub repo created and pushed

Not built yet:
- persistence
- CRUD
- real task/event store
- manager logic
- Telegram relay
- Discord relay
- agent-to-agent orchestration

## Local development
```bash
npm install
npm run dev
```

Then open:
- `http://localhost:3000`

## Build
```bash
npm run build
npm run start
```

## Main routes
- `/tasks`
- `/calendar`
- `/projects`
- `/memory`
- `/team`
- `/office`

## Fast deployment options
### Option 1 — Vercel
This is the easiest preview path for a Next.js app.

Steps:
1. Import the repo into Vercel
2. Framework: Next.js
3. Build command: `npm run build`
4. Output: default Next.js output
5. Deploy

### Option 2 — VPS / Docker / reverse proxy
Use if you want Mission Control hosted inside the existing OpenClaw stack later.

## Critical project rule
Build the **operating system first**.
Do not prioritise the pretty office over real workflow.

That means the build order is:
1. shared state
2. task/event model
3. manager orchestration
4. approvals/summaries
5. Discord + Telegram relay
6. richer visuals

## Must-read project docs
- `docs/ARCHITECTURE.md`
- `docs/OPERATING-MEMORY.md`
- `docs/BUILD-NEXT.md`

## Core goal sentence
> One instruction from Daniel becomes coordinated multi-lane execution, with only meaningful exceptions sent back to him.
