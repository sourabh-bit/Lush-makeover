import React, { useRef, useState } from 'react';
import { Camera, Link2, Loader2 } from 'lucide-react';
import { useImageUpload } from '../hooks/useImageUpload';

// A photo field: shows the current photo with one big "Change photo" button.
// On phones the file input opens the camera / photo library chooser.
const ImageField = ({ value, onChange, label }) => {
  const inputRef = useRef(null);
  const { upload, uploading } = useImageUpload();
  const [showLink, setShowLink] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    const url = await upload(file);
    if (url) onChange(url);
  };

  return (
    <div className="rounded-2xl border border-black/5 bg-[#faf8f4] p-3">
      <div className="overflow-hidden rounded-xl bg-[#efe9df]">
        {value ? (
          <img src={value} alt={label || 'Selected'} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 w-full items-center justify-center text-[13px] text-[#8b7f72]">
            No photo yet
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[14px] font-medium text-white transition-opacity active:opacity-80 disabled:opacity-60"
      >
        {uploading ? <Loader2 size={17} className="animate-spin" /> : <Camera size={17} />}
        {uploading ? 'Uploading…' : value ? 'Change photo' : 'Add photo'}
      </button>
      <button
        type="button"
        onClick={() => setShowLink((open) => !open)}
        className="mt-2 flex items-center gap-1.5 px-1 py-1 text-[12px] text-[#8b7f72]"
      >
        <Link2 size={13} />
        {showLink ? 'Hide photo link' : 'Or paste a photo link'}
      </button>
      {showLink && (
        <input
          type="url"
          inputMode="url"
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://…"
          className="mt-1 h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-[14px] outline-none focus:border-black/30"
        />
      )}
    </div>
  );
};

export default ImageField;
