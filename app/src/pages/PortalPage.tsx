import { useState, useEffect, useMemo } from 'react'
import { useTrack } from '@/hooks/useTrackContext'
import { useAuth } from '@/hooks/useAuthContext'
import { getFeed } from '@/data/portalData'
import KnowledgeCard from '@/components/KnowledgeCard'
import CampaCalculator from '@/components/CampaCalculator'
import DeskSimulator from '@/components/DeskSimulator'
import {
  Search, Filter, LayoutGrid, Sparkles, ArrowDown,
  Database, TrendingUp, Leaf, BookOpen, Scale, Radio, WifiOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PortalPage() {
  const { activeTrack } = useTrack()
  const { user, persona } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [toolView, setToolView] = useState<'feed' | 'tools'>('feed')
  const [feed, setFeed] = useState({ cards: [], source: 'seed', loading: false })

  useEffect(() => {
    const f = getFeed(activeTrack)
    setFeed({ cards: f.cards, source: 'seed', loading: false })
  }, [activeTrack])

  const categories = useMemo(() => {
    const cats = new Set(feed.cards.map((c) => c.category))
    return ['all', ...Array.from(cats).sort()]
  }, [feed.cards])

  const filteredCards = useMemo(() => {
    return feed.cards.filter((card) => {
      const matchesSearch = !searchQuery || card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.summary.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [feed.cards, searchQuery, selectedCategory])

  const trackLabel = activeTrack === 'civil' ? 'Civil Services Academy' : 'Corporate ESG Suite'
  const trackDescription = activeTrack === 'civil'
    ? 'Curated preparation materials for IFS officers and UPSC aspirants covering environmental law, forest governance, and administrative frameworks.'
    : 'Enterprise compliance tools covering BRSR 3.0, ICM carbon markets, TNFD materiality, and CAMPA obligations.'

  return (
    <div className="min-h-screen bg-canvas-light">
      {/* Hero */}
      <section className="relative h-[55vh] sm:h-[60vh] bg-botanical-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.15),_transparent_50%)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-4 h-4 text-botanical-500" />
              <span className="text-botanical-500 text-xs font-mono uppercase tracking-[0.15em]">Enterprise Knowledge Platform</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-canvas-surface-light leading-tight tracking-tight mb-4">
              The Canopy &<br />Infrastructure Nexus
            </h1>
            <p className="text-canvas-surface-light/70 text-base sm:text-lg leading-relaxed max-w-xl mb-4">
              Executive-grade environmental law intelligence, curated by <span className="text-botanical-500 font-medium">Dr. Y.L.P. Rao</span>, IFS Retd.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className={cn('flex items-center gap-2 px-3.5 py-2 rounded-interactive text-xs font-medium bg-botanical-700/30 border border-botanical-500/20 text-botanical-500')}>
                {activeTrack === 'civil' ? <BookOpen className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                {trackLabel}
              </div>
              <div className="flex items-center gap-1.5 text-canvas-surface-light/40 text-xs">
                <Database className="w-3 h-3" /><span>{feed.cards.length} articles indexed</span>
              </div>
              <div className="flex items-center gap-1.5 text-canvas-surface-light/40 text-xs">
                <TrendingUp className="w-3 h-3" /><span>{filteredCards.length} in view</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border bg-canvas-surface-light/10 text-canvas-surface-light/40 border-canvas-surface-light/10">
                <span className="w-1.5 h-1.5 rounded-full bg-botanical-500 animate-pulse" />1980–2026 Corpus
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-canvas-surface-light/30">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-botanical-600 rounded-full" />
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-canvas-dark">{trackLabel}</h2>
          </div>
          <p className="text-sm text-canvas-muted-light ml-3 max-w-2xl">{trackDescription}</p>
        </div>

        {/* Feed | Tools toggle */}
        <div className="flex items-center gap-1 mb-6 p-1 bg-canvas-surface-light rounded-bento-cell border border-black/[0.06] shadow-tactile-sm w-fit">
          <button onClick={() => setToolView('feed')} className={cn('flex items-center gap-1.5 px-4 py-2 rounded-interactive text-xs font-medium transition-all',
            toolView === 'feed' ? 'bg-botanical-600 text-white shadow-md' : 'text-canvas-muted-light hover:text-canvas-dark hover:bg-canvas-light')}>
            <LayoutGrid className="w-3.5 h-3.5" />Knowledge Feed
          </button>
          <button onClick={() => setToolView('tools')} className={cn('flex items-center gap-1.5 px-4 py-2 rounded-interactive text-xs font-medium transition-all',
            toolView === 'tools' ? 'bg-botanical-600 text-white shadow-md' : 'text-canvas-muted-light hover:text-canvas-dark hover:bg-canvas-light')}>
            <Sparkles className="w-3.5 h-3.5" />{activeTrack === 'civil' ? 'Desk Simulator' : 'CAMPA Calculator'}
          </button>
        </div>

        {toolView === 'tools' && (
          <div className="mb-8">
            {activeTrack === 'corporate' ? <CampaCalculator /> : <DeskSimulator />}
          </div>
        )}

        {toolView === 'feed' && (
          <>
            {/* Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 p-3 bg-canvas-surface-light rounded-bento-cell border border-black/[0.06] shadow-tactile-card">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-canvas-muted-light" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTrack === 'civil' ? 'academy modules' : 'compliance records'}...`}
                  className="w-full pl-9 pr-4 py-2.5 bg-canvas-light rounded-interactive text-sm text-canvas-dark placeholder:text-canvas-muted-light focus:outline-none focus:ring-1 focus:ring-botanical-600/20 border border-transparent focus:border-botanical-600/20 transition-all" />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Filter className="w-4 h-4 text-canvas-muted-light" />
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={cn('px-3 py-1.5 rounded-interactive text-xs font-medium transition-all whitespace-nowrap',
                        selectedCategory === cat ? 'bg-botanical-600 text-white' : 'bg-canvas-light text-canvas-muted-light hover:bg-botanical-50 hover:text-botanical-700')}>
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredCards.map((card) => (
                <KnowledgeCard key={card.id} card={card} />
              ))}
            </div>

            {!feed.loading && filteredCards.length === 0 && (
              <div className="text-center py-16 bg-canvas-surface-light rounded-bento-cell border border-black/[0.04] shadow-tactile-sm">
                <Search className="w-10 h-10 text-canvas-muted-light/30 mx-auto mb-3" />
                <p className="text-canvas-muted-light text-sm">No modules match your search criteria.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-3 cin-btn-primary text-xs">Reset Filters</button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
