function HowWorks() {
  return (
    <section id="how-it-works" style={{ background: '#ffffff', padding: '80px 40px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header - top left like image */}
        <div style={{ maxWidth: '520px', marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: 1 }}>✳</span>
            <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>How it Works</span>
          </div>
          <div style={{ color: '#0e2328', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            One card unlocks<br />every experience
          </div>
          <div style={{ color: '#6b7d82', fontSize: '15px', lineHeight: 1.6, marginTop: '14px', maxWidth: '460px' }}>
            Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd. — pay ₹5,00,000 once and tap to enjoy villas, farms, theme parks, water parks, resorts &amp; dine-out. No bills, no limits — for you, family &amp; friends for 365 days.
          </div>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#0e2328', color: '#fba13a', fontSize: '14px', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', marginTop: '20px', letterSpacing: '0.02em', border: '1px solid #0e2328' }}>
            Get Your Card
          </a>
        </div>

        {/* Curved roadmap */}
        <div style={{ position: 'relative', height: '340px', marginTop: '10px' }}>
          {/* Watermark numbers */}
          <div style={{ position: 'absolute', left: '8%', bottom: '20px', fontSize: '160px', fontWeight: 800, color: '#f3f5f6', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>1</div>
          <div style={{ position: 'absolute', left: '46%', top: '40px', fontSize: '160px', fontWeight: 800, color: '#f3f5f6', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>2</div>
          <div style={{ position: 'absolute', right: '6%', top: '-18px', fontSize: '160px', fontWeight: 800, color: '#f3f5f6', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>3</div>
          {/* Light accent circle behind 3 - theme color */}
          <div style={{ position: 'absolute', right: '-10px', top: '-32px', width: '260px', height: '260px', background: '#fff7ec', borderRadius: '50%', opacity: 0.9, pointerEvents: 'none' }} />

          {/* Wavy accent line - theme orange */}
          <svg viewBox="0 0 1000 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="none">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#fba13a" floodOpacity="0.18" />
              </filter>
            </defs>
            <path d="M 0 220 Q 70 170 140 210 T 320 200 Q 420 195 480 120 T 740 60 T 980 30" fill="none" stroke="#fba13a" strokeWidth="2.5" strokeLinecap="round" filter="url(#shadow)" />
            {/* dots */}
            <circle cx="140" cy="210" r="7" fill="#d9dee1" stroke="#fff" strokeWidth="3" />
            <circle cx="480" cy="120" r="7" fill="#d9dee1" stroke="#fff" strokeWidth="3" />
            <circle cx="740" cy="60" r="7" fill="#d9dee1" stroke="#fff" strokeWidth="3" />
          </svg>

          {/* Step 1 - bottom left */}
          <div style={{ position: 'absolute', left: '11%', bottom: '48px', maxWidth: '260px', zIndex: 1 }}>
            <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>Buy Your Card</div>
            <div style={{ color: '#6b7d82', fontSize: '13px', lineHeight: 1.6, marginTop: '8px' }}>
              Pay ₹5,00,000 once. Get your premium tap-card — valid for 365 days for you, family & friends.
            </div>
          </div>

          {/* Step 2 - middle */}
          <div style={{ position: 'absolute', left: '44%', top: '152px', maxWidth: '260px', zIndex: 1 }}>
            <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>Tap at Any Venue</div>
            <div style={{ color: '#6b7d82', fontSize: '13px', lineHeight: 1.6, marginTop: '8px' }}>
              Choose from 500+ villas, theme parks, water parks, resorts & dine-out. Just tap at the gate — no cash needed.
            </div>
          </div>

          {/* Step 3 - top right */}
          <div style={{ position: 'absolute', right: '8%', top: '76px', maxWidth: '270px', zIndex: 1 }}>
            <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>Enjoy Unlimited All Year</div>
            <div style={{ color: '#6b7d82', fontSize: '13px', lineHeight: 1.6, marginTop: '8px' }}>
              Unlimited taps for 1 year. Visit any partner anytime, bring loved ones and repeat without limits.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback - stack */}
      <style>{`
        @media (max-width: 768px) {
          #how-it-works > div > div:last-child { display: none; }
          #how-it-works .mobile-steps { display: block !important; }
        }
      `}</style>
      <div className="mobile-steps" style={{ display: 'none', maxWidth: '1200px', margin: '0 auto', paddingTop: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { n: '01', t: 'Buy Your Card', d: 'Pay ₹5,00,000 once. Valid 365 days for you, family & friends.' },
            { n: '02', t: 'Tap at Any Venue', d: '500+ villas, parks, resorts & dine-out. Just tap — no bills.' },
            { n: '03', t: 'Enjoy Unlimited All Year', d: 'Unlimited visits all year. Come anytime with loved ones.' },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#f8fafa', border: '1px solid #eef2f3', borderRadius: '16px', padding: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fba13a', color: '#0e2328', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700 }}>{s.t}</div>
                <div style={{ color: '#6b7d82', fontSize: '13px', marginTop: '6px', lineHeight: 1.5 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWorks
