import Header from './components/Header'
import Hero from './components/Hero'
import Statistics from './components/Statistics'
import About from './components/About'
import FeaturedRetreats from './components/FeaturedRetreats'
import Combine from './components/Combine'
import Destinations from './components/Destinations'
import HowWorks from './components/HowWorks'
import Practitioners from './components/Practitioners'
import Footer from './components/Footer'
import NoticeBanner from './components/NoticeBanner'

import { useEffect } from 'react'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    // Lenis fluid smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: 'vertical',
    })
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // reveal animations - exclude Hero to avoid stuck
    const els = document.querySelectorAll('main section:not(:first-child), footer')
    els.forEach((el, i) => {
      el.classList.add('reveal')
      if (i % 3 === 1) el.classList.add('reveal-delay-1')
      if (i % 3 === 2) el.classList.add('reveal-delay-2')
    })
    // Hero visible immediately
    const hero = document.querySelector('main section:first-child')
    if (hero) hero.classList.add('visible')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))

    // smooth anchor with lenis + header offset 95
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -95, duration: 1.1 })
    }
    document.addEventListener('click', handler)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      io.disconnect()
      document.removeEventListener('click', handler)
    }
  }, [])

  return (
    <div id="top" className="min-h-screen bg-light">
      <Header />
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
      <Footer />
      <NoticeBanner />
    </div>
  )
}

export default App