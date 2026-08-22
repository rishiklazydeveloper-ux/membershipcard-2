import bgImage from '../assets/image7.PNG'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer" style={{ position: 'relative', overflow: 'hidden', background: '#0e2328' }}>
      <img src={bgImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
      {/* Top soft shade to avoid sharp edge from previous white section */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 18%, rgba(255,255,255,0.45) 42%, rgba(255,255,255,0.0) 100%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(180deg, rgba(14,35,40,0.0) 0%, rgba(14,35,40,0.12) 100%)', pointerEvents: 'none', zIndex: 1, filter: 'blur(12px)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,35,40,0.08) 0%, rgba(14,35,40,0.55) 45%, rgba(14,35,40,0.92) 100%)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '60px 40px 0' }}>
        {/* MENU / SOCIALS / RESOURCES */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* MENU - connects to actual sections */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.7)', marginBottom: '14px' }}>
              MENU
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Home</Link>
              <a href="/#about" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>About Us</a>
              <a href="/#gallery" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Gallery</a>
              <a href="/#contact" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Contact Us</a>
              <Link to="/career" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Career</Link>
            </div>
          </div>

          {/* SOCIALS */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.7)', marginBottom: '14px' }}>
              SOCIALS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>X</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>LinkedIn</a>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.7)', marginBottom: '14px' }}>
              RESOURCES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>How it Works</a>
              <a href="#contact" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Newsletter</a>
              <a href="#contact" style={{ display: 'inline-flex', alignSelf: 'flex-start', marginTop: '10px', color: '#ffffff', fontSize: '12px', fontWeight: 500, padding: '9px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                Send a message
              </a>
            </div>
          </div>
        </div>

        {/* Big faded text */}
        <div style={{ marginTop: '80px', overflow: 'hidden', lineHeight: 0.8, pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{
            fontSize: 'clamp(48px, 12vw, 160px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.0) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}>
            UNIVERSAL
          </div>
          <div style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.55)',
            textAlign: 'center',
            marginTop: '8px',
            textTransform: 'uppercase',
          }}>
            Realty Farm &amp; Resort (OPC) Pvt. Ltd.
          </div>
        </div>

        {/* Bottom thin line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '24px', padding: '14px 0 20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>© 2026 Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd. • Tap &amp; Pay Card ₹5,00,000 / year</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>Privacy • Terms • Support</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
