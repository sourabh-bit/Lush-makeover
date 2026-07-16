import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { apiFetch, API_BASE_URL } from '@/lib/api';

// Uploads a photo and returns a URL that works from anywhere
// (the backend may return a relative URL in local development).
export function useImageUpload(folder = 'content') {
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(
    async (file) => {
      if (!file) return null;
      if (!file.type.startsWith('image/')) {
        toast.error('Please choose a photo (JPG or PNG).');
        return null;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('That photo is too large. Please choose one under 10 MB.');
        return null;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        const result = await apiFetch('/api/media/upload', { method: 'POST', body: formData });
        const url = result.url || '';
        return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      } catch {
        toast.error("Couldn't upload the photo. Please try again.");
        return null;
      } finally {
        setUploading(false);
      }
    },
    [folder]
  );

  return { upload, uploading };
}
