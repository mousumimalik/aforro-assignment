# Dabang Sales Dashboard — Full Documentation

| | |
|---|---|
| **Repository** | [https://github.com/mousumimalik/aforro-assignment](https://github.com/mousumimalik/aforro-assignment) |
| **Live demo** | [https://mousumimalik.github.io/aforro-assignment/](https://mousumimalik.github.io/aforro-assignment/) |

---

## 1. Project setup

```bash
git clone https://github.com/mousumimalik/aforro-assignment.git
cd aforro-assignment
npm install
npm run dev
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Local development with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run build:gh-pages` | Build with base path `/aforro-assignment/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |

---

## 2. Features implemented

### Part 1 — UI

- Sidebar navigation with active states
- Header with global user search
- Today’s Sales summary cards
- Visitor Insights line chart (same row as sales on `xl` screens)
- Total Revenue, Customer Satisfaction, Target vs Reality charts
- Top Products table (static)
- Sales Mapping by Country (interactive world map)
- Volume vs Service Level chart
- Equal-height cards within each dashboard row
- Mobile sidebar drawer and responsive grids

### Part 2 — API table

- Source: [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users)
- Columns: Name, Email, Company Name, City
- Search (name / email), city filter, name sort, reload
- Debounced search (300ms)
- Table-only skeleton on reload
- Initial load and error handling

---

## 3. UI approach

### Component structure

- **Functional components** only (no class components).
- **`DashboardCard`** — shared wrapper: `h-full flex flex-col`, title, flexible body, optional footer. Keeps every card in a grid row the same height.
- **Layout** — Tailwind CSS utility classes; no separate CSS modules for widgets.
- **Grid rows** in `App.jsx`:
  - `items-stretch` + `min-h-[320px]` (or `300px` for row 1)
  - Each column wrapped in `flex` + `w-full h-full` so children stretch

### Chart library

**[Recharts](https://recharts.org/)** — used for:

| Component | Chart type |
|-----------|------------|
| VisitorInsights | `LineChart` |
| TotalRevenue | `BarChart` (grouped) |
| CustomerSatisfaction | `AreaChart` |
| TargetVsReality | `BarChart` (grouped) |
| VolumeServiceLevel | `BarChart` (grouped) |

Charts use `ResponsiveContainer` with `height="100%"` inside a `flex-1 min-h-[200px]` parent so they fill the card evenly.

### World map

**[react-simple-maps](https://www.react-simple-maps.io/)** with TopoJSON from:

`https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`

Highlighted countries (design colors):

| Country | Fill |
|---------|------|
| United States | Orange `#F59E0B` |
| Brazil | Red/pink `#F87171` |
| Dem. Rep. Congo | Light blue `#93C5FD` |
| Saudi Arabia | Teal `#0D9488` |
| China | Purple `#8B5CF6` |
| Indonesia | Green `#4ADE80` |
| All others | Gray `#E8ECF4` |

Projection: `geoEqualEarth`, white country borders.

### Users table

- **No table library** — semantic HTML `<table>` in `UsersTable.jsx`.
- **Fetch API** (not Axios) for `GET /users`.
- **Filter:** `useMemo` over in-memory array; case-insensitive `includes` on name and email.
- **Sort:** `localeCompare` on name, toggled asc/desc.
- **City filter:** `<select>` built from unique `address.city` values after load.

### Search optimization

- Input state (`userSearch`) updates immediately in the UI.
- Filtering uses `useDebouncedValue(userSearch, 300)` in `App.jsx`.
- Only the debounced value is passed to `UsersTable` as `searchQuery`, so filtering runs at most ~3 times per second while typing instead of every keypress.

### Reload / loader

- **Reload** calls `load({ reload: true })`.
- Sets `isReloading` only — does **not** clear the rest of the dashboard.
- Table body shows **`TableSkeleton`** (8 rows × 4 columns, pulse animation).
- Toolbar stays mounted; reload button shows spinning icon and is disabled.
- `min-h-[360px]` on the table body prevents layout jump.
- If reload fails but prior data exists, an amber inline message is shown and old rows remain.

---

## 4. What is clickable

### Functional

- Sidebar: **Dashboard**, **Users** (scroll to table)
- Mobile: menu button, drawer backdrop
- Header: search input (filter + scroll)
- Users table: search, city, sort, reload, retry on error

### Popover only

`PlaceholderAction.jsx` — click opens a small popover with *This could be build on request*:

- Export, Get Pro
- Leaderboard, order, Products, Sales Report, Messages, Settings, Sign Out
- Language, notifications, profile

---

## 5. Assumptions and decisions

1. Design reference is followed for structure and spacing; pixel-perfect match is not required per the brief.
2. Chart data is hard-coded for demonstration.
3. Map highlights are fixed (not driven by API).
4. React 19 + `react-simple-maps` via `--legacy-peer-deps` until upstream peer deps include React 19.
5. GitHub Pages uses `base: '/aforro-assignment/'` when `GITHUB_PAGES=true`.
6. No authentication or backend — frontend-only SPA.

---

## 6. Tech stack summary

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts 3 |
| Map | react-simple-maps 3 |
| Icons | lucide-react |
| Data | fetch → JSONPlaceholder |

---

## 7. Folder map

```
src/
├── App.jsx
├── hooks/useDebouncedValue.js
└── components/
    ├── DashboardCard.jsx
    ├── Sidebar.jsx
    ├── Header.jsx
    ├── StatsCards.jsx
    ├── VisitorInsights.jsx
    ├── TotalRevenue.jsx
    ├── CustomerSatisfaction.jsx
    ├── TargetVsReality.jsx
    ├── TopProducts.jsx
    ├── SalesMapping.jsx
    ├── VolumeServiceLevel.jsx
    ├── UsersTable.jsx
    ├── TableSkeleton.jsx
    └── PlaceholderAction.jsx
```

---

## 8. Deployment (GitHub Pages)

1. Push to `main` on [aforro-assignment](https://github.com/mousumimalik/aforro-assignment).
2. Enable **Pages** → Source: **GitHub Actions** (workflow in `.github/workflows/deploy.yml`).
3. Site URL: **https://mousumimalik.github.io/aforro-assignment/**

---

## 9. Possible future work

- CSV export
- Pagination on users table
- React Router for multiple pages
- Map tooltips with sales values per country
- E2E tests for search and sort
