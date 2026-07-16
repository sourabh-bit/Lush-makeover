import { API_BASE_URL } from '@/lib/api';

// Fetch fresh CMS content before the app renders. Cache-busted so edits show
// up on the next reload, and time-limited so an unreachable or sleeping
// backend can never stall the public site (it falls back to built-in content).
export async function loadCmsBootstrap({ timeoutMs = 4000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/bootstrap?ts=${Date.now()}`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error('Unable to load CMS bootstrap');
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
