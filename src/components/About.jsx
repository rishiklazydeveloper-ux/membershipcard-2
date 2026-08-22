import { IMAGES } from '../data/content'

function About() {
  return (
    <section id="about" style={{ background: '#ffffff', margin: 0, padding: 0 }}>
      <style>{`@media (max-width: 768px) { #about .about-head { grid-template-columns: 1fr !important; gap: 16px !important; padding: 40px 20px 0 !important; } #about .about-content { grid-template-columns: 1fr !important; gap: 32px !important; padding: 32px 20px 40px !important; } #about .about-content img { height: 380px !important; } #about .about-content > div:last-child { padding-left: 0 !important; } }`}</style>
      {/* Head - exact as image */}
      <div className="about-head" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', padding: '80px 40px 0', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
          <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: '20px' }}>✳</span>
          <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>About Us</span>
        </div>
        <div style={{ color: '#0e2328', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Universal Realty Farm &amp; Resort<br />
          (OPC) Pvt. Ltd. — Farms, Resorts<br />
          &amp; Nature-led Escapes
        </div>
      </div>

      {/* Content - left image / right text */}
      <div className="about-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', padding: '60px 40px 80px', maxWidth: '1440px', margin: '0 auto', alignItems: 'start' }}>
        {/* Left image from assets */}
        <div>
          <img
            src={IMAGES.aboutIllustration}
            loading="lazy"
            alt=""
            style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>
          {/* Top paragraph - centered block */}
          <div style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ color: '#1a2e33', fontSize: '15px', lineHeight: 1.6, fontWeight: 400 }}>
              Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd.
              <br />
              is a farm &amp; resort-led hospitality company blending
              <br />
              nature, wellness and leisure. We curate villas, farms,
              <br />
              resorts &amp; adventure venues — now accessible with
              <br />
              one tap-enabled membership card.
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '56px', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
            <div>
              <div style={{ color: '#0e2328', fontSize: '42px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>500+</div>
              <div style={{ color: '#1a2e33', fontSize: '14px', fontWeight: 600, marginTop: '14px', lineHeight: 1.3 }}>
                Partner venues <br />
                across India
              </div>
            </div>
            <div>
              <div style={{ color: '#0e2328', fontSize: '42px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>365</div>
              <div style={{ color: '#1a2e33', fontSize: '14px', fontWeight: 600, marginTop: '14px', lineHeight: 1.3 }}>
                Days tap &amp; enjoy <br />
                with one card
              </div>
            </div>
          </div>

          {/* Trusted + logos */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '80px', gap: '24px', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
            <div style={{ color: '#6b7d82', fontSize: '13px', lineHeight: 1.5, maxWidth: '200px' }}>
              Trusted by families who choose Universal Realty for farm, resort &amp; leisure escapes.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <span style={{ color: '#0e2328', fontSize: '13px', fontWeight: 600, fontFamily: 'serif', letterSpacing: '0.02em' }}>yoga<span style={{ fontSize: '9px', verticalAlign: 'super' }}>journal</span></span>
              <span style={{ color: '#0e2328', fontSize: '11px', fontWeight: 700, border: '1px solid #0e2328', borderRadius: '9999px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>lonely planet</span>
              <span style={{ color: '#0e2328', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}><span style={{ background: '#0e2328', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>abc</span>NEWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About