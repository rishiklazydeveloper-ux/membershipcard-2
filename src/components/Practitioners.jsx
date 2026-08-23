import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Practitioners() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone || !form.message) {
      setStatus({ type: 'error', msg: 'Please fill all fields.' })
      return
    }
    setLoading(true)
    setStatus(null)
    const { error } = await supabase.from('contact_messages').insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      message: form.message,
    })
    setLoading(false)
    if (error) {
      setStatus({ type: 'error', msg: error.message })
    } else {
      setStatus({ type: 'success', msg: 'Message sent! We will contact you soon.' })
      setForm({ fullName: '', email: '', phone: '', message: '' })
    }
  }

  return (
    <section id="contact" style={{ background: '#ffffff', padding: '80px 40px 80px' }}>
      <div className="contact-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: '60px', alignItems: 'center' }}>
        <div style={{ paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: 1 }}>✳</span>
            <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Contact</span>
          </div>
          <div style={{ color: '#0e2328', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Talk to our<br />membership team
          </div>
          <div style={{ color: '#6b7d82', fontSize: '15px', lineHeight: 1.6, marginTop: '14px', maxWidth: '420px' }}>
            Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd. — reach out for membership details, farm &amp; resort access or any questions about your ₹51,000 tap &amp; pay card.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>✉</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500, wordBreak: 'break-all', overflowWrap: 'anywhere' }}>info@universalrealtyfarmandresort.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>◉</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500 }}>Universal Realty Farm &amp; Resort (OPC) Pvt. Ltd., New Delhi, India</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '32px', background: '#f3f5f5', border: '1px solid #eef2f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>☎</span>
              <span style={{ color: '#0e2328', fontSize: '14px', fontWeight: 500 }}>+91 98765 43210</span>
            </div>
          </div>
        </div>
        <div style={{ background: '#f3f5f5', border: '1px solid #eef2f3', padding: '28px', borderRadius: '6px', width: '100%', maxWidth: '480px', justifySelf: 'center', boxSizing: 'border-box' }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
              <input name="fullName" value={form.fullName} onChange={onChange} required type="text" placeholder="Enter Your Full Name" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
              <input name="email" value={form.email} onChange={onChange} required type="email" placeholder="Enter Your Email Address" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={onChange} required type="tel" placeholder="Enter Your Phone Number" style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#0e2328', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Message</label>
              <textarea name="message" value={form.message} onChange={onChange} required placeholder="Write Your Message Here" rows={4} style={{ width: '100%', background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '4px', padding: '12px 14px', fontSize: '14px', color: '#0e2328', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            {status && <div style={{ fontSize: '12px', padding: '10px 12px', borderRadius: '4px', background: status.type === 'success' ? '#e6f4ea' : '#fde8e8', color: status.type === 'success' ? '#137333' : '#a50e0e', border: `1px solid ${status.type === 'success' ? '#b7e1c3' : '#f5c2c2'}` }}>{status.msg}</div>}
            <button type="submit" disabled={loading} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0e2328', color: '#ffffff', fontSize: '13px', fontWeight: 600, padding: '12px 22px', borderRadius: '9999px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
              {loading ? 'Sending...' : 'Send Message'} <span>→</span>
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #contact { padding: 40px 20px !important; }
          #contact .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; justify-items: center !important; text-align: left; }
          #contact .contact-grid > div:first-child { width: 100%; max-width: 480px; }
          #contact .contact-grid > div:last-child { width: 100%; max-width: 480px; }
        }
        @media (max-width: 480px) {
          #contact { padding: 32px 16px !important; }
        }
      `}</style>
    </section>
  )
}

export default Practitioners
