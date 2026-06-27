import { useState } from 'react'
import type { KnowledgeCard as KnowledgeCardType } from '@/data/portalData'
import {
  Calendar, ExternalLink, ChevronDown, ChevronUp,
  Bookmark, BookmarkCheck, Zap, Landmark, Globe, Scale, AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props { card: KnowledgeCardType }

function dateBadgeMeta(dateStr: string): { label: string; variant: 'fresh' | 'active' | 'superseded' | 'overruled' } {
  const year = new Date(dateStr).getFullYear()
  const currentYear = new Date().getFullYear()
  if (year >= currentYear) return { label: String(year), variant: 'fresh' }
  if (year >= 2020) return { label: String(year), variant: 'active' }
  if (year >= 2010) return { label: String(year), variant: 'superseded' }
  return { label: String(year), variant: 'overruled' }
}

function categoryIcon(category: string) {
  if (category.includes('Statute') || category.includes('Case')) return <Scale className="w-3 h-3" />
  if (category.includes('Global')) return <Globe className="w-3 h-3" />
  if (category.includes('Administrative')) return <Landmark className="w-3 h-3" />
  return <Zap className="w-3 h-3" />
}

export default function KnowledgeCard({ card }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const dateMeta = dateBadgeMeta(card.date)

  const dateBadgeClass = {
    fresh: 'bg-regulatory-active-bg text-regulatory-active-text border-regulatory-active-border',
    active: 'bg-botanical-50 text-botanical-700 border-botanical-200',
    superseded: 'bg-regulatory-superseded-bg text-regulatory-superseded-text border-regulatory-superseded-border',
    overruled: 'bg-regulatory-overruled-bg text-regulatory-overruled-text border-regulatory-overruled-border',
  }[dateMeta.variant]

  return (
    <article className={cn('bg-canvas-surface-light rounded-bento-cell border transition-all duration-300 shadow-tactile-card hover:shadow-tactile-hover',
      'border-l-[3px] border-l-botanical-600 border-t border-r border-b border-black/[0.06]',
      dateMeta.variant === 'fresh' && 'ring-1 ring-botanical-500/15')}>
      <div className="p-4 sm:p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-canvas-light text-canvas-dark border border-black/[0.06]">
              {categoryIcon(card.category)}{card.category}
            </span>
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border', dateBadgeClass)}>
              {dateMeta.variant === 'fresh' && <Zap className="w-3 h-3" />}
              {dateMeta.variant === 'overruled' && <AlertTriangle className="w-3 h-3" />}
              {dateMeta.label}
            </span>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)} className="p-1 rounded-interactive hover:bg-canvas-light transition-colors shrink-0">
            {bookmarked ? <BookmarkCheck className="w-4 h-4 text-botanical-600" /> : <Bookmark className="w-4 h-4 text-canvas-muted-light" />}
          </button>
        </div>

        {/* Title */}
        <h3 className="font-display text-base sm:text-lg font-semibold text-canvas-dark leading-snug mb-2">{card.title}</h3>

        {/* Summary */}
        <p className="text-sm text-canvas-dark/80 leading-relaxed mb-3">
          {expanded ? card.summary : card.summary.slice(0, 220) + (card.summary.length > 220 ? '...' : '')}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {card.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-canvas-light text-canvas-dark/70 border border-black/[0.05]">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-black/[0.05]">
          <div className="flex items-center gap-3 text-xs text-canvas-muted-light">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />
              {new Date(card.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-interactive text-xs text-canvas-dark/60 hover:text-canvas-dark hover:bg-canvas-light transition-all">
              {expanded ? <><ChevronUp className="w-3.5 h-3.5" />Collapse</> : <><ChevronDown className="w-3.5 h-3.5" />Deep Dive</>}
            </button>
            <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-interactive text-xs font-medium bg-botanical-600 text-white hover:bg-botanical-700 active:scale-[0.98] transition-all">
              <ExternalLink className="w-3.5 h-3.5" /><span className="hidden sm:inline">Read</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
