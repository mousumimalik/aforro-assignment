# Aforro Sales Dashboard — Technical Documentation

**Project:** Aforro React assignment  
**Repository:** [https://github.com/mousumimalik/aforro-assignment](https://github.com/mousumimalik/aforro-assignment)  
**Live demo (after GitHub Pages deploy):** [https://mousumimalik.github.io/aforro-assignment/](https://mousumimalik.github.io/aforro-assignment/)

---

## 1. Overview

This project is a single-page React application that recreates the **Aforro** sales dashboard and adds a **Users Directory** table fed by a public REST API. The UI is built with reusable functional components and Tailwind CSS utility classes. Charts use static sample data; the users table uses live API data.

---

## 2. Tech stack

| Layer | Choice | Notes |
|--------|--------|--------|
| UI library | React 19 | Functional components only |
| Bundler | Vite 8 | Fast dev server and production builds |
| Styling | Tailwind CSS 4 | Via `@tailwindcss/vite` plugin |
| Charts | [Recharts](https://recharts.org/) | Line, bar, and area charts for dashboard widgets |
| Icons | [Lucide React](https://lucide.dev/) | Sidebar, header, and table controls |
| Data fetching | Native `fetch` | No Axios; keeps bundle smaller |
| API | [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users) | 10 sample user records |

---

## 3. Project structure

```
src/
├── App.jsx                 # Layout, search state, navigation scroll
├── main.jsx
├── index.css
├── hooks/
│   └── useDebouncedValue.js
└── components/
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
    ├── UsersTable.jsx        # API table (Part 2)
    ├── TableSkeleton.jsx     # Loader for table body
    └── PlaceholderAction.jsx # Popover for non-implemented actions
```

---

## 4. UI implementation approach

### Layout

- **Sidebar (left):** Fixed on large screens; slide-over drawer on small screens with backdrop.
- **Header (top):** Title, global user search, language/notifications/profile controls.
- **Main content:** CSS Grid rows:
  1. **Today’s Sales** (8 cols) + **Visitor Insights** (4 cols) on `xl` breakpoints — matches the design reference where Visitor Insights sits beside sales, not in a separate full-height column.
  2. Revenue / satisfaction / target charts.
  3. Products table, sales map, volume chart.
  4. **Users Directory** (API table) at the bottom.

### Responsive behaviour

- Breakpoints: `sm`, `lg`, `xl` via Tailwind.
- Cards stack vertically on mobile; multi-column grids activate from `lg` / `xl`.
- Horizontal scroll on the users table when the viewport is narrow (`min-w-[640px]` on table).
- `scroll-mt-24` on the users section so the fixed header does not cover content when scrolling.

### Charts

All dashboard charts (except the API table) use **Recharts** with hard-coded arrays inside each component:

- `VisitorInsights` — multi-line chart (`LineChart`)
- `TotalRevenue` — grouped bars (`BarChart`)
- `CustomerSatisfaction` — area chart (`AreaChart`)
- `TargetVsReality` — grouped bars (`BarChart`)
- `VolumeServiceLevel` — grouped bars (`BarChart`)

`ResponsiveContainer` wraps each chart so it resizes with its parent card.

---

## 5. Users table (Part 2)

### Component

`UsersTable.jsx` — custom HTML `<table>`, not a third-party table library. This keeps control over markup, loading states, and styling.

### Columns

| Column | API field |
|--------|-----------|
| Name | `user.name` |
| Email | `user.email` |
| Company Name | `user.company.name` |
| City | `user.address.city` |

### Data loading

- Initial load: `fetch(API_URL)` on mount.
- **Reload button:** Calls the same fetch with `{ reload: true }`.
  - Only the **table body area** shows `TableSkeleton` (8 rows × 4 columns).
  - Toolbar (search, city, sort, reload) stays visible and does not unmount.
  - `min-h-[360px]` on the table container prevents layout jump.
  - On reload failure, previous rows remain visible and a small amber banner explains the error.

### Search

- **Header search** and **table search** share one state in `App.jsx` (`userSearch`).
- Filtering uses **`useDebouncedValue(userSearch, 300)`** — 300ms debounce before `filtered` recalculates.
- **Not debounced:** input display (instant typing feedback).
- **Debounced:** `useMemo` filter over name and email (case-insensitive substring match).

### Sort

- Toggle button switches `sortDir` between `asc` and `desc`.
- `localeCompare` on `user.name`.

### City filter

- `<select>` populated from unique `address.city` values after data loads.
- `"All cities"` shows every row.

### Loading & errors

| State | UI |
|--------|-----|
| Initial load | Skeleton in table area |
| Reload | Skeleton only; controls disabled where needed |
| Initial failure | Error message + Try again |
| Reload failure | Banner + last successful data |

---

## 6. Search & scroll behaviour

1. Type in the **header** search → updates `userSearch` immediately; after 300ms debounce, table filters.
2. Any non-empty header input → smooth scroll to `#users-data-section`.
3. Press **Enter** in header search → scrolls to the users table (even if the query is empty).
4. Click **Users** in the sidebar → scrolls to the same section.

---

## 7. Clickable vs non-clickable elements

### Fully functional

- Sidebar: **Dashboard**, **Users**
- Header: menu toggle (mobile), user search input
- Users table: search, city filter, sort, reload, try again on error
- Mobile sidebar close (backdrop)

### Popover placeholder (*This could be build on request*)

Implemented via `PlaceholderAction.jsx` (click toggles a small popover; click outside or Escape closes it):

- Export
- Get Pro
- Leaderboard, order, Products, Sales Report, Messages, Settings, Sign Out
- Language selector, notifications bell, profile block

---

## 8. Styling conventions

- Page background: `bg-gray-50`
- Cards: `bg-white`, `rounded-xl`, `border border-gray-100`
- Primary accent: indigo (`bg-indigo-600`, etc.)
- Interactive elements: `cursor-pointer`, hover backgrounds, `disabled:opacity-60` when loading

---

## 9. Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build to `dist/` |
| `npm run build:gh-pages` | Build with base path `/aforro-assignment/` for GitHub Pages |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |

---

## 10. GitHub deployment

1. Push code to [aforro-assignment](https://github.com/mousumimalik/aforro-assignment).
2. Run `npm run build:gh-pages`.
3. Publish `dist/` to GitHub Pages (branch `gh-pages` or Actions workflow).
4. Enable Pages in repository **Settings → Pages**.

---

## 11. Assumptions

- Dashboard metrics and charts use demo data (not from an API).
- Sidebar routes are in-page scroll/state only (no React Router).
- Avatar image uses a public placeholder URL.
- JSONPlaceholder is available at runtime (requires network in the browser).

---

## 12. Possible extensions

- React Router for real pages
- Pagination on the users table
- Row detail drawer
- Export to CSV
- Dark mode
- Unit tests for filter/sort helpers
