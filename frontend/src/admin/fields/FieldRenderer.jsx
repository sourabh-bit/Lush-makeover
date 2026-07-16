import React from 'react';
import ImageField from './ImageField';
import ListField from './ListField';
import RepeaterField from './RepeaterField';

// Starting value for a brand-new item, based on its fields.
export function emptyValueForFields(fields = []) {
  const item = {};
  for (const field of fields) {
    switch (field.type) {
      case 'hidden':
        item[field.key] = field.key === 'id' ? `item_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}` : '';
        break;
      case 'list':
      case 'items':
        item[field.key] = [];
        break;
      case 'group':
        item[field.key] = emptyValueForFields(field.fields);
        break;
      case 'select':
        item[field.key] = field.options?.[0]?.value ?? '';
        break;
      default:
        item[field.key] = '';
    }
  }
  return item;
}

const FieldLabel = ({ label, help }) => (
  <div className="mb-1.5">
    <div className="text-[13px] font-medium text-[#2a2a2a]">{label}</div>
    {help && <div className="mt-0.5 text-[12px] leading-snug text-[#8b7f72]">{help}</div>}
  </div>
);

// Renders one field of any supported type. Recursive for group / items.
const FieldRenderer = ({ field, value, onChange }) => {
  if (field.type === 'hidden') return null;

  let control = null;
  switch (field.type) {
    case 'textarea':
      control = (
        <textarea
          value={value ?? ''}
          rows={Math.max(3, Math.ceil(String(value ?? '').length / 55))}
          onChange={(event) => onChange(event.target.value)}
          className="w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-3 text-[14px] leading-relaxed outline-none focus:border-black/30"
        />
      );
      break;
    case 'image':
      control = <ImageField value={value} onChange={onChange} label={field.label} />;
      break;
    case 'select':
      control = (
        <select
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-black/10 bg-white px-3 text-[14px] outline-none focus:border-black/30"
        >
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case 'list':
      control = <ListField value={value} onChange={onChange} itemLabel={field.itemLabel || 'Line'} />;
      break;
    case 'items':
      control = (
        <RepeaterField
          value={value}
          onChange={onChange}
          fields={field.fields || []}
          itemNoun={field.itemNoun || 'Item'}
          titleField={field.titleField}
        />
      );
      break;
    case 'group':
      control = (
        <div className="space-y-4 rounded-2xl border border-black/5 bg-[#faf8f4] p-4">
          {(field.fields || [])
            .filter((subField) => subField.type !== 'hidden')
            .map((subField) => (
              <FieldRenderer
                key={subField.key}
                field={subField}
                value={value?.[subField.key]}
                onChange={(subValue) => onChange({ ...(value || {}), [subField.key]: subValue })}
              />
            ))}
        </div>
      );
      break;
    default:
      control = (
        <input
          type="text"
          inputMode={field.inputMode || 'text'}
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-[14px] outline-none focus:border-black/30"
        />
      );
  }

  return (
    <div>
      {field.label && <FieldLabel label={field.label} help={field.help} />}
      {control}
    </div>
  );
};

export default FieldRenderer;
