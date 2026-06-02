export default function DashboardCard({ title, children, footer, className = '' }) {
  return (
    <div
      className={`bg-white rounded-xl p-4 border border-gray-100 h-full flex flex-col shadow-sm ${className}`}
    >
      {title && <h3 className="text-sm font-semibold text-gray-800 mb-3 shrink-0">{title}</h3>}
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      {footer ? <div className="shrink-0 mt-3 pt-1 border-t border-gray-50">{footer}</div> : null}
    </div>
  );
}
