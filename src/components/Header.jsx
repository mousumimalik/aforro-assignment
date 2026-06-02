import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import PlaceholderAction from './PlaceholderAction';

export default function Header({
  onOpenSidebar,
  searchValue = '',
  onSearchChange,
  onSearchFocus,
  onSearchEnter,
}) {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 shrink-0">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.99] transition lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <h1 className="text-lg sm:text-xl font-bold text-gray-800 mr-1 sm:mr-4 shrink-0">Dashboard</h1>

      <div className="flex flex-1 max-w-xl items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 gap-2 min-w-0">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          onFocus={onSearchFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchEnter?.();
          }}
          placeholder="Search here..."
          className="bg-transparent text-sm text-gray-600 outline-none w-full min-w-0"
          aria-label="Search users by name or email"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4 shrink-0">
        <PlaceholderAction
          as="div"
          align="right"
          className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
        >
          <span>🇺🇸</span>
          <span>Eng (US)</span>
          <ChevronDown size={14} />
        </PlaceholderAction>

        <PlaceholderAction
          align="right"
          className="relative inline-flex p-1 rounded-lg hover:bg-gray-50 transition"
        >
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-orange-400 rounded-full text-white text-[10px] flex items-center justify-center pointer-events-none">
            3
          </span>
        </PlaceholderAction>

        <PlaceholderAction
          align="right"
          className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
        >
          <img
            src="https://i.pravatar.cc/32?img=8"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="leading-tight hidden sm:block text-left">
            <p className="text-sm font-semibold text-gray-800">Musfiq</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </PlaceholderAction>
      </div>
    </header>
  );
}
