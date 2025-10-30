# Next.js + Tailwind + TypeScript To-Do (API persistence)

A beginner-friendly To-Do app built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.  
Todos are persisted on the server via **Next API routes** to a simple JSON file (`/data/todos.json`) — perfect for learning.

## Software required

- **Windows 10/11**, macOS, or Linux
- **Node.js LTS** (18+ or 20+) – includes `npm`
- **Git**
- (Optional) **Visual Studio Code**

## Windows installation (two options)

### Option A — one script (PowerShell, uses winget)
1. Open **PowerShell as Administrator**.
2. (First time only) allow local scripts:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
3. From the project root, run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\windows-setup.ps1
   ```
   The script will:
   - Install Node.js LTS and Git (if missing) via `winget`
   - Run `npm install`
   - Run tests (`npm test`)
   - Start the dev server (`npm run dev`) on http://localhost:3000

> If `winget` is not available, the script will tell you where to download Node.js and Git manually.

### Option B — manual install
1. Install **Node.js LTS** from https://nodejs.org/ (choose “LTS”).
2. Install **Git** from https://git-scm.com/download/win.
3. Open a new **Terminal** (so PATH updates).
4. In the project folder, run:
   ```powershell
   npm install
   npm test
   npm run dev
   ```
5. Open http://localhost:3000

## macOS & Linux
```bash
# Using Homebrew on macOS (examples)
brew install node git
npm install
npm test
npm run dev
# open http://localhost:3000
```

## Project structure
```
app/
  api/
    todos/route.ts        # GET (list), POST (create)
    todos/[id]/route.ts   # PATCH (update), DELETE (remove)
  layout.tsx              # Tailwind import + app shell
  page.tsx                # UI (client-side)
components/
  TodoForm.tsx
  TodoItem.tsx
  TodoList.tsx
data/
  todos.json              # JSON persistence (dev/demo)
lib/
  db.ts                   # read/write JSON “db”
  types.ts
  useTodos.ts             # client hook: fetch + mutate
__tests__/                # Vitest tests (API + components)
scripts/
  windows-setup.ps1
```

## Running the application
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Running tests
```bash
npm test
# or interactive UI:
npm run test:ui
```

## Notes
- The API routes use the **Node.js runtime** (not Edge) to allow file I/O.
- For tests, we set `process.env.TODO_DB_PATH` to a temp file to avoid touching real data.
- This JSON persistence is **dev-only**. In production, swap `lib/db.ts` for a real database (e.g., SQLite, Postgres, or a hosted service like Supabase/Neon).
