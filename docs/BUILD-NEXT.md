# Build Next

## Immediate next steps
1. Add shared data types for:
   - tasks
   - projects
   - schedules
   - events
   - agents
   - approvals
2. Add persistence layer
   - simplest acceptable first option: JSON or SQLite
3. Replace mock data with shared data source
4. Add CRUD for tasks / schedules / projects
5. Add Approvals page
6. Add Agents page
7. Add manager event feed logic
8. Add Telegram/Discord relay adapters

## Delivery rule
Do not spend major time polishing visuals until state, CRUD, and orchestration are real.

## Preview/deploy note
Best fast preview path is Vercel because this is a stock Next.js app.

## Security note
Do not store GitHub tokens directly inside committed repo files.
Rotate any old token-in-remote setup later.
