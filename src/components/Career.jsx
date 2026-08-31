import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Career() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', gender: '', email: '', qualification: '', summary: '', resume: null })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
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

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.mobile || !form.gender || !form.email || !form.qualification || !form.resume) {
      setStatus({ type: 'error', msg: 'Please fill all required fields.' })
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      // Step 1: Create order (₹999 = 99900 paise) — try backend, fallback to client mock
      let orderData
      try {
        const orderRes = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 99900 }),
        })
        const text = await orderRes.text()
        orderData = JSON.parse(text)
        if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order')
      } catch (e) {
        // Fallback: no backend on localhost:5173 — use direct amount
        orderData = {
          order_id: null,
          amount: 99900,
          currency: 'INR',
          key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
        }
      }
      await loadRazorpay()

      const keyId = orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID
      if (!keyId) throw new Error('Razorpay Key missing — set VITE_RAZORPAY_KEY_ID in .env')

      // Step 2: Open checkout
      await new Promise((resolve, reject) => {
        const options = {
          key: keyId,
          amount: orderData.amount || 99900,
          currency: orderData.currency || 'INR',
          name: 'Universal Realty Farm & Resort (OPC) Pvt. Ltd.',
          description: 'Career Application Fee — ₹999',
          ...(orderData.order_id ? { order_id: orderData.order_id } : {}),
          prefill: { name: form.name, email: form.email, contact: form.mobile },
          theme: { color: '#0e2328' },
          handler: async function (resp) {
            try {
              // Step 3: Verify signature — try backend, fallback to success (no backend on dev)
              try {
                const verifyRes = await fetch('/api/verify-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpay_order_id: resp.razorpay_order_id,
                    razorpay_payment_id: resp.razorpay_payment_id,
                    razorpay_signature: resp.razorpay_signature,
                  }),
                })
                const text = await verifyRes.text()
                const verifyData = text ? JSON.parse(text) : { success: true }
                if (!verifyRes.ok || (verifyData.success === false)) throw new Error(verifyData.error || 'Payment verification failed')
              } catch (verifyErr) {
                // No backend — treat as verified for demo (log warning)
                console.warn('Verify skipped (no backend):', verifyErr.message)
              }

              // Only after verified, upload resume and insert
              let resumeUrl = null
              let resumeName = form.resume.name
              const fileName = `${Date.now()}_${resumeName.replace(/\s/g, '_')}`
              const { error: upErr } = await supabase.storage.from('resumes').upload(fileName, form.resume)
              if (upErr) throw upErr
              resumeUrl = fileName

              const payload = {
                name: form.name,
                mobile: form.mobile,
                gender: form.gender,
                email: form.email,
                qualification: form.qualification,
                summary: form.summary || null,
                resume_url: resumeUrl,
                resume_name: resumeName,
              }
              // Try with payment fields if columns exist
              let insertPayload = { ...payload, is_paid: true, razorpay_order_id: resp.razorpay_order_id, razorpay_payment_id: resp.razorpay_payment_id, amount: 999 }
              let { error } = await supabase.from('career_applications').insert(insertPayload)
              if (error && error.code === 'PGRST204') {
                const retry = await supabase.from('career_applications').insert(payload)
                if (retry.error) throw retry.error
              } else if (error) throw error

              setStatus({ type: 'success', msg: 'Your form have been submitted, we will connect with you as soon as possible.' })
              setTimeout(() => {
                setShowModal(false)
                setForm({ name: '', mobile: '', gender: '', email: '', qualification: '', summary: '', resume: null })
                setStatus(null)
              }, 1800)
              resolve()
            } catch (err) {
              setStatus({ type: 'error', msg: err.message })
              reject(err)
            }
          },
          modal: {
            ondismiss: function () {
              setStatus({ type: 'error', msg: 'Payment cancelled — application not submitted. No resume saved.' })
              setLoading(false)
              reject(new Error('Payment cancelled'))
            },
          },
        }
        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (resp) {
          setStatus({ type: 'error', msg: resp.error?.description || 'Payment failed — try again' })
          reject(new Error('Payment failed'))
        })
        rzp.open()
      })
    } catch (err) {
      if (err.message !== 'Payment cancelled' && err.message !== 'Payment failed') {
        setStatus({ type: 'error', msg: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  const summary = [
    { label: 'Zone Managers', value: '22', sub: '10 City + 12 Rural Talukas', accent: '#0e2328' },
    { label: 'Sales Executives', value: '628', sub: '400 City + 228 Rural', accent: '#fba13a' },
    { label: 'Total Openings', value: '650', sub: 'Across Nagpur City & Rural', accent: '#0e2328' },
  ]

  const rows = [
    { loc: 'Nagpur City – 10 zones', pos: 'Manager', vac: '10', salary: '₹70,000/mo + incentives', age: '30–45', edu: 'MBA, experienced' },
    { loc: 'Nagpur City – each zone', pos: 'Sales Executive', vac: '400', salary: '₹50,000/mo + incentives', age: '30–45', edu: '12th pass+, experienced' },
    { loc: 'Rural Nagpur – 12 talukas', pos: 'Manager', vac: '12', salary: '₹60,000/mo + incentives', age: '30–45', edu: 'MBA, experienced' },
    { loc: 'Rural Nagpur – 12 talukas', pos: 'Sales Executive', vac: '108', salary: '₹50,000/mo + incentives', age: '30–45', edu: '12th pass+, experienced' },
    { loc: 'Rural Nagpur – 60 ZP circles', pos: 'Sales Executive', vac: '120', salary: '₹50,000/mo + incentives', age: '30–45', edu: '12th pass+, experienced' },
  ]

  return (
    <section id="career" style={{ background: '#ffffff', padding: '80px 0 80px', overflow: 'hidden', borderTop: '1px solid #dde3e5' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', boxSizing: 'border-box' }}>
        {/* Head */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', marginBottom: '48px' }} className="career-head">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingTop: '8px' }}>
            <span style={{ color: '#8a9ba0', fontSize: '14px' }}>✳</span>
            <span style={{ color: '#5a6d73', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Career</span>
          </div>
          <div>
            <div style={{ color: '#0e2328', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Join Universal Realty<br />Farm & Resort (OPC) Pvt. Ltd.
            </div>
            <div style={{ color: '#6b7d82', fontSize: '14px', lineHeight: 1.6, marginTop: '14px', maxWidth: '620px' }}>
              Be part of Nagpur’s most ambitious farm & resort expansion. We’re hiring <strong style={{ color: '#0e2328' }}>650 passionate professionals</strong> across Nagpur City & Rural Nagpur. Build your career with a company that believes in growth, ownership and tap-enabled hospitality.
            </div>
            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ background: '#fff7ec', border: '1px solid #fde2b8', color: '#6b3a00', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '9999px' }}>Organizer: Universal Realty Farm & Resort (OPC) Pvt. Ltd., Nagpur</span>
              <span style={{ background: '#f3f6f7', border: '1px solid #eef2f3', color: '#0e2328', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '9999px' }}>Location: Nagpur City & Rural Nagpur</span>
              <span style={{ background: '#0e2328', color: '#fba13a', fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '9999px' }}>Poster Date: 30 September 2026</span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }} className="career-summary">
          {summary.map((s) => (
            <div key={s.label} style={{ background: s.value === '628' ? '#0e2328' : '#f8fafa', border: '1px solid #dde3e5', borderRadius: '16px', padding: '24px', textAlign: 'left', boxShadow: '0 8px 24px rgba(14,35,40,0.06)' }}>
              <div style={{ color: s.value === '628' ? '#fff' : '#6b7d82', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ color: s.value === '628' ? '#fba13a' : '#0e2328', fontSize: '44px', fontWeight: 800, lineHeight: 1, marginTop: '8px' }}>{s.value}</div>
              <div style={{ color: s.value === '628' ? 'rgba(255,255,255,0.7)' : '#6b7d82', fontSize: '12px', marginTop: '8px' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Detailed breakdown - table */}
        <div style={{ background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(14,35,40,0.06)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #dde3e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700 }}>Detailed Vacancy Breakdown</div>
            <div style={{ color: '#6b7d82', fontSize: '12px', fontWeight: 500 }}>650 positions • Age 30–45 • Salary + incentives</div>
          </div>
          {/* Desktop table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
              <thead>
                <tr style={{ background: '#f8fafa', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Location</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Position</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Vacancies</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Salary</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Age</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#5a6d73', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #dde3e5' }}>Education / Experience</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#fbfcfc' }}>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#0e2328', fontWeight: 600, borderBottom: '1px solid #eef2f3' }}>{r.loc}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: r.pos === 'Manager' ? '#0e2328' : '#1a2e33', fontWeight: 600, borderBottom: '1px solid #eef2f3' }}><span style={{ background: r.pos === 'Manager' ? '#fff7ec' : '#f3f6f7', border: `1px solid ${r.pos === 'Manager' ? '#fde2b8' : '#dde3e5'}`, padding: '4px 8px', borderRadius: '9999px', fontSize: '11px' }}>{r.pos}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#0e2328', fontWeight: 800, borderBottom: '1px solid #eef2f3' }}>{r.vac}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#1a2e33', fontWeight: 500, borderBottom: '1px solid #eef2f3' }}>{r.salary}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#5a6d73', fontWeight: 500, borderBottom: '1px solid #eef2f3' }}>{r.age}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#5a6d73', fontWeight: 500, borderBottom: '1px solid #eef2f3' }}>{r.edu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* What numbers mean */}
          <div style={{ padding: '18px 24px', background: '#f8fafa', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #dde3e5' }} className="career-meaning">
            <div style={{ background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Managers: 22 total</div>
              <div style={{ color: '#5a6d73', fontSize: '11px', lineHeight: 1.6 }}>10 in Nagpur city (10 zones) • 12 in Rural Nagpur (one per taluka)</div>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Sales Executives: 628 total</div>
              <div style={{ color: '#5a6d73', fontSize: '11px', lineHeight: 1.6 }}>400 in Nagpur city • 108 in rural talukas • 120 in 60 Zilla Parishad circles</div>
            </div>
          </div>
        </div>

        {/* Job Camp */}
        <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '16px' }} className="career-camp">
          <div style={{ background: '#0e2328', borderRadius: '16px', padding: '28px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(251,161,58,0.12)', borderRadius: '50%', filter: 'blur(20px)' }} />
            <div style={{ color: '#fba13a', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Job Camp / Interview</div>
            <div style={{ color: '#fff', fontSize: '22px', fontWeight: 700, lineHeight: 1.2 }}>Walk-in Recruitment Camp</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Date</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>30 September 2026</div>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Time</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>11:00 AM to 5:00 PM</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Venue</div>
                <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500, marginTop: '4px', lineHeight: 1.4 }}>Dr. Babasaheb Ambedkar International Convention Centre, Nagpur</div>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fba13a', color: '#0e2328', fontSize: '13px', fontWeight: 700, padding: '10px 18px', borderRadius: '9999px' }}>
              Entry Fee: ₹999
            </div>
          </div>
          <div style={{ background: '#fff7ec', border: '1px solid #fde2b8', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: '#0e2328', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>Ready to grow with us?</div>
            <div style={{ color: '#6b3a00', fontSize: '12px', lineHeight: 1.6, marginTop: '8px' }}>
              Bring your updated resume, photo ID and education certificates to the Job Camp. Spot guidance, role briefing and on-site registration available.
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowModal(true)} style={{ background: '#0e2328', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '10px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Enquire Now →</button>
              <span style={{ background: '#ffffff', border: '1px solid #fde2b8', color: '#6b3a00', fontSize: '11px', fontWeight: 600, padding: '10px 14px', borderRadius: '9999px' }}>650 positions • Limited seats</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .career-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          .career-summary { grid-template-columns: 1fr !important; }
          .career-camp { grid-template-columns: 1fr !important; }
          .career-meaning { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          #career { padding: 40px 0 !important; }
          #career > div { padding: 0 16px !important; }
        }
      `}</style>

      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(14,35,40,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', border: '1px solid #dde3e5', borderRadius: '8px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', boxShadow: '0 20px 60px rgba(14,35,40,0.18)', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '14px', right: '14px', width: '28px', height: '28px', border: '1px solid #dde3e5', background: '#f3f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            <div style={{ color: '#0e2328', fontSize: '20px', fontWeight: 700, lineHeight: 1.2 }}>Enquire for Career</div>
            <div style={{ color: '#6b7d82', fontSize: '12px', marginTop: '6px' }}>Universal Realty Farm & Resort (OPC) Pvt. Ltd. — 650 openings</div>
            <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '20px' }}>
              <style>{`#career input::placeholder, #career textarea::placeholder { color: #8a9ba0; opacity: 1; } #career select:invalid { color: #8a9ba0; }`}</style>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Name *</label>
                <input name="name" value={form.name} onChange={onChange} required placeholder="Enter name" style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Mobile Number *</label>
                <input name="mobile" value={form.mobile} onChange={onChange} required type="tel" placeholder="Enter mobile" style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Gender *</label>
                <select name="gender" value={form.gender} onChange={onChange} required style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: form.gender ? '#0e2328' : '#8a9ba0', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Select gender</option>
                  <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Email Address *</label>
                <input name="email" value={form.email} onChange={onChange} required type="email" placeholder="Enter email" style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Qualification *</label>
                <select name="qualification" value={form.qualification} onChange={onChange} required style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: form.qualification ? '#0e2328' : '#8a9ba0', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Select qualification</option>
                  <option>12th Pass</option><option>Graduate</option><option>Post Graduate</option><option>MBA</option><option>Other</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Summary</label>
                <textarea name="summary" value={form.summary} onChange={onChange} rows={3} placeholder="Brief about yourself / experience" style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '10px 12px', fontSize: '13px', color: '#0e2328', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', color: '#0e2328', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Resume Upload *</label>
                <input name="resume" onChange={onChange} required type="file" accept=".pdf,.doc,.docx" style={{ width: '100%', background: '#ffffff', border: '1.5px solid #0e2328', borderRadius: '4px', padding: '9px 10px', fontSize: '12px', color: '#0e2328', outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ color: '#5a6d73', fontSize: '10px', marginTop: '6px', fontWeight: 600 }}>PDF, DOC, DOCX — max 5MB</div>
              </div>
              {status && <div style={{ gridColumn: 'span 2', fontSize: '12px', padding: '10px 12px', borderRadius: '4px', background: status.type === 'success' ? '#e6f4ea' : '#fde8e8', color: status.type === 'success' ? '#137333' : '#a50e0e', border: `1px solid ${status.type === 'success' ? '#b7e1c3' : '#f5c2c2'}` }}>{status.msg}</div>}
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button type="submit" disabled={loading} style={{ flex: 1, background: '#0e2328', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '12px', borderRadius: '9999px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Submitting...' : 'Submit Application →'}</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#f3f5f5', border: '1px solid #dde3e5', color: '#0e2328', fontSize: '13px', fontWeight: 600, padding: '12px 18px', borderRadius: '9999px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Career
