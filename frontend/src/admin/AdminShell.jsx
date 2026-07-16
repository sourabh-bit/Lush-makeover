import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import {
  LayoutGrid,
  Globe,
  CalendarDays,
  MessageSquare,
  MoreHorizontal,
  ShoppingBag,
  Image as ImageIcon,
  Store,
  KeyRound,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/auth/AuthContext';

const tabs = [
  { to: '/admin', label: 'Home', icon: LayoutGrid, end: true },
  { to: '/admin/website', label: 'Website', icon: Globe },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

const moreItems = [
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/media', label: 'Photos', icon: ImageIcon },
  { to: '/admin/website/business', label: 'Business Details', icon: Store },
  { to: '/admin/password', label: 'Change Password', icon: KeyRound },
];

// Responsive admin chrome: bottom tab bar on phones, sidebar on laptops.
const AdminShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const handleLogout = async () => {
    setMoreOpen(false);
    await logout();
    navigate('/admin/login');
  };

  const tabClass = ({ isActive }) =>
    `flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] ${
      isActive ? 'text-[#1f1f1f] font-medium' : 'text-[#8b7f72]'
    }`;

  const sideClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] tracking-[0.08em] transition-colors ${
      isActive ? 'bg-[#1f1f1f] text-white' : 'text-[#4b453f] hover:bg-[#f4efe8]'
    }`;

  return (
    <div className="min-h-screen bg-[#f6f4f0] text-[#1f1f1f]">
      <Toaster position="top-center" richColors closeButton={false} />

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-black/5 bg-[#f6f4f0]/90 px-4 backdrop-blur lg:hidden">
        <Link to="/admin" className="font-display text-[18px] tracking-[0.28em] text-[#2a2a2a]">
          LUSH
        </Link>
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[12px] text-[#8b7f72]">
          <ExternalLink size={14} />
          View site
        </a>
      </header>

      <div className="lg:grid lg:min-h-screen lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden border-r border-black/5 bg-white px-6 py-8 lg:block">
          <Link to="/" className="font-display text-[22px] tracking-[0.28em] text-[#2a2a2a]">
            LUSH
          </Link>
          <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#8b7f72]">{user?.name || 'Admin'}</div>
          <nav className="mt-10 space-y-1.5">
            {[...tabs, ...moreItems].map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} end={item.end || item.to === '/admin/website/business'} className={sideClass}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-10 space-y-1.5 border-t border-black/5 pt-6">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] text-[#4b453f] hover:bg-[#f4efe8]">
              <ExternalLink size={16} />
              View my website
            </a>
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[13px] text-[#4b453f] hover:bg-[#f4efe8]">
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="px-4 pb-28 pt-5 lg:px-10 lg:pb-16 lg:pt-10">
          <div className="mx-auto w-full max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-black/5 bg-white lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={tabClass}>
              <Icon size={20} />
              {tab.label}
            </NavLink>
          );
        })}
        <button type="button" onClick={() => setMoreOpen(true)} className="flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-[#8b7f72]">
          <MoreHorizontal size={20} />
          More
        </button>
      </nav>

      {/* "More" bottom sheet */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl border-black/5 bg-[#faf8f4] pb-[calc(env(safe-area-inset-bottom)+16px)]">
          <SheetHeader className="text-left">
            <SheetTitle className="text-[16px] text-[#1f1f1f]">More</SheetTitle>
          </SheetHeader>
          <div className="mt-3 space-y-1.5">
            {moreItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMoreOpen(false)}
                  className="flex min-h-[52px] items-center gap-3 rounded-2xl bg-white px-4 text-[14px] text-[#1f1f1f]"
                >
                  <Icon size={18} className="text-[#8b7f72]" />
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[52px] items-center gap-3 rounded-2xl bg-white px-4 text-[14px] text-[#1f1f1f]"
            >
              <ExternalLink size={18} className="text-[#8b7f72]" />
              View my website
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[52px] w-full items-center gap-3 rounded-2xl bg-white px-4 text-left text-[14px] text-red-600"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminShell;
