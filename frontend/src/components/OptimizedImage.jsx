import React, { useEffect, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
const PRELOAD_PX = 800;
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw';

const isRemoteUrl = (value) => /^https?:\/\//i.test(value || '');

// Cloudinary URLs look like .../image/upload/<transformations>/v123/public_id.jpg
// — transformations are inserted as their own path segment right after "/upload/".
const CLOUDINARY_UPLOAD_MARKER = '/image/upload/';

const isCloudinaryUrl = (url) => url.hostname.toLowerCase() === 'res.cloudinary.com';

// c_fill + g_auto asks Cloudinary to detect the actual subject (faces first)
// and crop around it, instead of a blind center-crop that can cut off heads.
// ar_ is a hint, not an exact requirement — CSS object-fit still does the
// final fit against each container, so an approximate ratio is fine.
const buildCloudinaryTransform = (aspectRatio, width) => {
  const parts = ['c_fill', 'g_auto', 'q_auto', 'f_auto'];
  if (aspectRatio) parts.push(`ar_${aspectRatio}`);
  if (width) parts.push(`w_${width}`);
  return parts.join(',');
};

const withCloudinaryTransform = (value, transform) => {
  const idx = value.indexOf(CLOUDINARY_UPLOAD_MARKER);
  if (idx === -1) return value;
  const splitAt = idx + CLOUDINARY_UPLOAD_MARKER.length;
  return `${value.slice(0, splitAt)}${transform}/${value.slice(splitAt)}`;
};

const buildOptimizedUrl = (value, aspectRatio) => {
  if (!isRemoteUrl(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (isCloudinaryUrl(url)) {
      return withCloudinaryTransform(value, buildCloudinaryTransform(aspectRatio));
    }

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

const buildSrcSet = (value, aspectRatio, breakpoints = [480, 768, 1024, 1200]) => {
  if (!isRemoteUrl(value)) return undefined;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (isCloudinaryUrl(url)) {
      return breakpoints
        .map((width) => `${withCloudinaryTransform(value, buildCloudinaryTransform(aspectRatio, width))} ${width}w`)
        .join(', ');
    }

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
  // Approximate width:height ratio (e.g. "3:4", "1:1") for this image's
  // container. When the source is a Cloudinary-hosted upload, this drives
  // face-aware auto-cropping so heads/faces stay in frame regardless of how
  // the original photo was framed. Ignored for other image hosts.
  aspectRatio,
  ...props
}) => {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority || loading === 'eager');
  // Loading falls back in steps: optimized URL → original URL → placeholder.
  const [errorStep, setErrorStep] = useState(0);
  const optimizedSrc = buildOptimizedUrl(src, aspectRatio);
  const optimizedSrcSet = srcSet || buildSrcSet(src, aspectRatio);

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
