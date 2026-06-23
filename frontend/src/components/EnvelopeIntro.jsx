import React, { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';
import './envelope.css';

const EnvelopeIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState('closed'); // closed -> opening -> cardOut -> done

  useEffect(() => {
    const seen = sessionStorage.getItem('lush_intro_seen');
    if (!seen) {
      setShow(true);
      // Sequence the animation
      const t1 = setTimeout(() => setPhase('opening'), 700);
      const t2 = setTimeout(() => setPhase('cardOut'), 1700);
      const t3 = setTimeout(() => setPhase('done'), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, []);

  const close = () => {
    sessionStorage.setItem('lush_intro_seen', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="env-overlay">
      <button onClick={close} className="env-close" aria-label="Close">
        <X size={22} strokeWidth={1.2} />
      </button>

      <div className="env-stage">
        {/* CARD - emerges from envelope */}
        <div className={`env-card ${phase === 'cardOut' || phase === 'done' ? 'card-out' : ''}`}>
          <div className="card-inner">
            <div className="card-corner card-corner-tl" />
            <div className="card-corner card-corner-tr" />
            <div className="card-corner card-corner-bl" />
            <div className="card-corner card-corner-br" />

            <div className="card-ornament">
              <span className="ornament-line" />
              <Heart size={14} className="ornament-heart" strokeWidth={1.2} />
              <span className="ornament-line" />
            </div>

            <div className="card-eyebrow">A note from</div>
            <div className="card-brand">LUSH MAKEOVERS</div>
            <div className="card-divider" />

            <h2 className="card-title">
              <span className="card-title-script">Thank you</span>
              <span className="card-title-sub">for being here</span>
            </h2>

            <p className="card-text">
              It&apos;s an honour to be a part of your bridal journey. Step inside
              our world of elevated, hand-crafted beauty &mdash; designed for the
              modern Vijayawada bride.
            </p>

            <div className="card-signoff">
              <div className="card-signoff-line">With love,</div>
              <div className="card-signoff-name">the Lush Makeovers team</div>
            </div>

            <button onClick={close} className="card-cta">
              Enter the Studio
            </button>
          </div>
        </div>

        {/* ENVELOPE */}
        <div className="env-envelope">
          {/* back of envelope */}
          <div className="env-back" />
          {/* body / front pocket */}
          <div className="env-body">
            <div className="env-body-shine" />
          </div>
          {/* flap */}
          <div className={`env-flap ${phase !== 'closed' ? 'flap-open' : ''}`}>
            <div className="env-flap-inner" />
          </div>
          {/* wax seal */}
          <div className={`env-seal ${phase !== 'closed' ? 'seal-broken' : ''}`}>
            <div className="env-seal-inner">LM</div>
          </div>
        </div>
      </div>

      <div className="env-tagline">
        <span>Vijayawada&apos;s most-booked bridal studio</span>
      </div>
    </div>
  );
};

export default EnvelopeIntro;
