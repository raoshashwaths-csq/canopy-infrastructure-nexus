import { Link, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuthContext'
import { useTrack } from '@/hooks/useTrackContext'
import {
  Shield, GraduationCap, LayoutDashboard, Menu, X, LogIn, LogOut,
  User, Sparkles, CreditCard, Database, Leaf, Shovel,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Header() {
  const { activeTrack, toggleTrack } = useTrack()
  const { user, isAuthenticated, logout, persona } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const personaBadge =
    persona === 'ifs_officer' ? { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'IFS' }
    : persona === 'corporate_esg' ? { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'ESG' }
    : persona === 'civil_aspirant' ? { bg: 'bg-botanical-50', text: 'text-botanical-900', border: 'border-botanical-200', label: 'UPSC' }
    : null

  const navLinks = [
    { to: '/library', label: 'Library', icon: <Database className="w-3.5 h-3.5" /> },
    { to: '/esg', label: 'ESG', icon: <Leaf className="w-3.5 h-3.5" /> },
    { to: '/clearance', label: 'Clearance', icon: <Shovel className="w-3.5 h-3.5" /> },
    { to: '/pricing', label: 'Pricing', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { to: '/admin', label: 'Admin', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas-surface-light border-b border-black/[0.05] shadow-tactile-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-interactive bg-botanical-600 flex items-center justify-center shadow-tactile-sm group-hover:shadow-tactile-hover transition-shadow">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-canvas-dark text-sm font-semibold tracking-tight font-display">Canopy & Infrastructure Nexus</span>
            </div>
            <div className="sm:hidden">
              <span className="text-canvas-dark text-sm font-semibold tracking-tight font-display">CIN</span>
            </div>
          </Link>

          {/* Track Toggle */}
          <div className="hidden md:flex items-center">
            <button onClick={toggleTrack} className="relative flex items-center bg-canvas-light rounded-full p-0.5 border border-black/[0.06]">
              <div className={cn('flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
                activeTrack === 'civil' ? 'bg-botanical-600 text-white shadow-md' : 'text-canvas-muted-light')}>
                <GraduationCap className="w-3.5 h-3.5" /><span>Civil Services</span>
              </div>
              <div className={cn('flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
                activeTrack === 'corporate' ? 'bg-botanical-600 text-white shadow-md' : 'text-canvas-muted-light')}>
                <Shield className="w-3.5 h-3.5" /><span>Corporate ESG</span>
              </div>
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2">
            {personaBadge && (
              <span className={cn('hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border',
                personaBadge.bg, personaBadge.text, personaBadge.border)}>
                <User className="w-2.5 h-2.5" />{personaBadge.label}
              </span>
            )}
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className={cn('hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-interactive text-xs font-medium transition-all',
                  location.pathname === link.to ? 'bg-botanical-50 text-botanical-900 border border-botanical-200' : 'text-canvas-muted-light hover:text-canvas-dark hover:bg-canvas-light')}>
                {link.icon}<span className="hidden lg:inline">{link.label}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <button onClick={logout} className="p-1.5 rounded-interactive text-canvas-muted-light hover:text-regulatory-overruled transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link to="/auth" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-interactive text-xs font-medium text-canvas-muted-light hover:text-canvas-dark hover:bg-canvas-light">
                <LogIn className="w-3.5 h-3.5" /><span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-1.5 text-canvas-muted-light rounded-interactive">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-black/[0.05] animate-canvas-fade-in">
            <div className="flex flex-wrap gap-1 px-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}
                  className={cn('flex items-center gap-1.5 px-3 py-2 rounded-interactive text-xs font-medium',
                    location.pathname === link.to ? 'bg-botanical-50 text-botanical-900 border border-botanical-200' : 'text-canvas-muted-light')}>
                  {link.icon}{link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
