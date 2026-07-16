import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { apiFetch, API_BASE_URL } from '@/lib/api';
import { useImageUpload } from '../hooks/useImageUpload';
import { toast } from 'sonner';

const absolute = (url) => (url?.startsWith('http') ? url : `${API_BASE_URL}${url}`);

// All uploaded photos in one grid: upload new ones, tap one to delete it.
const MediaLibrary = () => {
  const [assets, setAssets] = useState(null);
  const [selected, setSelected] = useState(null);
  const inputRef = useRef(null);
  const { upload, uploading } = useImageUpload();

  const load = () => {
    apiFetch('/api/media')
      .then(setAssets)
      .catch(() => setAssets([]));
  };

  useEffect(load, []);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    const url = await upload(file);
    if (url) {
      toast.success('Photo uploaded.');
      load();
    }
  };

  const removeSelected = async () => {
    try {
      await apiFetch(`/api/media/${selected.id}`, { method: 'DELETE' });
      setAssets((current) => current.filter((a) => a.id !== selected.id));
      setSelected(null);
      toast.success('Photo deleted.');
    } catch {
      toast.error("Couldn't delete the photo. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-[24px] font-medium text-[#1f1f1f]">Photos</h1>
      <p className="mt-1 text-[14px] text-[#8b7f72]">All the photos you've uploaded.</p>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f1f1f] text-[14px] font-medium text-white active:opacity-85 disabled:opacity-60"
      >
        {uploading ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />}
        {uploading ? 'Uploading…' : 'Upload a photo'}
      </button>

      <div className="mt-4">
        {assets === null && (
          <div className="flex min-h-[30vh] items-center justify-center text-[#8b7f72]">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}
        {assets !== null && assets.length === 0 && (
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center text-[14px] leading-relaxed text-[#8b7f72]">
            No photos yet — photos you upload while editing your website will also appear here.
          </div>
        )}
        {assets?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {assets.map((asset) => (
              <button key={asset.id} type="button" onClick={() => setSelected(asset)} className="overflow-hidden rounded-xl">
                <img src={absolute(asset.url)} alt={asset.alt_text || ''} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl border-black/5 bg-[#faf8f4] pb-[calc(env(safe-area-inset-bottom)+16px)]">
          {selected && (
            <>
              <SheetHeader className="text-left">
                <SheetTitle className="text-[16px] text-[#1f1f1f]">Photo</SheetTitle>
              </SheetHeader>
              <img src={absolute(selected.url)} alt="" className="mt-3 max-h-[45vh] w-full rounded-2xl object-contain" />
              <button
                type="button"
                onClick={removeSelected}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-200 text-[14px] font-medium text-red-600"
              >
                <Trash2 size={16} />
                Delete this photo
              </button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MediaLibrary;
