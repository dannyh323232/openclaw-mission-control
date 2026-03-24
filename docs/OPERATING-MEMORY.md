# Operating Memory

This file exists so future work on this repo does not lose the vital context.

## What this project is
A Mission Control / Control Room app for coordinated multi-agent operations.

## What this project is not
- not the Refined website
- not the clone site
- not a replacement for `refinedmedicalaestheticsuk`

## Important repo boundary
Do not mix this project into `refinedmedicalaestheticsuk`.
Keep Mission Control separate.

## Current repo purpose
This repo currently holds the UI prototype for:
- tasks
- calendar
- projects
- memory
- team
- office

## Current implementation state
Built:
- Next.js app scaffold
- shared shell
- screenshot-inspired pages
- clean local build

Not built yet:
- persistence/database
- CRUD actions
- manager engine
- event bus
- Discord relay
- Telegram relay
- auth/access control

## Critical product truths
- workflow first, visual office second
- manager autonomy matters more than lane autonomy
- Mission Control must become source of truth
- owner should see summaries/exceptions, not raw chatter

## Known desired repo name
- `openclaw-mission-control`

## Known deployment preference
Daniel needs a real preview link he can open on phone, not localhost.

## Immediate next build target
- shared data model
- real persistence
- editable tasks/projects/schedules
- approvals + agents screens
- relay architecture after state is real
