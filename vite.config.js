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
          server.middlewares.use(async (req, res, next) => {
            if (req.url.startsWith('/api/create-order')) {
              try {
                const order = await razorpay.orders.create({
                  amount: 99900,
                  currency: 'INR',
                  receipt: 'career_' + Date.now(),
                })
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: env.VITE_RAZORPAY_KEY_ID }))
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message }))
              }
              return
            }
            if (req.url.startsWith('/api/verify-payment')) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
              return
            }
            next()
          })
        },
      },
    ],
  }
})
