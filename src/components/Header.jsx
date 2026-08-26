import { useState, useEffect } from 'react'
import logoImg from '../assets/logo.jpeg'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Track header height based on viewport width
  const [headerHeight, setHeaderHeight] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 480 ? 64 : 95
  )

  useEffect(() => {
    const updateHeight = () => {
      setHeaderHeight(window.innerWidth <= 480 ? 64 : 95)
    }
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const menuOverlayStyle = {
    position: 'fixed',
    top: headerHeight + 'px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: 99999,
    backgroundColor: '#0e2328',
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
  }

  const menuInnerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const linkStyle = {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    display: 'block',
  }

  const ctaStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: '#0e2328',
    fontSize: '15px',
    fontWeight: 600,
    padding: '14px',
    borderRadius: '9999px',
    textDecoration: 'none',
    marginTop: '12px',
    border: 'none',
  }

  return (
    <>
      <header className="site-header" data-lenis-prevent>
        <Link to="/" className="site-header__logo">
          <img src={logoImg} alt="Universal Realty" />
        </Link>
        <div className="site-header__spacer" />
        <nav className="site-header__nav nav-desktop">
          <a href="#top" onClick={(e) => { e.preventDefault(); if (location.pathname !== '/') { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100) } else window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>Home</a>
          <a href="#about" onClick={(e) => location.pathname !== '/' && (e.preventDefault(), go('#about'))}>About Us</a>
          <a href="#gallery" onClick={(e) => location.pathname !== '/' && (e.preventDefault(), go('#gallery'))}>Gallery</a>
          <a href="#contact" onClick={(e) => location.pathname !== '/' && (e.preventDefault(), go('#contact'))}>Contact Us</a>
          <Link to="/career">Career</Link>
        </nav>
        <a href="#contact" onClick={(e) => { if (location.pathname !== '/') { e.preventDefault(); go('#contact') } }} className="site-header__explore nav-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 22px', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer' }}>Explore</a>
        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {!open ? (
            <>
              <span /><span /><span />
            </>
          ) : (
            <>
              <span className="open-1" /><span className="open-2" />
            </>
          )}
        </button>
      </header>

      {open && (
        <div
          style={menuOverlayStyle}
          onClick={() => setOpen(false)}
        >
          <div style={menuInnerStyle} onClick={(e) => e.stopPropagation()}>
            <a href="#top" onClick={(e) => { e.preventDefault(); setOpen(false); if (location.pathname !== '/') { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100) } else window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={linkStyle}>Home</a>
            <a href="#about" onClick={() => { setOpen(false); if (location.pathname !== '/') go('#about') }} style={linkStyle}>About Us</a>
            <a href="#gallery" onClick={() => { setOpen(false); if (location.pathname !== '/') go('#gallery') }} style={linkStyle}>Gallery</a>
            <a href="#contact" onClick={() => { setOpen(false); if (location.pathname !== '/') go('#contact') }} style={linkStyle}>Contact Us</a>
            <Link to="/career" onClick={() => setOpen(false)} style={linkStyle}>Career</Link>
            <a href="#contact" onClick={(e) => { setOpen(false); if (location.pathname !== '/') { e.preventDefault(); go('#contact') } }} style={{ ...ctaStyle, cursor: 'pointer' }}>Explore Retreats</a>
          </div>
        </div>
      )}
    </>
  )
}
