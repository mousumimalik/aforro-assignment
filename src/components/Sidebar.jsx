import {
  LayoutDashboard,
  Trophy,
  ShoppingCart,
  Package,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  Zap,
  Users,
} from 'lucide-react';
import { useMemo } from 'react';
import PlaceholderAction from './PlaceholderAction';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard', navigable: true },
  { icon: Users, label: 'Users', key: 'users', navigable: true },
  { icon: Trophy, label: 'Leaderboard' },
  { icon: ShoppingCart, label: 'order' },
  { icon: Package, label: 'Products' },
  { icon: BarChart2, label: 'Sales Report' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Sign Out' },
];

export default function Sidebar({ activeKey = 'dashboard', onNavigate }) {
  const items = useMemo(
    () =>
      navItems.map((i) => ({
        ...i,
        key: i.key ?? i.label.toLowerCase().replaceAll(' ', '-'),
      })),
    [],
  );

  function handleNav(key, navigable) {
    if (navigable) {
      onNavigate?.(key);
      return;
    }
  }

  return (
    <aside className="w-44 lg:w-48 min-h-screen bg-white flex flex-col border-r border-gray-100">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-gray-800 text-lg">Aforro</span>
      </div>

      <nav className="flex-1 px-2 mt-2">
        {items.map(({ icon: Icon, label, key, navigable }) => {
          const active = key === activeKey;

          if (navigable) {
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleNav(key, true)}
                className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          }

          return (
            <PlaceholderAction
              key={key}
              align="left"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </PlaceholderAction>
          );
        })}
      </nav>

      <div className="mx-3 mb-5 rounded-xl bg-indigo-600 p-3 text-center">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
          <Zap size={14} className="text-white" />
        </div>
        <p className="text-white font-semibold text-sm">Aforro Pro</p>
        <p className="text-indigo-200 text-xs mt-0.5 leading-tight">Get access to all features on Aforro</p>
        <PlaceholderAction className="mt-2 w-full bg-white text-indigo-600 text-xs font-semibold py-1.5 rounded-lg hover:bg-indigo-50 transition">
          Get Pro
        </PlaceholderAction>
      </div>
    </aside>
  );
}
