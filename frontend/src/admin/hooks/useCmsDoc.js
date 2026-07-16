import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import defaults from '../../content/defaults.json';

const clone = (value) => (value == null ? value : JSON.parse(JSON.stringify(value)));

// Loads one content document, tracks an editable draft + dirty state, and
// saves it back. Warns before the tab closes with unsaved changes.
export function useCmsDoc(key) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const docMeta = useRef({ scope: 'public', visible: true, order: 0 });

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setDirty(false);

    apiFetch(`/api/cms/documents/${key}`)
      .then((doc) => {
        if (!active) return;
        docMeta.current = { scope: doc.scope || 'public', visible: doc.visible !== false, order: doc.order || 0 };
        setDraft(clone(doc.payload));
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 404 && defaults[key] !== undefined) {
          setDraft(clone(defaults[key]));
        } else {
          setError("Couldn't load this section. Please check your connection and try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [key]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = useCallback((next) => {
    setDraft(next);
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await apiFetch(`/api/cms/documents/${key}`, {
        method: 'PUT',
        body: { key, payload: draft, ...docMeta.current },
      });
      setDirty(false);
      toast.success('Saved! Your website is updated.');
      return true;
    } catch {
      toast.error("Couldn't save. Please check your connection and try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [key, draft]);

  return { loading, error, draft, update, save, saving, dirty };
}
