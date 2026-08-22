import { STATISTICS } from '../data/content'

function Statistics() {
  return (
    <section id="retreats" style={{ background: '#ffffff', margin: 0, padding: 0 }}>
      <style>{`@media (max-width: 768px) { #retreats .retreats-head { grid-template-columns: 1fr !important; gap: 16px !important; padding: 40px 20px 32px !important; } #retreats .retreats-grid { grid-template-columns: 1fr !important; } #retreats .retreats-grid > div { border-left: none !important; border-top: 1px solid #dde3e5; } #retreats .retreats-grid > div:first-child { border-top: none; } #retreats .retreats-grid img { height: 380px !important; } }`}</style>
      {/* Head */}
      <div className="retreats-head" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', padding: '80px 40px 70px', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
          <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: '20px' }}>✳</span>
          <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Retreats</span>
        </div>
        <div style={{ color: '#0e2328', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          We&apos;ve vetted retreats in <br />
          more than 100 countries <br />
          See for yourself
        </div>
      </div>

      {/* Statistic items - full bleed with borders */}
      <div className="retreats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #dde3e5', borderBottom: '1px solid #dde3e5', background: '#ffffff' }}>
        {STATISTICS.map((stat, i) => (
          <div
            key={stat.title}
            style={{
              padding: '28px 28px 28px',
              borderLeft: i > 0 ? '1px solid #dde3e5' : 'none',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ color: '#0e2328', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>{stat.title}</div>
              <div style={{ color: '#6b7d82', fontSize: '13px', fontWeight: 500 }}>{stat.countries}</div>
            </div>
            <div style={{ flex: 1 }}>
              <img
                src={stat.image}
                loading="lazy"
                alt=""
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block', border: '1px solid #eef2f3' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: '1px', background: '#dde3e5', width: '100%' }} />
    </section>
  )
}

export default Statistics