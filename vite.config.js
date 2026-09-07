import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Razorpay from 'razorpay'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const razorpay = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID || env.VITE_RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  })

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'mock-razorpay',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url.startsWith('/api/create-order')) {
              let body = ''
              req.on('data', (c) => (body += c))
              req.on('end', async () => {
                try {
                  const parsed = body ? JSON.parse(body) : {}
                  const amount = parsed.amount ? Number(parsed.amount) : 99900
                  const isRetreat = amount === 1100000
                  const order = await razorpay.orders.create({
                    amount,
                    currency: 'INR',
                    receipt: (isRetreat ? 'retreat_' : 'career_') + Date.now(),
                  })
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: env.VITE_RAZORPAY_KEY_ID }))
                } catch (err) {
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: err.message }))
                }
              })
              return
            }
            if (req.url.startsWith('/api/verify-payment')) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
              return
            }
            if (req.url.startsWith('/api/send-retreat-email')) {
              let body = ''
              req.on('data', (c) => (body += c))
              req.on('end', async () => {
                try {
                  const { email, name, token, retreat_type } = JSON.parse(body || '{}')
                  if (!email || !token) throw new Error('Missing email/token')
                  const send = async (to, from) => {
                    const r = await fetch('https://api.resend.com/emails', {
                      method: 'POST',
                      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        from,
                        to,
                        subject: `Payment Confirmed — Token ${token} | ${retreat_type}`,
                        html: `<div style="font-family:Inter, sans-serif; max-width:600px; margin:0 auto; padding:24px; border:1px solid #eef2f3; border-radius:12px"><h2 style="color:#0e2328; margin:0 0 8px">Payment Confirmed — ₹11,000</h2><p style="color:#1a2e33; line-height:1.6">Hi ${name || 'there'},<br/>Your payment for <strong>${retreat_type}</strong> at <strong>Universal Realty Farm & Resort (OPC) Pvt. Ltd., Nagpur</strong> is confirmed.</p><div style="background:#f8fafa; border:1px solid #dde3e5; border-radius:10px; padding:16px; margin:16px 0; text-align:center"><div style="font-size:11px; color:#6b7d82; letter-spacing:0.06em; text-transform:uppercase">Your Token Number</div><div style="font-size:28px; font-weight:800; color:#0e2328; letter-spacing:0.04em; margin-top:6px">${token}</div><div style="font-size:11px; color:#8a9ba0; margin-top:6px">Registered email: ${email}</div></div><p style="font-size:12px; color:#6b7d82">Keep this token for entry. Just tap your card at the venue. Valid for 365 days.</p><p style="font-size:11px; color:#8a9ba0; margin-top:16px">Questions? info@universalrealtyfarmandresort.com | +91 98765 43210</p></div>`,
                      }),
                    })
                    const d = await r.json()
                    return { ok: r.ok, data: d, status: r.status }
                  }
                  // Use verified domain jaihouniversal.com — now can send to ANY recipient
                  let result = await send([email], 'Universal Realty <noreply@jaihouniversal.com>')
                  if (!result.ok && result.data?.message?.includes('domain')) {
                    result = await send([email], 'Universal Realty <onboarding@resend.dev>')
                  }
                  if (!result.ok) throw new Error(result.data.message || 'Resend failed')
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true, id: result.data.id }))
                } catch (err) {
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: err.message }))
                }
              })
              return
            }
            next()
          })
        },
      },
    ],
  }
})
