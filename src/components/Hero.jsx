import heroBg from '../assets/image1.png'

function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '95px' }}>
      <img src={heroBg} loading="eager" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,35,40,0.35) 0%, rgba(14,35,40,0.55) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ color: '#fff', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(48px, 10vw, 140px)', textAlign: 'center', margin: 0 }}>
          One Card
        </h1>
        <h2 style={{ color: '#fff', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em', fontSize: 'clamp(28px, 5vw, 56px)', textAlign: 'center', marginTop: '8px' }}>
          Unlimited Experiences
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(13px, 1.8vw, 16px)', lineHeight: 1.5, textAlign: 'center', marginTop: '16px', maxWidth: '620px' }}>
          Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd. — ₹51,000 for 1 year. Tap your card at villas, farms, theme parks, water parks, resorts &amp; dine-out — no bills, unlimited for family &amp; friends.
        </p>
        <a href="/#contact" onClick={(e) => { const el = document.querySelector('#contact'); if (el && window.location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 95, behavior: 'smooth' }) } }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#0e2328', fontSize: '14px', fontWeight: 600, padding: '14px 28px', borderRadius: '9999px', textDecoration: 'none', marginTop: '24px', whiteSpace: 'nowrap' }}>
          Explore Retreats
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" fill="#0e2328" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
