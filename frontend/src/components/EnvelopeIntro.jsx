import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import './envelope.css';

const EnvelopeIntro = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState('enter');
  const [closing, setClosing] = useState(false);
  // phase: enter -> idle -> flapOpen -> cardOut -> envHide -> done

  useEffect(() => {
    if (location.pathname !== '/') {
      setShow(false);
      setClosing(false);
      setPhase('enter');
      return;
    }

    const seen = sessionStorage.getItem('lush_intro_seen');
    if (seen) {
      setShow(false);
      return;
    }

    setShow(true);
    setClosing(false);
    setPhase('enter');

    const timers = [
      setTimeout(() => setPhase('idle'), 800),
      setTimeout(() => setPhase('flapOpen'), 1700),
      setTimeout(() => setPhase('cardOut'), 2500),
      setTimeout(() => setPhase('envHide'), 4000),
      setTimeout(() => setPhase('done'), 5400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [location.pathname]);

  const close = () => {
    sessionStorage.setItem('lush_intro_seen', '1');
    setClosing(true);
    setTimeout(() => setShow(false), 750);
  };

  if (!show || location.pathname !== '/') return null;

  const flapOpen =
    phase === 'flapOpen' ||
    phase === 'cardOut' ||
    phase === 'envHide' ||
    phase === 'done';
  const cardActive =
    phase === 'cardOut' || phase === 'envHide' || phase === 'done';
  const envHide = phase === 'envHide' || phase === 'done';
  const sealBroken = phase !== 'enter' && phase !== 'idle';

  return (
    <div
      className={`env-overlay ${closing ? 'closing' : ''}`}
      role="dialog"
      aria-label="Welcome"
    >
      <button onClick={close} className="env-close" aria-label="Close">
        <X size={22} strokeWidth={1} />
      </button>

      <div className="env-stage">
        {/* ENVELOPE (fades out once the card is fully out) */}
        <div className={`env-wrap ${envHide ? 'env-hide' : ''}`}>
          <div className="env-back" />
          <div className="env-body">
            <div className="env-body-trim" />
            <div className="env-body-mono">L &middot; M</div>
          </div>
          <div className={`env-flap ${flapOpen ? 'flap-open' : ''}`}>
            <div className="env-flap-trim" />
          </div>
          <div className={`env-seal ${sealBroken ? 'seal-break' : ''}`}>
            <span>LM</span>
          </div>
        </div>

        {/* THE CARD */}
        <div className={`env-card ${cardActive ? 'card-out' : ''}`}>
          <div className="card-inner">
            <div className="card-bevel" />

            <div className="card-eyebrow">
              <span className="rule" />
              <span className="eyebrow-text">a note from</span>
              <span className="rule" />
            </div>

            <div className="card-brand">LUSH MAKEOVERS</div>
            <div className="card-brand-sub">HAIR &amp; MAKEUP</div>

            <h2 className="card-title">
              <span className="card-title-script">Thank you</span>
              <span className="card-title-line">for being here</span>
            </h2>

            <p className="card-text">
              It is an honour to be a part of your bridal journey.
              Step inside our world of elevated, hand-crafted beauty &mdash;
              refined for the modern Vijayawada bride.
            </p>

            <div className="card-divider">
              <span className="dot" />
            </div>

            <div className="card-signoff">
              <div className="signoff-line">With love,</div>
              <div className="signoff-name">the Lush Makeovers Studio</div>
            </div>

            <button onClick={close} className="card-cta">
              Enter the Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeIntro;
