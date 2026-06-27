import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuthContext'
import { Leaf, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AuthPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [persona, setPersona] = useState('civil_aspirant')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = () => {
    if (!email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
    if (!password || password.length < 6) return 'Password must be at least 6 characters'
    if (mode === 'signup') {
      if (password !== confirmPassword) return 'Passwords do not match'
      if (!fullName.trim()) return 'Full name is required'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
        navigate('/')
      } else {
        await register({ email, password, full_name: fullName, persona })
        navigate('/onboarding')
      }
    } catch {
      setError('Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-interactive bg-botanical-600 flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-canvas-dark">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-canvas-muted-light mt-1">
            {mode === 'login' ? 'Sign in to your CIN account' : 'Join the Canopy & Infrastructure Nexus'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-interactive bg-regulatory-overruled-bg border border-regulatory-overruled-border text-regulatory-overruled-text text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-canvas-dark mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-canvas-surface-light rounded-interactive text-sm text-canvas-dark border border-black/[0.08] focus:outline-none focus:border-botanical-600/30 transition-all"
              placeholder="you@example.com" />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-canvas-dark mb-1">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 bg-canvas-surface-light rounded-interactive text-sm text-canvas-dark border border-black/[0.08] focus:outline-none focus:border-botanical-600/30 transition-all"
                placeholder="Your full name" />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-canvas-dark mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-canvas-surface-light rounded-interactive text-sm text-canvas-dark border border-black/[0.08] focus:outline-none focus:border-botanical-600/30 transition-all"
              placeholder="Min 6 characters" />
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-canvas-dark mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-canvas-surface-light rounded-interactive text-sm text-canvas-dark border border-black/[0.08] focus:outline-none focus:border-botanical-600/30 transition-all"
                  placeholder="Repeat password" />
              </div>
              <div>
                <label className="block text-xs font-medium text-canvas-dark mb-1">Persona</label>
                <select value={persona} onChange={(e) => setPersona(e.target.value)}
                  className="w-full px-3 py-2.5 bg-canvas-surface-light rounded-interactive text-sm text-canvas-dark border border-black/[0.08] focus:outline-none focus:border-botanical-600/30 transition-all">
                  <option value="civil_aspirant">UPSC / Civil Services Aspirant</option>
                  <option value="ifs_officer">IFS Officer</option>
                  <option value="corporate_esg">Corporate ESG Professional</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" disabled={loading}
            className={cn('w-full py-2.5 rounded-interactive text-sm font-medium transition-all',
              loading ? 'bg-canvas-light text-canvas-muted-light cursor-not-allowed' : 'bg-botanical-600 text-white hover:bg-botanical-700 active:scale-[0.98]')}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Processing...</> : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-canvas-muted-light mt-4">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
            className="text-botanical-600 hover:text-botanical-700 font-medium">{mode === 'login' ? 'Sign Up' : 'Sign In'}</button>
        </p>
      </div>
    </div>
  )
}
