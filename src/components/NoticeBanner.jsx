import { useState } from 'react'
import { ArrowIcon } from './Icons'

function NoticeBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d2e37] border-t border-white/10 px-6 md:px-12 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-sm text-white/60 leading-relaxed">
          By clicking &ldquo;Accept&rdquo;, you agree to the storing of cookies on your device to enhance site navigation, analyze site{' '}
          <br className="hidden md:block" />
          usage, and assist in our marketing efforts. View our{' '}
          <a href="#privacy" className="text-white underline">
            Privacy Policy
          </a>{' '}
          for more information.
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setVisible(false)}
            className="inline-flex items-center gap-3 border border-white/30 text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Decline
            <ArrowIcon className="w-2 h-2" fill="white" />
          </button>
          <button
            onClick={() => setVisible(false)}
            className="inline-flex items-center gap-3 bg-[#071418] text-[#fba13a] text-sm font-medium px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Accept
            <ArrowIcon className="w-2 h-2" fill="#0D2E37" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoticeBanner