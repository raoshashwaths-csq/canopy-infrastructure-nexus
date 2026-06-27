import { useNavigate } from 'react-router'
import { Leaf, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas-light flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-12 h-12 rounded-interactive bg-botanical-600 flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-canvas-dark mb-2">Welcome to CIN</h1>
        <p className="text-sm text-canvas-muted-light mb-6">Your account has been created successfully. You're ready to explore the platform.</p>
        <button onClick={() => navigate('/')}
          className={cn('inline-flex items-center gap-2 px-6 py-2.5 bg-botanical-600 text-white rounded-interactive text-sm font-medium hover:bg-botanical-700 active:scale-[0.98] transition-all')}>
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
