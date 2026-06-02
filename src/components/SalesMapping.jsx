export default function SalesMapping() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Sales Mapping by Country</h3>
      <div className="flex items-center justify-center h-40">
        <svg viewBox="0 0 1000 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Simplified world map blobs */}
          {/* North America */}
          <ellipse cx="200" cy="180" rx="120" ry="90" fill="#e0e7ff" opacity="0.8" />
          <ellipse cx="180" cy="260" rx="60" ry="50" fill="#c7d2fe" opacity="0.8" />
          {/* South America */}
          <ellipse cx="270" cy="350" rx="60" ry="80" fill="#ef4444" opacity="0.7" />
          {/* Europe */}
          <ellipse cx="480" cy="160" rx="60" ry="55" fill="#e0e7ff" opacity="0.8" />
          {/* Africa */}
          <ellipse cx="490" cy="300" rx="65" ry="90" fill="#fde68a" opacity="0.8" />
          {/* Asia */}
          <ellipse cx="700" cy="190" rx="160" ry="100" fill="#6366f1" opacity="0.7" />
          {/* Southeast Asia */}
          <ellipse cx="780" cy="310" rx="60" ry="50" fill="#a5b4fc" opacity="0.7" />
          {/* Australia */}
          <ellipse cx="820" cy="390" rx="70" ry="50" fill="#e0e7ff" opacity="0.7" />
          {/* Japan / East Asia highlight */}
          <circle cx="840" cy="200" r="18" fill="#4f46e5" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}
