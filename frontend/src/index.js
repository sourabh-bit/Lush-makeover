import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/index.css';
import { loadCmsBootstrap } from '@/cms/bootstrap';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const Loading = () => (
  <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center px-6">
    <div className="text-center">
      <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase">Loading</div>
      <div className="mt-3 font-script italic text-[#2a2a2a] text-[26px]">Preparing the studio</div>
    </div>
  </div>
);

const CMS_CACHE_KEY = 'lush-cms-cache-v1';
const CMS_DOWN_KEY = 'lush-cms-down-until';

const mountApp = async () => {
  let cached = null;
  try {
    cached = JSON.parse(localStorage.getItem(CMS_CACHE_KEY));
  } catch {
    cached = null;
  }
  let downUntil = 0;
  try {
    downUntil = Number(sessionStorage.getItem(CMS_DOWN_KEY) || 0);
  } catch {
    downUntil = 0;
  }

  const fetchAndCache = async (timeoutMs) => {
    const fresh = await loadCmsBootstrap({ timeoutMs });
    try {
      localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(fresh));
    } catch {
      /* storage full/unavailable — fine */
    }
    return fresh;
  };

  if (cached || Date.now() < downUntil) {
    // Start instantly with cached content (or defaults if the backend was
    // recently unreachable); refresh in the background for the next visit.
    window.__LUSH_CMS__ = cached || {};
    fetchAndCache(8000).catch(() => {});
  } else {
    root.render(<Loading />);
    try {
      window.__LUSH_CMS__ = await fetchAndCache(1500);
    } catch {
      window.__LUSH_CMS__ = {};
      try {
        // Don't block again for 10 minutes after a failed attempt.
        sessionStorage.setItem(CMS_DOWN_KEY, String(Date.now() + 10 * 60_000));
      } catch {
        /* fine */
      }
    }
  }

  const favicon = window.__LUSH_CMS__?.settings?.favicon;
  if (favicon) {
    const link = document.getElementById('site-favicon');
    if (link) link.href = favicon;
  }

  const { default: App } = await import('@/App');
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

mountApp();
