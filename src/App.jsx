import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import VisitorInsights from './components/VisitorInsights';
import TotalRevenue from './components/TotalRevenue';
import CustomerSatisfaction from './components/CustomerSatisfaction';
import TargetVsReality from './components/TargetVsReality';
import TopProducts from './components/TopProducts';
import SalesMapping from './components/SalesMapping';
import VolumeServiceLevel from './components/VolumeServiceLevel';
import UsersTable from './components/UsersTable';
import PlaceholderAction from './components/PlaceholderAction';
import useDebouncedValue from './hooks/useDebouncedValue';
import { Download } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

const USERS_SECTION_ID = 'users-data-section';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userSearch, setUserSearch] = useState('');
  const debouncedSearch = useDebouncedValue(userSearch, 300);

  const scrollToUsers = useCallback(() => {
    document.getElementById(USERS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleNavigate = useCallback(
    (key) => {
      setActiveNav(key);
      setSidebarOpen(false);
      if (key === 'users') {
        requestAnimationFrame(scrollToUsers);
      }
    },
    [scrollToUsers],
  );

  const sidebarContent = useMemo(
    () => <Sidebar activeKey={activeNav} onNavigate={handleNavigate} />,
    [activeNav, handleNavigate],
  );

  const handleHeaderSearch = (value) => {
    setUserSearch(value);
    if (value.length > 0) scrollToUsers();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <div className="hidden lg:block shrink-0">{sidebarContent}</div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/30 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 max-w-[80vw] h-full shadow-xl">
            <div className="h-full bg-white">{sidebarContent}</div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          searchValue={userSearch}
          onSearchChange={handleHeaderSearch}
          onSearchFocus={scrollToUsers}
          onSearchEnter={scrollToUsers}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-4 items-stretch">
            <div className="xl:col-span-8">
              <div className="bg-white rounded-xl p-4 border border-gray-100 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-sm font-bold text-gray-800">Today&apos;s Sales</h2>
                    <p className="text-xs text-gray-400">Sales Summery</p>
                  </div>
                  <PlaceholderAction
                    className="flex items-center gap-1.5 border border-gray-200 text-xs text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 active:scale-[0.99] transition"
                  >
                    <Download size={12} />
                    Export
                  </PlaceholderAction>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatsCards />
                </div>
              </div>
            </div>
            <div className="xl:col-span-4 min-h-[280px]">
              <VisitorInsights />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            <div className="lg:col-span-5">
              <TotalRevenue />
            </div>
            <div className="lg:col-span-4">
              <CustomerSatisfaction />
            </div>
            <div className="lg:col-span-3">
              <TargetVsReality />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            <div className="lg:col-span-4">
              <TopProducts />
            </div>
            <div className="lg:col-span-4">
              <SalesMapping />
            </div>
            <div className="lg:col-span-4">
              <VolumeServiceLevel />
            </div>
          </div>

          <div id={USERS_SECTION_ID} className="scroll-mt-24">
            <UsersTable
              searchQuery={debouncedSearch}
              searchInput={userSearch}
              onSearchChange={setUserSearch}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
