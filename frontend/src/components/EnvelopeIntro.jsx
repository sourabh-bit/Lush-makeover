import React, { useEffect, useState, useMemo } from 'react';
import { X } from 'lucide-react';
import './envelope.css';

const EnvelopeIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState('enter');
  // phase: enter -> idle -> sealBreak -> flapOpen -> cardOut -> done

  // Pre-compute petals so positions are stable across renders
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 1.6,
        duration: 4 + Math.random() * 3.5,
        size: 8 + Math.random() * 10,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        hue: Math.random() > 0.5 ? 'petal-rose' : 'petal-gold',
      })),
    []
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return {
          id: i,
          x: Math.cos(angle) * 60,
          y: Math.sin(angle) * 60,
        };
      }),
    []
  );

  useEffect(() => {
    const seen = sessionStorage.getItem('lush_intro_seen');
    if (!seen) {
      setShow(true);
      const t0 = setTimeout(() => setPhase('idle'), 900);
      const t1 = setTimeout(() => setPhase('sealBreak'), 1900);
      const t2 = setTimeout(() => setPhase('flapOpen'), 2500);
      const t3 = setTimeout(() => setPhase('cardOut'), 3300);
      const t4 = setTimeout(() => setPhase('done'), 4900);
      return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem('lush_intro_seen', '1');
    setShow(false);
  };

  if (!show) return null;

  const showBurst = phase === 'sealBreak' || phase === 'flapOpen' || phase === 'cardOut' || phase === 'done';
  const cardActive = phase === 'cardOut' || phase === 'done';
  const flapOpen = phase === 'flapOpen' || phase === 'cardOut' || phase === 'done';
  const sealBroken = phase !== 'enter' && phase !== 'idle';

  return (
    <div className="env-overlay" role="dialog" aria-label="Welcome">
      <button onClick={close} className="env-close" aria-label="Close">
        <X size={22} strokeWidth={1.2} />
      </button>

      {/* Falling petals after card appears */}
      <div className="petals-layer">
        {cardActive &&
          petals.map((p) => (
            <span
              key={p.id}
              className={`petal ${p.hue}`}
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--rot': `${p.rotate}deg`,
                '--drift': `${p.drift}px`,
              }}
            />
          ))}
      </div>

      <div className={`env-stage stage-${phase}`}>
        {/* THE CARD - large, easy to read */}
        <div className={`env-card ${cardActive ? 'card-out' : ''}`}>
          <div className="card-inner">
            <div className="card-border" />
            <div className="card-corner c-tl" />
            <div className="card-corner c-tr" />
            <div className="card-corner c-bl" />
            <div className="card-corner c-br" />

            <div className="card-monogram-small">a note from</div>
            <div className="card-brand-row">
              <span className="card-brand-line" />
              <span className="card-brand">LUSH MAKEOVERS</span>
              <span className="card-brand-line" />
            </div>

            <h2 className="card-title">Thank you</h2>
            <div className="card-sub">FOR BEING HERE</div>

            <div className="card-flourish">
              <svg viewBox="0 0 120 12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 6 Q30 0 60 6 T120 6"
                  fill="none"
                  stroke="#b89868"
                  strokeWidth="1"
                />
                <circle cx="60" cy="6" r="2" fill="#b89868" />
              </svg>
            </div>

            <p className="card-text">
              It&apos;s an honour to be a part of your bridal journey.
              Step inside our world of elevated, hand-crafted beauty
              &mdash; designed for the modern Vijayawada bride.
            </p>

            <div className="card-signoff">
              <div className="card-signoff-line">With love,</div>
              <div className="card-signoff-name">the Lush Makeovers team</div>
            </div>

            <button onClick={close} className="card-cta">
              <span>Enter the Studio</span>
            </button>
          </div>
        </div>

        {/* THE ENVELOPE */}
        <div className="env-wrap">
          {/* Decorative pattern back layer */}
          <div className="env-back">
            <div className="env-back-pattern" />
          </div>

          {/* Front pocket body with damask pattern */}
          <div className="env-body">
            <div className="env-body-pattern" />
            <div className="env-body-shine" />
            {/* gold trim */}
            <div className="env-body-trim" />
            {/* Bottom monogram on front */}
            <div className="env-body-monogram">
              <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 35 Q15 5 30 20 Q45 5 55 35"
                  fill="none"
                  stroke="#7a5e36"
                  strokeWidth="0.8"
                  opacity="0.55"
                />
                <text
                  x="30"
                  y="28"
                  textAnchor="middle"
                  fontFamily="Italiana, serif"
                  fontSize="11"
                  fill="#7a5e36"
                  letterSpacing="2"
                  opacity="0.75"
                >
                  LM
                </text>
              </svg>
            </div>
          </div>

          {/* Flap with decorative edge */}
          <div className={`env-flap ${flapOpen ? 'flap-open' : ''}`}>
            <div className="env-flap-pattern" />
            <div className="env-flap-edge" />
          </div>

          {/* Wax seal */}
          <div className={`env-seal ${sealBroken ? 'seal-break' : ''}`}>
            <div className="seal-glow" />
            <div className="seal-disc">
              <div className="seal-ring" />
              <div className="seal-letters">LM</div>
            </div>
          </div>

          {/* Burst particles when seal breaks */}
          {showBurst && (
            <div className="seal-burst">
              {sparks.map((s) => (
                <span
                  key={s.id}
                  className="spark"
                  style={{ '--tx': `${s.x}px`, '--ty': `${s.y}px` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="env-tagline">
        <span>Vijayawada&apos;s most-booked bridal studio</span>
      </div>
    </div>
  );
};

export default EnvelopeIntro;
