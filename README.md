# OpenClaw Mission Control

Mission Control is the local operations cockpit for a coordinated AI office.

## Current MVP state
Working now:
- shared JSON-backed data model in `src/data/mission-control.json`
- live-loaded pages for manager, history, relay, tasks, calendar, projects, approvals, memory, and team
- usable manager/system architecture surface inside the app
- event/history visibility as a proper page, not just a small dashboard strip
- relay readiness page that prepares Discord/Telegram contracts without faking live connectivity
- CRUD for:
  - tasks: create, move between lanes, delete
  - projects: create, delete
  - schedule items: create, delete
  - approvals: approve / reject
- polished dark multi-view shell preserved from the UI rebuild
- local dev/build/lint works

Still mock / not live yet:
- Office view is still visual only
- no live Discord relay
- no live Telegram relay
- no background manager logic yet
- no real-time multi-user sync or database layer

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

## Local development
```bash
npm install
npm run dev
```

Then open:
- `http://localhost:3000`

## Build
```bash
npm run lint
npm run build
npm run start
```

## Main routes
- `/tasks`
- `/calendar`
- `/projects`
- `/approvals`
- `/memory`
- `/team`
- `/office`

## Persistence
For the MVP, persistence is file-based and local:
- source of truth: `src/data/mission-control.json`
- reads: server-side page load
- writes: Next server actions

This keeps the app simple, fast to iterate, and easy to demo locally.

## Netlify deploy
This repo is now prepared for Netlify as a real Next.js app.

Use these settings in Netlify:
- Repo: `dannyh323232/openclaw-mission-control`
- Build command: `npm run build`
- Publish directory: leave blank / let Netlify detect Next.js
- Node version: `22`

Config file included:
- `netlify.toml`

## Relay environment
To enable live outbound relay tests from `/relay`, copy `.env.example` to `.env.local` and set:
- `DISCORD_WEBHOOK_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Without these, the Relay page still works, but test sends will log the blocker into History instead of sending.

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
