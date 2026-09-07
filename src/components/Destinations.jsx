import image1 from '../assets/image1.png'
import image2 from '../assets/image2.PNG'
import image3 from '../assets/image3.PNG'
import image4 from '../assets/image4.PNG'
import image5 from '../assets/image5].PNG'
import image6 from '../assets/image6.PNG'
import image7 from '../assets/image7.PNG'
import image8 from '../assets/image8.PNG'
import image9 from '../assets/image9.PNG'
import image10 from '../assets/image10.PNG'

const GALLERY = [
  { src: image1, tall: true },
  { src: image2, tall: false },
  { src: image3, tall: false },
  { src: image4, tall: true },
  { src: image5, tall: false },
  { src: image6, tall: true },
  { src: image7, tall: false },
  { src: image8, tall: false },
  { src: image9, tall: true },
  { src: image10, tall: false },
]

function Destinations() {
  return (
    <section id="gallery" style={{ background: '#ffffff', padding: '80px 0 80px', overflow: 'hidden', maxWidth: '100%' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', boxSizing: 'border-box' }}>
        {/* Head */}
        <div className="dest-head" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
            <span style={{ color: '#8a9ba0', fontSize: '14px' }}>✳</span>
            <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Destinations</span>
          </div>
          <div>
            <div style={{ color: '#0e2328', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              A gallery of <br />
              unforgettable moments
            </div>
            <div style={{ color: '#6b7d82', fontSize: '14px', lineHeight: 1.6, marginTop: '12px', maxWidth: '480px' }}>
              From serene villas to thrilling parks — all 10 signature experiences captured in one eye-catching collection.
            </div>
          </div>
        </div>
      </div>

      {/* Modern bento gallery */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <style>{`
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 220px;
            gap: 16px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) {
            .gallery-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; }
          }
          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            background: #f3f6f7;
            border: 1px solid #eef2f3;
            box-shadow: 0 8px 28px rgba(14,35,40,0.08);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }
          .gallery-item:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 16px 40px rgba(14,35,40,0.14);
          }
          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s ease;
          }
          .gallery-item:hover img { transform: scale(1.07); }
          .gallery-item::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 55%, rgba(14,35,40,0.45) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
          }
          .gallery-item:hover::after { opacity: 1; }
          .span-2x2 { grid-column: span 2; grid-row: span 2; }
          .span-2 { grid-column: span 2; }
          .span-row2 { grid-row: span 2; }
          @media (max-width: 900px) {
            .dest-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
          @media (max-width: 768px) {
            #gallery { padding: 32px 0 32px !important; }
            #gallery > div { padding: 0 16px !important; }
            .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; gap: 12px !important; }
            .gallery-item { border-radius: 14px !important; }
          }
          @media (max-width: 480px) {
            .gallery-grid { grid-template-columns: 1fr !important; grid-auto-rows: 220px !important; }
            .span-2x2, .span-2, .span-row2 { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
        `}</style>
        <div className="gallery-grid">
          <div className="gallery-item span-2x2"><img src={GALLERY[0].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[1].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[2].src} loading="lazy" alt="" /></div>
          <div className="gallery-item span-2"><img src={GALLERY[3].src} loading="lazy" alt="" /></div>
          <div className="gallery-item span-row2"><img src={GALLERY[4].src} loading="lazy" alt="" /></div>
          <div className="gallery-item span-2"><img src={GALLERY[5].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[6].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[7].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[8].src} loading="lazy" alt="" /></div>
          <div className="gallery-item"><img src={GALLERY[9].src} loading="lazy" alt="" /></div>
        </div>
      </div>
    </section>
  )
}

export default Destinations