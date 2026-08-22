import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '95px', display: 'flex', alignItems: 'stretch', background: 'rgba(14,35,40,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', borderRight: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', minWidth: 0, flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: '16px', lineHeight: 1 }}>✳</span>
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Vita Travels</span>
        </a>
        <div style={{ flex: 1, minWidth: 0, borderRight: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)' }} />
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }}>
          <a href="#top" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</a>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>About Us</a>
          <a href="#gallery" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Gallery</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Contact Us</a>
          <a href="#career" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Career</a>
        </nav>
        <a href="#experiences" className="nav-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 22px', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Explore
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-burger" style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '6px', width: '56px', marginLeft: 'auto', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.12)', background: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none', cursor: 'pointer' }} aria-label="Toggle menu">
          {!menuOpen ? (
            <>
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#fff' }} />
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#fff' }} />
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#fff' }} />
            </>
          ) : (
            <>
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#fff', transform: 'rotate(45deg) translate(4px, 4px)' }} />
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#fff', transform: 'rotate(-45deg) translate(4px, -4px)' }} />
            </>
          )}
        </button>
        <style>{`@media (max-width: 1100px) { .nav-desktop { display: none !important; } .nav-burger { display: flex !important; } } @media (min-width: 1101px) { .nav-burger { display: none !important; } } @media (max-width: 480px) { header { height: 64px !important; } header a[href="#top"] { padding: 0 12px !important; } } header { max-width: 100%; overflow: visible !important; box-sizing: border-box; }`}</style>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)} style={{ position: 'fixed', top: '95px', left: 0, right: 0, bottom: 0, zIndex: 49, background: 'rgba(14,35,40,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
            <a href="#top" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>About Us</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Gallery</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Contact Us</a>
            <a href="#career" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Career</a>
            <a href="#experiences" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#0e2328', fontSize: '15px', fontWeight: 600, padding: '14px', borderRadius: '9999px', textDecoration: 'none', marginTop: '12px' }}>
              Explore Retreats
            </a>
          </div>
        </div>
      )}
      <style>{`@media (max-width: 480px) { .mobile-menu { top: 64px !important; } }`}</style>
    </>
  )
}

export default Header
