# Architecture

## North star
Mission Control is the canonical brain/shared state for the AI office.

### Surfaces
- Discord = operational workspace
- Telegram = owner/mobile control panel
- Mission Control = source of truth

## Lanes
- Manager
- Web
- SEO
- Growth
- Content
- Systems

## Build order
1. Shared task state
2. Event feed
3. Manager orchestration
4. Owner exception queue
5. Telegram summaries / approvals
6. Discord lane relay
7. Direct agent messaging
8. Visual office layer

## Main principle
Do not let Discord and Telegram become competing sources of truth.

All meaningful state should flow through Mission Control first.

## Manager responsibilities
- read new tasks
- assign owner lane
- split multi-lane work
- monitor progress
- request handoffs
- escalate blockers
- write summaries

## Lane responsibilities
Each lane should:
- execute specialist work
- update task status
- request handoff when needed
- escalate blockers to manager

## Telegram rules
Send only:
- approvals
- urgent blockers
- daily brief
- strategic decisions
- missing access/info

Do not send:
- every status change
- internal chatter
- routine handoffs

## Discord rules
Discord should show:
- lane execution
- task progress
- handoff visibility
- approvals queue
- daily brief

Discord should not be the only place tasks live.

## End state
A user gives one instruction.
Manager breaks it down.
Lanes execute and coordinate.
Only meaningful exceptions reach Daniel.
