import { RETREATS } from '../data/content'

function FeaturedRetreats() {
  return (
    <section id="experiences" style={{ background: '#ffffff', margin: 0, padding: 0, borderTop: '1px solid #dde3e5', borderBottom: '1px solid #dde3e5' }}>
      <style>{`@media (max-width: 768px) { #experiences .featured-head { grid-template-columns: 1fr !important; padding: 32px 20px !important; gap: 12px !important; } #experiences .featured-grid { grid-template-columns: 1fr !important; } #experiences .featured-grid > div { grid-template-columns: 1fr !important; border-left: none !important; border-top: 1px solid #dde3e5 !important; } #experiences .featured-grid > div:first-child { border-top: none !important; } } @media (max-width: 1024px) and (min-width: 769px) { #experiences .featured-grid > div { grid-template-columns: 1fr 160px !important; } }`}</style>
      {/* Head - same as image */}
      <div className="featured-head" style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '40px', padding: '56px 40px', maxWidth: '1440px', margin: '0 auto', alignItems: 'center' }}>
        <div style={{ color: '#0e2328', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>
          Featured Retreats
        </div>
        <div style={{ color: '#6b7d82', fontSize: '13px', lineHeight: 1.5, textAlign: 'left' }}>
          Discover unique locations, engaging activities, and expert-<br />
          led workshops designed to inspire and refresh your spirit.
        </div>
      </div>

      {/* Grid 2 columns x 3 rows - exact as image */}
      <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: '1px solid #dde3e5', background: '#ffffff' }}>
        {RETREATS.slice(0, 6).map((retreat, i) => (
          <div
            key={retreat.title}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 210px',
              gap: '24px',
              padding: '28px 32px',
              borderLeft: i % 2 === 1 ? '1px solid #dde3e5' : 'none',
              borderTop: i >= 2 ? '1px solid #dde3e5' : 'none',
              background: '#ffffff',
              minHeight: '340px',
            }}
          >
            {/* Left content */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#0e2328', fontSize: '20px', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {retreat.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
                  <span style={{ color: '#6b7d82', fontSize: '13px', fontWeight: 500 }}>from</span>
                  <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 700 }}>{retreat.price}</span>
                </div>

                {/* Properties with icons on right */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#1a2e33', fontSize: '11px', fontWeight: 600 }}>{retreat.location}</span>
                    <span style={{ color: '#a8b5b9', fontSize: '12px' }}>◎</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#1a2e33', fontSize: '11px', fontWeight: 600 }}>{retreat.date} <span style={{ color: '#6b7d82', fontWeight: 400 }}>{retreat.duration}</span></span>
                    <span style={{ color: '#a8b5b9', fontSize: '12px' }}>▢</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#1a2e33', fontSize: '11px', fontWeight: 600 }}>{retreat.guests}</span>
                    <span style={{ color: '#a8b5b9', fontSize: '12px' }}>◯</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7d82', fontSize: '11px', fontWeight: 500 }}>Trusted by <span style={{ color: '#1a2e33', fontWeight: 600 }}>{retreat.trusted}</span> clients worldwide</span>
                    <span style={{ color: '#fba13a', fontSize: '10px', letterSpacing: '1px' }}>★★★★★</span>
                  </div>
                </div>
              </div>

              <a href={retreat.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0e2328', color: '#ffffff', fontSize: '12px', fontWeight: 600, padding: '12px 16px', borderRadius: '9999px', textDecoration: 'none', marginTop: '20px' }}>
                Explore Retreat
                <span style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%', display: 'inline-block' }} />
              </a>
            </div>

            {/* Right image from assets */}
            <div>
              <img src={retreat.image} loading="lazy" alt="" style={{ width: '100%', height: '284px', objectFit: 'cover', display: 'block', border: '1px solid #eef2f3' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedRetreats