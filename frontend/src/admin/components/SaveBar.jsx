import React from 'react';
import { Loader2 } from 'lucide-react';

// Sticky save bar that slides up from the bottom when there are unsaved
// changes. Sits above the mobile tab bar; full width on phones.
const SaveBar = ({ dirty, saving, onSave }) => (
  <div
    className={`fixed inset-x-0 bottom-[72px] z-40 px-4 transition-all duration-300 lg:bottom-6 lg:left-[280px] ${
      dirty ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
    }`}
    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
  >
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !dirty}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f1f1f] text-[15px] font-medium text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] transition-opacity active:opacity-85 disabled:opacity-70"
      >
        {saving && <Loader2 size={18} className="animate-spin" />}
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  </div>
);

export default SaveBar;
