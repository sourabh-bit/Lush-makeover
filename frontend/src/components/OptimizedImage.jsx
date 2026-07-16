import React, { useEffect, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
const PRELOAD_PX = 800;
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw';

const isRemoteUrl = (value) => /^https?:\/\//i.test(value || '');

const buildOptimizedUrl = (value) => {
  if (!isRemoteUrl(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (host.includes('pexels.com')) {
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      url.searchParams.set('fit', 'max');
      url.searchParams.set('w', '1200');
      url.searchParams.set('dpr', '1');
      return url.toString();
    }

    if (host.includes('unsplash.com')) {
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', '1200');
      url.searchParams.set('q', '78');
      return url.toString();
    }

    return value;
  } catch {
    return value;
  }
};

const buildSrcSet = (value, breakpoints = [480, 768, 1024, 1200]) => {
  if (!isRemoteUrl(value)) return undefined;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return breakpoints
      .map((width) => {
        const nextUrl = new URL(url.toString());

        if (host.includes('pexels.com')) {
          nextUrl.searchParams.set('auto', 'compress');
          nextUrl.searchParams.set('cs', 'tinysrgb');
          nextUrl.searchParams.set('fit', 'max');
          nextUrl.searchParams.set('w', String(width));
          nextUrl.searchParams.set('dpr', '1');
        } else if (host.includes('unsplash.com')) {
          nextUrl.searchParams.set('auto', 'format');
          nextUrl.searchParams.set('fit', 'crop');
          nextUrl.searchParams.set('w', String(width));
          nextUrl.searchParams.set('q', '78');
        } else {
          return null;
        }

        return `${nextUrl.toString()} ${width}w`;
      })
      .filter(Boolean)
      .join(', ');
  } catch {
    return undefined;
  }
};

const OptimizedImage = ({
  priority = false,
  loading,
  decoding = 'async',
  fetchPriority,
  className = '',
  src,
  alt,
  sizes,
  srcSet,
  ...props
}) => {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority || loading === 'eager');
  // Loading falls back in steps: optimized URL → original URL → placeholder.
  const [errorStep, setErrorStep] = useState(0);
  const optimizedSrc = buildOptimizedUrl(src);
  const optimizedSrcSet = srcSet || buildSrcSet(src);

  useEffect(() => {
    setErrorStep(0);
  }, [src]);

  useEffect(() => {
    if (shouldLoad) return undefined;
    if (typeof window === 'undefined' || !imgRef.current) {
      setShouldLoad(true);
      return undefined;
    }

    const node = imgRef.current;

    // Geometry check as well as IntersectionObserver: an image inside a
    // clip-path reveal animation reports zero intersection while clipped,
    // which would otherwise keep it from ever lazy-loading.
    const nearViewport = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight + PRELOAD_PX && rect.bottom > -PRELOAD_PX;
    };

    if (nearViewport()) {
      setShouldLoad(true);
      return undefined;
    }

    let ticking = false;
    let observer;

    const cleanup = () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (nearViewport()) {
          setShouldLoad(true);
          cleanup();
        }
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          cleanup();
        }
      },
      {
        root: null,
        rootMargin: `${PRELOAD_PX}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return cleanup;
  }, [shouldLoad]);

  const canRetryOriginal = optimizedSrc !== src || Boolean(optimizedSrcSet);
  const exhausted = !src || errorStep >= (canRetryOriginal ? 2 : 1);

  // Never show the browser's broken-image icon: render a quiet
  // brand-coloured block instead when the photo cannot be loaded.
  if (exhausted) {
    return (
      <span
        role="img"
        aria-label={alt || 'Photo unavailable'}
        className={`block bg-[#f0e9dd] ${className}`}
        {...props}
      />
    );
  }

  const useOriginal = errorStep === 1;
  const finalLoading = loading || (priority ? 'eager' : 'lazy');
  const finalFetchPriority =
    fetchPriority || (priority || finalLoading === 'eager' ? 'high' : 'low');
  const activeSrc = useOriginal ? src : optimizedSrc;
  const finalSrc = shouldLoad ? activeSrc : TRANSPARENT_PIXEL;

  return (
    <img
      ref={imgRef}
      src={finalSrc}
      srcSet={shouldLoad && !useOriginal ? optimizedSrcSet : undefined}
      sizes={shouldLoad && !useOriginal ? sizes || DEFAULT_SIZES : undefined}
      alt={alt}
      loading={finalLoading}
      decoding={decoding}
      fetchpriority={finalFetchPriority}
      className={className}
      onError={() => {
        if (shouldLoad) setErrorStep((step) => step + 1);
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
