import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID
const keySecret = process.env.RAZORPAY_KEY_SECRET

if (!keyId || !keySecret) {
  console.warn('Razorpay keys missing in .env')
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
})

// Create order - only for career ₹999
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body
    // Fixed amount 99900 paise for career, but allow passed amount with validation
    const finalAmount = 99900
    if (finalAmount < 100) return res.status(400).json({ error: 'Amount must be >= 100 paise' })

    const options = {
      amount: finalAmount,
      currency: 'INR',
      receipt: `career_${Date.now()}`,
    }
    const order = await razorpay.orders.create(options)
    res.json({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: keyId })
  } catch (err) {
    console.error('Create order error:', err)
    const status = err.statusCode === 401 ? 401 : 500
    res.status(status).json({ error: err.error?.description || err.message || 'Failed to create order' })
  }
})

// Verify payment signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing fields' })
    }
    const expected = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expected === razorpay_signature) {
      return res.json({ success: true, message: 'Payment verified' })
    } else {
      return res.status(400).json({ success: false, error: 'Signature mismatch' })
    }
  } catch (err) {
    console.error('Verify error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Razorpay server running on http://localhost:${PORT}`))
