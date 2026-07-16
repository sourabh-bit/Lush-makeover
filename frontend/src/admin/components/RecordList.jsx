import React, { useEffect, useState } from 'react';
import { Loader2, Phone, Mail, MessageCircle, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

const statusStyles = {
  unread: 'bg-[#1f1f1f] text-white',
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-700',
  read: 'bg-[#efe9df] text-[#8b7f72]',
};

const StatusPill = ({ status }) => {
  if (!status) return null;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusStyles[status] || 'bg-[#efe9df] text-[#8b7f72]'}`}>
      {status}
    </span>
  );
};

const TagPill = ({ tag }) => {
  if (!tag) return null;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${tag.style || 'bg-[#f4efe8] text-[#6b6257]'}`}>
      {tag.label}
    </span>
  );
};

const ContactActions = ({ record }) => {
  const phone = (record.phone || '').replace(/[^\d+]/g, '');
  const actions = [
    phone && {
      key: 'call',
      href: `tel:${phone}`,
      label: 'Call',
      icon: Phone,
      style: 'bg-[#1f1f1f] text-white',
    },
    phone && {
      key: 'whatsapp',
      href: `https://wa.me/${phone.replace('+', '')}`,
      external: true,
      label: 'WhatsApp',
      icon: MessageCircle,
      style: 'bg-emerald-600 text-white',
    },
    record.email && {
      key: 'email',
      href: `mailto:${record.email}`,
      label: 'Email',
      icon: Mail,
      style: 'border border-black/10 bg-white text-[#4b453f]',
    },
  ].filter(Boolean);

  if (!actions.length) return null;
  return (
    <div className="mt-4 flex gap-2">
      {actions.map(({ key, href, external, label, icon: Icon, style }) => (
        <a
          key={key}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className={`flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl text-[13px] font-medium ${style}`}
        >
          <Icon size={15} /> {label}
        </a>
      ))}
    </div>
  );
};

// A tappable card list for bookings / messages / orders, with optional
// category filter tabs and a bottom sheet showing the full record.
const RecordList = ({
  title,
  subtitle,
  fetchPath,
  emptyText,
  primary,
  secondary,
  meta,
  statusOf,
  statusActions,
  patchPath,
  deletePath,
  tag,
  filterTabs,
}) => {
  const [records, setRecords] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState(filterTabs?.[0]?.key);

  useEffect(() => {
    apiFetch(fetchPath)
      .then(setRecords)
      .catch(() => setRecords([]));
  }, [fetchPath]);

  const changeStatus = async (record, status) => {
    try {
      await apiFetch(`${patchPath}/${record.id}`, { method: 'PATCH', body: { status } });
      setRecords((current) => current.map((r) => (r.id === record.id ? { ...r, status } : r)));
      setSelected((current) => (current && current.id === record.id ? { ...current, status } : current));
      toast.success('Updated.');
    } catch {
      toast.error("Couldn't update. Please try again.");
    }
  };

  const removeRecord = async (record) => {
    try {
      await apiFetch(`${deletePath}/${record.id}`, { method: 'DELETE' });
      setRecords((current) => current.filter((r) => r.id !== record.id));
      setSelected(null);
      setConfirmDelete(false);
      toast.success('Deleted.');
    } catch {
      toast.error("Couldn't delete. Please try again.");
    }
  };

  const activeFilter = filterTabs?.find((t) => t.key === activeTab);
  const visibleRecords = records && activeFilter ? records.filter(activeFilter.filter) : records;

  return (
    <div>
      <h1 className="text-[24px] font-medium text-[#1f1f1f]">{title}</h1>
      <p className="mt-1 text-[14px] text-[#8b7f72]">{subtitle}</p>

      {filterTabs && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filterTabs.map((t) => {
            const count = records ? records.filter(t.filter).length : null;
            const active = t.key === activeTab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors ${
                  active ? 'bg-[#1f1f1f] text-white' : 'border border-black/10 bg-white text-[#4b453f]'
                }`}
              >
                {t.label}
                {count !== null && count > 0 && (
                  <span className={`text-[11px] ${active ? 'text-white/70' : 'text-[#8b7f72]'}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-5 space-y-2.5">
        {records === null && (
          <div className="flex min-h-[30vh] items-center justify-center text-[#8b7f72]">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}
        {visibleRecords !== null && visibleRecords?.length === 0 && (
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center text-[14px] leading-relaxed text-[#8b7f72]">
            {emptyText}
          </div>
        )}
        {visibleRecords?.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={() => setSelected(record)}
            className="flex min-h-[72px] w-full items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-left shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-transform active:scale-[0.99]"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-[15px] font-medium text-[#1f1f1f]">{primary(record)}</span>
                <TagPill tag={tag?.(record)} />
              </span>
              <span className="mt-0.5 block truncate text-[13px] text-[#8b7f72]">{secondary(record)}</span>
              {meta && <span className="mt-0.5 block truncate text-[12px] text-[#c9c2b8]">{meta(record)}</span>}
            </span>
            <StatusPill status={statusOf?.(record)} />
          </button>
        ))}
      </div>

      <Sheet
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setConfirmDelete(false);
          }
        }}
      >
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-black/5 bg-[#faf8f4] pb-[calc(env(safe-area-inset-bottom)+16px)]">
          {selected && (
            <div className="mx-auto w-full max-w-2xl">
              <SheetHeader className="text-left">
                <SheetTitle className="flex flex-wrap items-center gap-2 text-[18px] text-[#1f1f1f]">
                  {primary(selected)}
                  <TagPill tag={tag?.(selected)} />
                  <StatusPill status={statusOf?.(selected)} />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-3 space-y-3 rounded-2xl border border-black/5 bg-white p-4 text-[14px] leading-relaxed text-[#4b453f]">
                {Object.entries({
                  Service: selected.service,
                  Package: selected.package_purchased,
                  Date: selected.date && `${selected.date}${selected.time ? ` at ${selected.time}` : ''}`,
                  Amount: selected.amount,
                  Phone: selected.phone,
                  Email: selected.email,
                  Message: selected.message,
                  Notes: selected.notes,
                  Invoice: selected.invoice_number,
                })
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label}>
                      <div className="text-[11px] uppercase tracking-wide text-[#8b7f72]">{label}</div>
                      {/* enquiries arrive as "Label: value" lines — keep the line breaks */}
                      <div className="mt-0.5 whitespace-pre-line">{value}</div>
                    </div>
                  ))}
              </div>

              <ContactActions record={selected} />

              {(statusActions?.length || deletePath) && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {statusActions
                    ?.filter((action) => action.status !== selected.status)
                    .map((action) => (
                      <button
                        key={action.status}
                        type="button"
                        onClick={() => changeStatus(selected, action.status)}
                        className={`h-12 rounded-xl text-[13px] font-medium ${action.style || 'border border-black/10 bg-white text-[#4b453f]'}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  {deletePath && !confirmDelete && (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white text-[13px] font-medium text-red-600"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  )}
                </div>
              )}

              {deletePath && confirmDelete && (
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-2 pl-4">
                  <span className="flex-1 text-[13px] text-red-800">Delete this forever?</span>
                  <button
                    type="button"
                    onClick={() => removeRecord(selected)}
                    className="h-11 rounded-lg bg-red-600 px-5 text-[13px] font-medium text-white"
                  >
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="h-11 rounded-lg border border-black/10 bg-white px-4 text-[13px] text-[#4b453f]"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RecordList;
