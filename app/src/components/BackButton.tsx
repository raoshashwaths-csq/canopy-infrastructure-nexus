import { useNavigate, useLocation } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BackButton({ label = 'Back' }: { label?: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/') return null

  return (
    <button
      onClick={() => navigate(-1)}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-interactive',
        'text-[11px] font-medium text-canvas-muted-light hover:text-canvas-dark',
        'bg-canvas-light hover:bg-canvas-light/80 border border-black/[0.06]',
        'transition-all active:scale-[0.97]'
      )}
    >
      <ArrowLeft className="w-3 h-3" />
      {label}
    </button>
  )
}
