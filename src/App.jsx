import Header from './components/Header'
import Hero from './components/Hero'
import Statistics from './components/Statistics'
import About from './components/About'
import FeaturedRetreats from './components/FeaturedRetreats'
import Combine from './components/Combine'
import Destinations from './components/Destinations'
import HowWorks from './components/HowWorks'
import Practitioners from './components/Practitioners'
import Career from './components/Career'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Footer from './components/Footer'
import NoticeBanner from './components/NoticeBanner'

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <Hero />
      <Statistics />
      <About />
      <FeaturedRetreats />
      <Combine />
      <Destinations />
      <HowWorks />
      <Practitioners />
    </main>
  )
}

function CareerPage() {
  return (
    <main className="career-page" style={{ paddingTop: '95px' }}>
      <Career />
    </main>
  )
}

function App() {
  useEffect(() => {
    const els = document.querySelectorAll('main section, footer')
    const hero = document.querySelector('main section:first-child')
    els.forEach((el, i) => {
      if (el === hero) {
        el.classList.add('visible')
        return
      }
      el.classList.add('reveal')
      if (i % 3 === 1) el.classList.add('reveal-delay-1')
      if (i % 3 === 2) el.classList.add('reveal-delay-2')
    })
    const toObserve = Array.from(els).filter((el) => el !== hero)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    toObserve.forEach((el) => io.observe(el))
    const fallback = setTimeout(() => {
      toObserve.forEach((el) => el.classList.add('visible'))
    }, 600)

    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#' || id.startsWith('/')) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      const offset = window.innerWidth <= 480 ? 64 : 95
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    document.addEventListener('click', handler)
    return () => {
      clearTimeout(fallback)
      io.disconnect()
      document.removeEventListener('click', handler)
    }
  }, [])

  return (
    <BrowserRouter>
      <div id="top" className="min-h-screen bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
        <NoticeBanner />
      </div>
    </BrowserRouter>
  )
}

export default App
