import bgImage from '../assets/image7.PNG'

function Combine() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '720px', overflow: 'hidden', background: '#0e2328' }}>
      <img src={bgImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,35,40,0.15) 0%, rgba(14,35,40,0.35) 55%, rgba(14,35,40,0.85) 100%)' }} />

      {/* Top text over image */}
      <div style={{ position: 'relative', zIndex: 1, padding: '56px 40px 0', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ color: '#ffffff', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>
          Combine Retreat
        </div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}><span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>+</span>Stay</div>
          <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}><span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>+</span>Transfers</div>
          <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}><span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>+</span>Extras</div>
        </div>
      </div>

      {/* Spacer to push bottom bar down - fills middle fog */}
      <div className="combine-spacer" style={{ position: 'relative', zIndex: 1, height: '280px' }} />
      <style>{`@media (max-width: 900px) { .combine-bar { grid-template-columns: 1fr !important; } .combine-bar > div { border-right: none !important; border-top: 1px solid rgba(255,255,255,0.12); min-height: auto !important; padding: 20px 20px !important; } .combine-bar > div:first-child { border-top: none; } .combine-spacer { height: 120px !important; } } @media (max-width: 480px) { .combine-bar { grid-template-columns: 1fr !important; } }`}</style>

      {/* Bottom bar - 5 columns with top border */}
      <div className="combine-bar" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.15)', background: 'rgba(10,30,35,0.35)', backdropFilter: 'blur(2px)' }}>
        {/* Description */}
        <div style={{ padding: '28px 32px 32px', borderRight: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 500, lineHeight: 1.4 }}>
            Combine Retreat into one seamless<br />
            checkout. Instant confirmations where<br />
            available, or concierge support for<br />
            bespoke itineraries.
          </div>
        </div>
        {/* 01 */}
        <div style={{ padding: '28px 24px 32px', borderRight: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '38px', fontWeight: 700, lineHeight: 1 }}>01</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 500, marginTop: '4px' }}>Step</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '40px' }}>
            Choose<br />Retreat
          </div>
        </div>
        {/* 02 */}
        <div style={{ padding: '28px 24px 32px', borderRight: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '38px', fontWeight: 700, lineHeight: 1 }}>02</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 500, marginTop: '4px' }}>Step</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '40px' }}>
            Match Boutique<br />Stay
          </div>
        </div>
        {/* 03 */}
        <div style={{ padding: '28px 24px 32px', borderRight: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '38px', fontWeight: 700, lineHeight: 1 }}>03</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 500, marginTop: '4px' }}>Step</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '40px' }}>
            Add Transfers &<br />Extras
          </div>
        </div>
        {/* 04 */}
        <div style={{ padding: '28px 24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '38px', fontWeight: 700, lineHeight: 1 }}>04</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 500, marginTop: '4px' }}>Step</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '40px' }}>
            Secure<br />Payment
          </div>
        </div>
      </div>
    </section>
  )
}

export default Combine
