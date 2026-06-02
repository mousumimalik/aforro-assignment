# Aforro Sales Dashboard (Aforro)

React dashboard UI with a live **Users** data table powered by [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

**Repository:** [github.com/mousumimalik/aforro-assignment](https://github.com/mousumimalik/aforro-assignment)  
**Extended documentation:** [DOCUMENTATION.md](./DOCUMENTATION.md)

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Navigation

| Action | Result |
|--------|--------|
| **Users** (sidebar) | Scrolls to the Users Directory table |
| **Dashboard** (sidebar) | Stays on the main dashboard view |
| **Header search** | Filters the users table; typing scrolls to the table; **Enter** also scrolls to the table |
| **Table search / city / sort** | Filters and sorts rows in the Users Directory section |
| **Reload** (table toolbar) | Refetches API data; shows a skeleton loader in the table area only |
| **Leaderboard, Export, Get Pro, etc.** | Opens a popover: *This could be build on request* |

## Tech stack

- React 19 (functional components)
- Vite 8
- Tailwind CSS 4
- Recharts (charts)
- Lucide React (icons)
- Fetch API (user data)

## Features

- Dashboard layout aligned with the provided design (Today’s Sales + Visitor Insights in one row)
- Responsive sidebar drawer on mobile/tablet
- Users table: search (name/email), city filter, A–Z / Z–A sort, loading skeleton, error handling
- Debounced search (300ms) to limit re-filtering while typing

## Deploy on GitHub Pages

```bash
npm run build:gh-pages
```

Deploy the `dist/` folder to the `gh-pages` branch (or use GitHub Actions). Site URL:

`https://mousumimalik.github.io/aforro-assignment/`

See [DOCUMENTATION.md](./DOCUMENTATION.md) for full implementation notes.
