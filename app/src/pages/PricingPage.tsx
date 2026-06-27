import { useState } from 'react'
import { Check, Crown, Building2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    name: 'Cadet', price: '699', period: '/month', description: 'For individual UPSC aspirants',
    features: ['Full Knowledge Library access', 'Vriksh AI queries (50/month)', 'Desk Simulator', 'Email support'],
    cta: 'Start Free Trial', highlight: false,
  },
  {
    name: 'Enterprise', price: '12,500', period: '/month', description: 'For corporate ESG teams',
    features: ['Everything in Cadet', 'ESG Command Center (5 modules)', 'Environmental Clearance Suite', 'Priority Vriksh AI (500 queries)', 'API access', 'Dedicated account manager'],
    cta: 'Contact Sales', highlight: true,
  },
  {
    name: 'Boardroom Retainer', price: 'Custom', period: '', description: 'For large enterprises & PSUs',
    features: ['Everything in Enterprise', 'Unlimited Vriksh AI', 'Custom integrations', 'On-premise deployment option', 'Dr. Rao advisory hours', 'White-label options'],
    cta: 'Schedule Demo', highlight: false,
  },
]

export default function PricingPage() {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', plan: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-canvas-light pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-canvas-dark mb-3">Choose Your Plan</h1>
          <p className="text-canvas-muted-light max-w-xl mx-auto">From individual civil service preparation to enterprise ESG compliance — we have you covered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan) => (
            <div key={plan.name} className={cn('rounded-bento-cell border p-6 transition-all',
              plan.highlight ? 'border-botanical-600 bg-botanical-50 shadow-tactile-hover' : 'border-black/[0.06] bg-canvas-surface-light shadow-tactile-card')}>
              <h3 className="font-display text-lg font-semibold text-canvas-dark">{plan.name}</h3>
              <p className="text-xs text-canvas-muted-light mt-1">{plan.description}</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-display font-bold text-canvas-dark">{plan.price !== 'Custom' && '₹'}{plan.price}</span>
                <span className="text-sm text-canvas-muted-light">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-canvas-dark/80">
                    <Check className="w-4 h-4 text-botanical-600 shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setLeadForm({ ...leadForm, plan: plan.name })}
                className={cn('w-full py-2.5 rounded-interactive text-sm font-medium transition-all',
                  plan.highlight ? 'bg-botanical-600 text-white hover:bg-botanical-700' : 'bg-canvas-light text-canvas-dark hover:bg-canvas-light/80 border border-black/[0.08]')}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Lead Form */}
        {leadForm.plan && !submitted && (
          <div className="max-w-md mx-auto bg-canvas-surface-light rounded-bento-cell border border-black/[0.06] shadow-tactile-card p-6">
            <h3 className="font-display text-lg font-semibold text-canvas-dark mb-1">Get in Touch</h3>
            <p className="text-xs text-canvas-muted-light mb-4">Interested in {leadForm.plan}? Leave your details.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} placeholder="Name" required
                className="w-full px-3 py-2.5 bg-canvas-light rounded-interactive text-sm border border-black/[0.08] focus:border-botanical-600/30 outline-none" />
              <input type="email" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} placeholder="Email" required
                className="w-full px-3 py-2.5 bg-canvas-light rounded-interactive text-sm border border-black/[0.08] focus:border-botanical-600/30 outline-none" />
              <input type="text" value={leadForm.company} onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })} placeholder="Organization (optional)"
                className="w-full px-3 py-2.5 bg-canvas-light rounded-interactive text-sm border border-black/[0.08] focus:border-botanical-600/30 outline-none" />
              <button type="submit" disabled={submitting}
                className="w-full py-2.5 bg-botanical-600 text-white rounded-interactive text-sm font-medium hover:bg-botanical-700 disabled:opacity-50">
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Submitting...</> : 'Submit'}
              </button>
            </form>
          </div>
        )}
        {submitted && (
          <div className="max-w-md mx-auto text-center bg-botanical-50 rounded-bento-cell border border-botanical-200 p-6">
            <Crown className="w-8 h-8 text-botanical-600 mx-auto mb-2" />
            <h3 className="font-display text-lg font-semibold text-botanical-900">Thank You!</h3>
            <p className="text-sm text-botanical-700 mt-1">We&apos;ll reach out within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  )
}
