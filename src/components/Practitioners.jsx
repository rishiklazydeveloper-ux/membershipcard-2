function Practitioners() {
  return (
    <section id="contact" style={{ background: '#ffffff', padding: '80px 40px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: '60px', alignItems: 'start' }}>
        {/* Left - Text */}
        <div style={{ paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: 1 }}>✳</span>
            <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Contact</span>
          </div>
          <div style={{ color: '#0e2328', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Talk to our<br />membership team
          </div>
          <div style={{ color: '#6b7d82', fontSize: '15px', lineHeight: 1.6, marginTop: '14px', maxWidth: '420px' }}>
            Feel free to reach out for membership details, venue access or any questions you may have regarding your ₹5,00,000 tap & pay card.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>✉</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500 }}>support@vitamembership.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>◉</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500 }}>123 Premium Enclave, New Delhi, India 110001</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>☎</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500 }}>+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Right - Form sharp edge */}
        <div style={{ background: '#f3f5f5', border: '1px solid #eef2f3', padding: '28px', borderRadius: '6px' }}>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
              <input type="text" placeholder="Enter Your Full Name" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
              <input type="email" placeholder="Enter Your Email Address" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
              <input type="tel" placeholder="Enter Your Phone Number" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Message</label>
              <textarea placeholder="Write Your Message Here" rows={4} style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0e2328', color: '#ffffff', fontSize: '13px', fontWeight: 600, padding: '12px 22px', borderRadius: '9999px', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
              Send Message <span>→</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}

export default Practitioners
