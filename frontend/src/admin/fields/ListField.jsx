import React from 'react';
import { Plus, X } from 'lucide-react';

// A list of short text lines with add / remove.
const ListField = ({ value = [], onChange, itemLabel = 'Line' }) => {
  const items = Array.isArray(value) ? value : [];

  const setItem = (index, text) => {
    const next = [...items];
    next[index] = text;
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <textarea
            value={item}
            rows={Math.max(1, Math.ceil((item || '').length / 45))}
            onChange={(event) => setItem(index, event.target.value)}
            className="min-h-[48px] w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-3 text-[14px] leading-relaxed outline-none focus:border-black/30"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            aria-label={`Remove ${itemLabel.toLowerCase()}`}
            className="flex h-12 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 text-[#8b7f72] transition-colors active:bg-red-50 active:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 text-[13px] font-medium text-[#4b453f] transition-colors active:bg-[#f4efe8]"
      >
        <Plus size={16} />
        Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
};

export default ListField;
