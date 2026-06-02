import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDownAZ, ArrowUpZA, RefreshCw, Search } from 'lucide-react';
import TableSkeleton from './TableSkeleton';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function normalize(str) {
  return String(str ?? '').trim().toLowerCase();
}

export default function UsersTable({ searchQuery = '', searchInput = '', onSearchChange }) {
  const [users, setUsers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [city, setCity] = useState('all');
  const [sortDir, setSortDir] = useState('asc');

  const load = useCallback(async ({ reload = false } = {}) => {
    if (reload) {
      setIsReloading(true);
    } else {
      setInitialLoading(true);
    }
    setLoadError('');

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setLoadError(message);
      if (!reload) setUsers([]);
    } finally {
      setInitialLoading(false);
      setIsReloading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cities = useMemo(() => {
    const list = users.map((u) => u?.address?.city).filter(Boolean).map(String);
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
  }, [users]);

  const filtered = useMemo(() => {
    const q = normalize(searchQuery);
    return [...users]
      .filter((u) => {
        if (!q) return true;
        return normalize(u?.name).includes(q) || normalize(u?.email).includes(q);
      })
      .filter((u) => (city === 'all' ? true : String(u?.address?.city ?? '') === city))
      .sort((a, b) => {
        const cmp = String(a?.name ?? '').localeCompare(String(b?.name ?? ''));
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [users, searchQuery, city, sortDir]);

  const showSkeleton = initialLoading || isReloading;
  const hasData = users.length > 0;
  const showTable = hasData && !initialLoading;
  const showInitialError = !initialLoading && !hasData && loadError;

  return (
    <section className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800">Users Directory</h3>
          <p className="text-xs text-gray-500 mt-1">
            Live data from JSONPlaceholder. Use the header search or controls below to filter results.
          </p>
        </div>
        {hasData && !initialLoading && (
          <p className="text-sm text-gray-500 shrink-0">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of{' '}
            <span className="font-semibold text-gray-800">{users.length}</span> users
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap sm:gap-3 mb-4">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2 w-full sm:w-72">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            value={searchInput}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search by name or email..."
            className="bg-transparent text-sm text-gray-600 outline-none w-full"
            aria-label="Search users"
          />
        </div>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isReloading}
          className="cursor-pointer w-full sm:w-48 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none disabled:opacity-60"
          aria-label="Filter by city"
        >
          <option value="all">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
          disabled={isReloading || !hasData}
          className="cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-200 bg-white text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sortDir === 'asc' ? <ArrowDownAZ size={16} /> : <ArrowUpZA size={16} />}
          Sort {sortDir === 'asc' ? 'A–Z' : 'Z–A'}
        </button>

        <button
          type="button"
          onClick={() => load({ reload: true })}
          disabled={isReloading}
          className="cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-200 bg-white text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={isReloading ? 'animate-spin' : ''} />
          Reload
        </button>
      </div>

      {loadError && hasData && (
        <p className="mb-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          Could not refresh data: {loadError}. Showing last loaded results.
        </p>
      )}

      <div className="min-h-[360px]">
        {showInitialError && (
          <div className="py-12 text-center">
            <p className="text-sm text-red-500 font-medium">Failed to load users</p>
            <p className="text-xs text-gray-500 mt-1">{loadError}</p>
            <button
              type="button"
              onClick={() => load()}
              className="cursor-pointer mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        )}

        {showSkeleton && <TableSkeleton rows={8} columns={4} />}

        {showTable && !isReloading && (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="min-w-[640px] w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Company Name</th>
                    <th className="px-4 py-3 font-semibold">City</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-t border-gray-100 hover:bg-indigo-50/40 transition">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{u.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u?.company?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u?.address?.city ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <p className="text-sm text-gray-500 py-8 text-center">
                No users match your search or filter. Clear the search box or select &quot;All cities&quot;.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
