import { useState } from 'react'
import { STATISTICS } from '../data/content'
import { supabase } from '../lib/supabase'

function Statistics() {
  const [active, setActive] = useState(null)
  const [form, setForm] = useState({ name: '', mobile: '', email: '', address: '', image: null })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [token, setToken] = useState(null)

  const onChange = (e) => {
    const { name, value, files } = e.target
    setForm((p) => ({ ...p, [name]: files ? files[0] : value }))
  }

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true)
      const s = document.createElement('script')
      s.src = 'https://checkout.razorpay.com/v1/checkout.js'
      s.onload = () => resolve(true)
      s.onerror = () => reject(new Error('Failed to load Razorpay'))
      document.body.appendChild(s)
    })

  const handlePay = async (e) => {
    e.preventDefault()
    if (!form.name || !form.mobile || !form.email || !form.address || !form.image) {
      setStatus({ type: 'error', msg: 'Please fill all fields and upload your image.' })
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      // Try backend order, fallback to mock
      let orderData
      try {
        const res = await fetch('/api/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 1100000 }) })
        const txt = await res.text()
        orderData = JSON.parse(txt)
        if (!res.ok) throw new Error('order failed')
      } catch {
        orderData = { amount: 1100000, currency: 'INR', order_id: null, key_id: import.meta.env.VITE_RAZORPAY_KEY_ID }
      }
      await loadRazorpay()
      const keyId = orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID
      if (!keyId) throw new Error('Razorpay Key missing')

      const newToken = 'UR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()

      await new Promise((resolve, reject) => {
        const opts = {
          key: keyId,
          amount: orderData.amount || 1100000,
          currency: orderData.currency || 'INR',
          ...(orderData.order_id ? { order_id: orderData.order_id } : {}),
          name: 'Universal Realty Farm & Resort (OPC) Pvt. Ltd.',
          description: `${active?.title} — ₹11,000 Tap Membership`,
          prefill: { name: form.name, email: form.email, contact: form.mobile },
          theme: { color: '#0e2328' },
          handler: async function (resp) {
            try {
              setToken(newToken)
              setStatus({ type: 'success', msg: `Payment successful! Saving... Token: ${newToken}` })
              // Upload image to retreat-images
              let imageUrl = null
              let imageName = form.image?.name || null
              if (form.image) {
                const fileName = `${Date.now()}_${imageName.replace(/\s/g, '_')}`
                const { error: upErr } = await supabase.storage.from('retreat-images').upload(fileName, form.image)
                if (upErr) throw upErr
                imageUrl = fileName
              }
              // Insert to DB
              const { error: dbErr } = await supabase.from('retreat_payments').insert({
                retreat_type: active.title,
                name: form.name,
                mobile: form.mobile,
                email: form.email,
                address: form.address,
                image_url: imageUrl,
                image_name: imageName,
                amount: 11000,
                razorpay_order_id: resp.razorpay_order_id || orderData.order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                token: newToken,
                status: 'paid',
              })
              if (dbErr) throw dbErr
              // Send Resend email with token
              try {
                const emailRes = await fetch('/api/send-retreat-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: form.email, name: form.name, token: newToken, retreat_type: active.title }),
                })
                const emailData = await emailRes.json().catch(() => ({}))
                if (emailData.warning) {
                  setStatus({ type: 'success', msg: `Payment of ₹11,000 successful! Token: ${newToken} — ${emailData.warning}` })
                } else if (!emailRes.ok) {
                  throw new Error(emailData.error || 'Email failed')
                } else {
                  setStatus({ type: 'success', msg: `Payment of ₹11,000 successful! Token: ${newToken} — confirmation mail sent to ${form.email}` })
                }
              } catch (e) { console.warn('Resend email failed', e); setStatus({ type: 'success', msg: `Payment of ₹11,000 successful! Token: ${newToken} — saved to DB. Email will arrive after you verify domain in Resend.` }) }
              resolve()
            } catch (err) {
              setStatus({ type: 'error', msg: err.message })
              reject(err)
            }
          },
          modal: {
            ondismiss: () => {
              setStatus({ type: 'error', msg: 'Payment cancelled' })
              reject(new Error('Payment cancelled'))
            },
          },
        }
        const rzp = new window.Razorpay(opts)
        rzp.on('payment.failed', (r) => {
          setStatus({ type: 'error', msg: r.error?.description || 'Payment failed' })
          reject(new Error('Payment failed'))
        })
        rzp.open()
      })
    } catch (err) {
      if (!String(err.message).includes('cancelled')) setStatus({ type: 'error', msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="retreats" style={{ background: '#ffffff', margin: 0, padding: 0 }}>
      <style>{`@media (max-width: 768px) { #retreats .retreats-head { grid-template-columns: 1fr !important; gap: 16px !important; padding: 40px 20px 32px !important; } #retreats .retreats-grid { grid-template-columns: 1fr !important; } #retreats .retreats-grid > div { border-left: none !important; border-top: 1px solid #dde3e5; } #retreats .retreats-grid > div:first-child { border-top: none; } #retreats .retreats-grid img { height: 320px !important; } }`}</style>
      <div className="retreats-head" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', padding: '80px 40px 70px', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
          <span style={{ color: '#8a9ba0', fontSize: '14px', lineHeight: '20px' }}>✳</span>
          <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Retreats</span>
        </div>
        <div style={{ color: '#0e2328', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          We operate from Nagpur only<br />
          Curated retreats around Nagpur
        </div>
      </div>

      <div className="retreats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #dde3e5', borderBottom: '1px solid #dde3e5', background: '#ffffff' }}>
        {STATISTICS.map((stat, i) => (
          <div key={stat.title} style={{ padding: '28px', borderLeft: i > 0 ? '1px solid #dde3e5' : 'none', display: 'flex', flexDirection: 'column', background: '#ffffff', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#0e2328', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' }}>{stat.title}</div>
              <div style={{ color: '#6b7d82', fontSize: '11px', fontWeight: 600, background: '#f8fafa', border: '1px solid #eef2f3', padding: '4px 8px', borderRadius: '9999px' }}>Nagpur</div>
            </div>
            <div style={{ color: '#5a6d73', fontSize: '12px', fontWeight: 500, lineHeight: 1.4 }}>{stat.subtitle}</div>
            <div style={{ flex: 1 }}>
              <img src={stat.image} loading="lazy" alt="" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block', border: '1px solid #eef2f3', borderRadius: '12px' }} />
            </div>
            <div style={{ color: '#6b7d82', fontSize: '11px', fontWeight: 500, textAlign: 'center' }}>{stat.detail} — Nagpur • Tap to explore</div>
            <button onClick={() => { setActive(stat); setForm({ name: '', mobile: '', email: '', address: '', image: null }); setStatus(null); setToken(null) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0e2328', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '12px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              Pay Now — ₹11,000
            </button>
          </div>
        ))}
      </div>
      <div style={{ height: '1px', background: '#dde3e5', width: '100%' }} />

      {active && (
        <div onClick={() => setActive(null)} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(14,35,40,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 60px rgba(14,35,40,0.18)', position: 'relative' }}>
            <button onClick={() => setActive(null)} style={{ position: 'absolute', top: '14px', right: '14px', width: '28px', height: '28px', border: '1px solid #dde3e5', background: '#f3f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '8px', fontSize: '14px' }}>✕</button>
            <div style={{ color: '#0e2328', fontSize: '18px', fontWeight: 700, lineHeight: 1.2 }}>Pay for {active.title}</div>
            <div style={{ color: '#6b7d82', fontSize: '12px', marginTop: '4px' }}>Universal Realty • {active.subtitle} • Nagpur • ₹11,000 • 365 days</div>

            <form onSubmit={handlePay} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '18px' }}>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Name *</label>
                <input name="name" value={form.name} onChange={onChange} required placeholder="Enter name" style={{ width: '100%', background: '#fff', border: '1.5px solid #0e2328', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Mobile Number *</label>
                <input name="mobile" value={form.mobile} onChange={onChange} required type="tel" placeholder="9876543210" style={{ width: '100%', background: '#fff', border: '1.5px solid #0e2328', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Email Address *</label>
                <input name="email" value={form.email} onChange={onChange} required type="email" placeholder="you@example.com" style={{ width: '100%', background: '#fff', border: '1.5px solid #0e2328', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Your Image *</label>
                <input name="image" onChange={onChange} required type="file" accept="image/*" style={{ width: '100%', background: '#fff', border: '1.5px solid #0e2328', borderRadius: '6px', padding: '9px 10px', fontSize: '12px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Address *</label>
                <textarea name="address" value={form.address} onChange={onChange} required rows={2} placeholder="House, street, Nagpur, Maharashtra" style={{ width: '100%', background: '#fff', border: '1.5px solid #0e2328', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ gridColumn: 'span 2', background: '#f8fafa', border: '1px solid #eef2f3', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div style={{ fontSize: '11px', color: '#6b7d82', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{active.title}</div><div style={{ fontSize: '12px', color: '#0e2328', fontWeight: 600 }}>{active.subtitle}</div></div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0e2328' }}>₹11,000</div>
              </div>

              {status && <div style={{ gridColumn: 'span 2', fontSize: '12px', padding: '10px 12px', borderRadius: '8px', background: status.type === 'success' ? '#e6f4ea' : '#fde8e8', color: status.type === 'success' ? '#137333' : '#a50e0e', border: `1px solid ${status.type === 'success' ? '#b7e1c3' : '#f5c2c2'}` }}>{status.msg} {token && <><br/><strong>Token: {token}</strong></>}</div>}

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={loading} style={{ flex: 1, background: '#0e2328', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '12px', borderRadius: '9999px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Processing...' : 'Proceed to Pay ₹11,000 →'}</button>
                <button type="button" onClick={() => setActive(null)} style={{ background: '#f3f5f5', border: '1px solid #dde3e5', color: '#0e2328', fontSize: '13px', fontWeight: 600, padding: '12px 18px', borderRadius: '9999px', cursor: 'pointer' }}>Cancel</button>
              </div>
              <div style={{ gridColumn: 'span 2', fontSize: '10px', color: '#8a9ba0', textAlign: 'center', lineHeight: 1.5 }}>On payment success, your data + token are saved to Supabase and a confirmation email with token is sent via Resend to your email.</div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Statistics
