# Dabang Sales Dashboard (Aforro)

React sales dashboard with live user data from JSONPlaceholder.

**Repository:** [github.com/mousumimalik/aforro-assignment](https://github.com/mousumimalik/aforro-assignment)  
**Live site (GitHub Pages):** [mousumimalik.github.io/aforro-assignment](https://mousumimalik.github.io/aforro-assignment/)  
**Full documentation:** [DOCUMENTATION.md](./DOCUMENTATION.md)

---

## Project setup

**Requirements:** Node.js 18+ and npm.

```bash
# Clone the repository
git clone https://github.com/mousumimalik/aforro-assignment.git
cd aforro-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

**Production build:**

```bash
npm run build
npm run preview
```

**GitHub Pages build:**

```bash
npm run build:gh-pages
```

Deploy the `dist/` folder or push to `main` to trigger the included GitHub Actions workflow.

---

## Features implemented

### Part 1 — Dashboard UI

- Layout based on the provided sales dashboard design (sidebar, header, metric cards, charts).
- **Today’s Sales** and **Visitor Insights** in the same top row.
- Chart rows use equal-height cards per row (`DashboardCard` + CSS grid `items-stretch`).
- **Sales Mapping by Country** using `react-simple-maps` with highlighted countries (USA, Brazil, DRC, Saudi Arabia, China, Indonesia).
- Responsive layout: sidebar drawer on mobile, stacked grids on smaller screens.
- Recharts for bar, line, and area charts with static demo data.

### Part 2 — API table

- Fetches users from `https://jsonplaceholder.typicode.com/users`
- Table columns: Name, Email, Company Name, City
- Search by name or email (header + table, shared state, 300ms debounce)
- Sort by name (A–Z / Z–A)
- Filter by city
- Reload refetches only the table with a skeleton loader (no full-page flash)
- Loading and error states

### Interactions

| Works | Shows popover (*This could be build on request*) |
|--------|--------------------------------------------------|
| Dashboard / Users sidebar, header search, table controls | Export, Get Pro, Leaderboard, order, Products, Sales Report, Messages, Settings, Sign Out, language, notifications, profile |

---

## Navigation

1. **Users table** — scroll to the bottom or click **Users** in the sidebar.
2. **Header search** — type to filter users; page scrolls to the table; press **Enter** to scroll even with an empty query.
3. **Table toolbar** — search, city filter, sort, reload.

---

## Assumptions and decisions

- Dashboard chart numbers are **static demo data** (not from an API).
- User data comes from **JSONPlaceholder** (requires internet in the browser).
- No React Router — navigation uses scroll and local state.
- `react-simple-maps` is installed with `--legacy-peer-deps` because its peer range does not yet list React 19 (works in practice).
- World map countries are colored by country name from the TopoJSON dataset; unlisted countries use a neutral gray.
- Avatar uses a public placeholder image URL.
- Search is debounced (300ms) to avoid re-filtering on every keystroke while keeping the input instant.

---

## Tech stack

React 19 · Vite 8 · Tailwind CSS 4 · Recharts · react-simple-maps · Lucide React · Fetch API
