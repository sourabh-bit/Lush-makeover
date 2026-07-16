import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

const ClientPortal = () => {
  const query = useQuery({
    queryKey: ['client-dashboard'],
    queryFn: () => apiFetch('/api/client/dashboard'),
  });

  const data = query.data || {};

  return (
    <div className="min-h-screen bg-[#f6f4f0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(0,0,0,0.35)]">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#8b7f72]">Client Portal</div>
          <h1 className="mt-3 font-display text-[30px] tracking-[0.12em] text-[#1f1f1f]">Welcome back</h1>
          <p className="mt-2 text-[14px] leading-[1.8] text-[#5f564f]">View your orders, bookings and messages in one calm private space.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Orders', data.orders?.length || 0],
            ['Bookings', data.bookings?.length || 0],
            ['Messages', data.messages?.length || 0],
          ].map(([label, value]) => (
            <article key={label} className="rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(0,0,0,0.35)]">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8b7f72]">{label}</div>
              <div className="mt-3 font-display text-[32px] tracking-[0.12em] text-[#1f1f1f]">{value}</div>
            </article>
          ))}
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ['Orders', data.orders || [], ['package_purchased', 'amount', 'status']],
            ['Bookings', data.bookings || [], ['service', 'date', 'status']],
            ['Messages', data.messages || [], ['message', 'status']],
          ].map(([label, items, keys]) => (
            <article key={label} className="rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(0,0,0,0.35)]">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8b7f72]">{label}</div>
              <div className="mt-4 space-y-3">
                {items.length ? items.map((item, index) => (
                  <div key={item.id || index} className="rounded-2xl border border-black/5 bg-[#fbfaf8] p-4 text-[14px] text-[#4b453f]">
                    <div className="font-display text-[12px] uppercase tracking-[0.18em] text-[#1f1f1f]">
                      {item.name || item.customer || item.client_name || item.email || `Item ${index + 1}`}
                    </div>
                    <div className="mt-2 space-y-1 text-[13px] leading-[1.7] text-[#5f564f]">
                      {keys.map((key) => item[key] ? <div key={key}>{item[key]}</div> : null)}
                    </div>
                  </div>
                )) : <div className="text-sm text-[#8b7f72]">No records yet.</div>}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ClientPortal;
