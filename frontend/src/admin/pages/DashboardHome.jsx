import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MessageSquare, ShoppingBag, Image as ImageIcon, Pencil, ExternalLink } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/auth/AuthContext';

const StatCard = ({ icon: Icon, label, value, to }) => (
  <Link
    to={to}
    className="flex min-h-[96px] flex-col justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-transform active:scale-[0.98]"
  >
    <Icon size={18} className="text-[#8b7f72]" />
    <div>
      <div className="text-[24px] font-medium leading-none text-[#1f1f1f]">{value ?? '—'}</div>
      <div className="mt-1 text-[12px] text-[#8b7f72]">{label}</div>
    </div>
  </Link>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    apiFetch('/api/admin/dashboard')
      .then((data) => {
        setSummary(data.summary || {});
        setRecent(data.recent_activity || []);
      })
      .catch(() => setSummary({}));
  }, []);

  const firstName = (user?.name || 'there').split(' ')[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-medium text-[#1f1f1f]">Hi, {firstName}</h1>
        <p className="mt-1 text-[14px] text-[#8b7f72]">Here's your studio today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={CalendarDays} label="Bookings" value={summary?.bookings} to="/admin/bookings" />
        <StatCard icon={MessageSquare} label="Messages" value={summary?.messages} to="/admin/messages" />
        <StatCard icon={ShoppingBag} label="Orders" value={summary?.orders} to="/admin/orders" />
        <StatCard icon={ImageIcon} label="Photos" value={summary?.media} to="/admin/media" />
      </div>

      <Link
        to="/admin/website"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f1f1f] text-[15px] font-medium text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] transition-opacity active:opacity-85"
      >
        <Pencil size={17} />
        Edit my website
      </Link>

      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white text-[14px] text-[#4b453f] active:bg-[#f4efe8]"
      >
        <ExternalLink size={15} />
        View my website
      </a>

      {recent.length > 0 && (
        <div>
          <h2 className="mb-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#8b7f72]">Latest messages</h2>
          <div className="space-y-2">
            {recent.slice(0, 4).map((message) => (
              <Link
                key={message.id}
                to="/admin/messages"
                className="block rounded-2xl border border-black/5 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-medium text-[#1f1f1f]">{message.name}</span>
                  {message.status === 'unread' && (
                    <span className="rounded-full bg-[#1f1f1f] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">New</span>
                  )}
                </div>
                <p className="mt-1 truncate text-[13px] text-[#8b7f72]">{message.message}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
