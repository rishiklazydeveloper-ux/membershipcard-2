import { useState } from 'react'
import logoImg from '../assets/logo.jpeg'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const go = (hash) => {
    if (location.pathname !== '/') {
      navigate('/' + hash)
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 95, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '95px', display: 'flex', alignItems: 'stretch', background: 'rgba(14,35,40,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', borderRight: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', minWidth: 0, flexShrink: 0 }}>
          <img src={logoImg} alt="Universal Realty Farm & Resort" style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block', borderRadius: '4px' }} />
        </Link>
        <div style={{ flex: 1, minWidth: 0, borderRight: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)' }} />
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</Link>
          <a href="#about" onClick={(e) => { if (location.pathname !== '/') { e.preventDefault(); go('#about') } }} style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>About Us</a>
          <a href="#gallery" onClick={(e) => { if (location.pathname !== '/') { e.preventDefault(); go('#gallery') } }} style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>Gallery</a>
          <a href="#contact" onClick={(e) => { if (location.pathname !== '/') { e.preventDefault(); go('#contact') } }} style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>Contact Us</a>
          <Link to="/career" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Career</Link>
        </nav>
        <Link to="/career" className="nav-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 22px', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Explore
        </Link>
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
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Home</Link>
            <a href="#about" onClick={() => { setMenuOpen(false); if (location.pathname !== '/') go('#about') }} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>About Us</a>
            <a href="#gallery" onClick={() => { setMenuOpen(false); if (location.pathname !== '/') go('#gallery') }} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Gallery</a>
            <a href="#contact" onClick={() => { setMenuOpen(false); if (location.pathname !== '/') go('#contact') }} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Contact Us</a>
            <Link to="/career" onClick={() => setMenuOpen(false)} style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Career</Link>
            <Link to="/career" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#0e2328', fontSize: '15px', fontWeight: 600, padding: '14px', borderRadius: '9999px', textDecoration: 'none', marginTop: '12px' }}>
              Explore Retreats
            </Link>
          </div>
        </div>
      )}
      <style>{`@media (max-width: 480px) { .mobile-menu { top: 64px !important; } }`}</style>
    </>
  )
}

export default Header
