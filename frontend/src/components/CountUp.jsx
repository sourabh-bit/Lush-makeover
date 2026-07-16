import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

// Animates a numeric stat from 0 to its value when it scrolls into view.
// Understands values like "10+", "1000+", "4.9", "1,488" — any prefix/suffix
// around the number is kept as-is. Non-numeric values render unchanged.
const CountUp = ({ value, duration = 3, delay = 0.25, className }) => {
  const parsed = useMemo(() => {
    const match = String(value).match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    const raw = match[2];
    return {
      prefix: match[1],
      target: parseFloat(raw.replace(/,/g, '')),
      decimals: (raw.split('.')[1] || '').length,
      grouped: raw.includes(','),
      suffix: match[3],
    };
  }, [value]);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(parsed ? '0' : String(value));

  useEffect(() => {
    if (!inView || !parsed) return undefined;
    // 'easeOut' keeps every step visible: the extreme deceleration of the
    // site's default ease made small numbers (like 10) look stuck near the end.
    const controls = animate(0, parsed.target, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => {
        const fixed = latest.toFixed(parsed.decimals);
        setDisplay(parsed.grouped ? Number(fixed).toLocaleString('en-IN') : fixed);
      },
    });
    return () => controls.stop();
  }, [inView, parsed, duration, delay]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
};

export default CountUp;
