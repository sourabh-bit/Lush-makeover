import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
import FieldRenderer, { emptyValueForFields } from './FieldRenderer';

// A list of editable cards (reviews, services, FAQs...). Each card is
// collapsed to its title; tap to open and edit, with move / delete controls.
const RepeaterField = ({ value = [], onChange, fields = [], itemNoun = 'Item', titleField }) => {
  const items = Array.isArray(value) ? value : [];
  const [openIndex, setOpenIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const setItem = (index, item) => {
    const next = [...items];
    next[index] = item;
    onChange(next);
  };

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpenIndex(target);
  };

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index));
    setOpenIndex(null);
    setConfirmDelete(null);
  };

  const addItem = () => {
    onChange([...items, emptyValueForFields(fields)]);
    setOpenIndex(items.length);
  };

  const titleFor = (item, index) => {
    const title = titleField ? item?.[titleField] : '';
    return title && String(title).trim() ? String(title) : `${itemNoun} ${index + 1}`;
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={index} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="truncate text-[14px] font-medium text-[#2a2a2a]">{titleFor(item, index)}</span>
              {open ? (
                <ChevronUp size={18} className="shrink-0 text-[#8b7f72]" />
              ) : (
                <ChevronDown size={18} className="shrink-0 text-[#8b7f72]" />
              )}
            </button>

            {open && (
              <div className="border-t border-black/5 px-4 pb-4 pt-3">
                <div className="space-y-4">
                  {fields
                    .filter((field) => field.type !== 'hidden')
                    .map((field) => (
                      <FieldRenderer
                        key={field.key}
                        field={field}
                        value={item?.[field.key]}
                        onChange={(fieldValue) => setItem(index, { ...item, [field.key]: fieldValue })}
                      />
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-black/5 pt-3">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 text-[#4b453f] disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 text-[#4b453f] disabled:opacity-30"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <div className="flex-1" />
                  {confirmDelete === index ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#8b7f72]">Delete this?</span>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="h-11 rounded-xl bg-red-600 px-4 text-[13px] font-medium text-white"
                      >
                        Yes, delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="h-11 rounded-xl border border-black/10 px-3 text-[13px] text-[#4b453f]"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(index)}
                      aria-label={`Delete ${itemNoun.toLowerCase()}`}
                      className="flex h-11 items-center gap-1.5 rounded-xl border border-black/10 px-3 text-[13px] text-[#8b7f72] active:text-red-500"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addItem}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 text-[13px] font-medium text-[#4b453f] transition-colors active:bg-[#f4efe8]"
      >
        <Plus size={16} />
        Add {itemNoun.toLowerCase()}
      </button>
    </div>
  );
};

export default RepeaterField;
