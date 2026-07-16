import React, { useRef, useState } from 'react';
import { Camera, Loader2, Plus, X } from 'lucide-react';
import { useImageUpload } from '../hooks/useImageUpload';

// A list of photos shown as a grid. Tap a photo to replace it,
// the X to remove it, or the big tile to add a new one.
const ImagesField = ({ value = [], onChange }) => {
  const photos = Array.isArray(value) ? value : [];
  const inputRef = useRef(null);
  const { upload, uploading } = useImageUpload();
  const [replaceIndex, setReplaceIndex] = useState(null);

  const pick = (index) => {
    setReplaceIndex(index);
    inputRef.current?.click();
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    const url = await upload(file);
    if (!url) return;
    if (replaceIndex === null) {
      onChange([...photos, url]);
    } else {
      const next = [...photos];
      next[replaceIndex] = url;
      onChange(next);
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <div key={`${photo}-${index}`} className="group relative">
            <button
              type="button"
              onClick={() => pick(index)}
              className="block w-full overflow-hidden rounded-xl"
              aria-label="Replace photo"
            >
              <img src={photo} alt="" className="aspect-square w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 text-white transition-colors group-active:bg-black/30">
                <Camera size={18} className="opacity-0 transition-opacity group-active:opacity-100" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onChange(photos.filter((_, i) => i !== index))}
              aria-label="Remove photo"
              className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow"
            >
              <X size={13} />
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={uploading}
          onClick={() => pick(null)}
          className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-black/15 text-[#8b7f72] transition-colors active:bg-[#f4efe8] disabled:opacity-60"
        >
          {uploading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
          <span className="text-[11px]">{uploading ? 'Uploading…' : 'Add photo'}</span>
        </button>
      </div>
    </div>
  );
};

export default ImagesField;
