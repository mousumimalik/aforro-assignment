export default function TableSkeleton({ rows = 8, columns = 4 }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100" aria-busy="true" aria-label="Loading table data">
      <table className="min-w-[640px] w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="border-t border-gray-100">
              {Array.from({ length: columns }).map((__, col) => (
                <td key={col} className="px-4 py-3">
                  <div
                    className="h-4 rounded bg-gray-100 animate-pulse"
                    style={{ width: `${55 + ((row + col) % 4) * 10}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
