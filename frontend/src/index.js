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

const mountApp = async () => {
  root.render(<Loading />);

  try {
    window.__LUSH_CMS__ = await loadCmsBootstrap();
  } catch {
    window.__LUSH_CMS__ = {};
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
