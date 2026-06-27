import { useState, useEffect, useCallback } from 'react'
import {
  Search, Filter, Database, Loader2, AlertTriangle,
  Sparkles, TreePine, GraduationCap, Layers, BookOpen, ExternalLink,
  Clock, X, Plus, Upload, Wand2, ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BackButton from '@/components/BackButton'

export default function KnowledgeLibraryPage() {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showOntology, setShowOntology] = useState(false)
  const [jurisdiction, setJurisdiction] = useState('all')
  const [docType, setDocType] = useState('all')
  const [yearMin, setYearMin] = useState('')
  const [yearMax, setYearMax] = useState('')
  const [browseDocs, setBrowseDocs] = useState<any[]>([])
  const [browseLoading, setBrowseLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [showIngestForm, setShowIngestForm] = useState(false)
  const [ingestTitle, setIngestTitle] = useState('')
  const [ingestUrl, setIngestUrl] = useState('')
  const [ingestText, setIngestText] = useState('')
  const [ingesting, setIngesting] = useState(false)
  const [ingestError, setIngestError] = useState<string | null>(null)

  const hasActiveFilters = jurisdiction !== 'all' || docType !== 'all' || yearMin || yearMax

  const loadBrowseDocs = async () => {
    setBrowseLoading(true)
    try {
      const res = await fetch('/api/library/documents?limit=30')
      const data = await res.ok ? await res.json() : []
      setBrowseDocs(data)
      if (data.length === 0 && !seeded) handleAutoSeed()
    } catch {
      setBrowseDocs([])
    } finally {
      setBrowseLoading(false)
    }
  }

  useEffect(() => { loadBrowseDocs() }, [])

  const handleAutoSeed = async () => {
    setSeeding(true)
    try {
      await fetch('/api/library/seed-historical', { method: 'POST' })
      setSeeded(true)
      const res = await fetch('/api/library/documents?limit=30')
      if (res.ok) setBrowseDocs(await res.json())
    } catch { /* silent */ }
    finally { setSeeding(false) }
  }

  const handleManualIngest = async () => {
    if (!ingestTitle.trim() || !ingestText.trim()) { setIngestError('Title and content required'); return }
    setIngestError(null); setIngesting(true)
    try {
      await fetch('/api/tasks/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: ingestUrl || 'manual://ingest', text: ingestText, title: ingestTitle }),
      })
      setIngestTitle(''); setIngestUrl(''); setIngestText(''); setShowIngestForm(false)
      await loadBrowseDocs()
    } catch { setIngestError('Ingest failed') }
    finally { setIngesting(false) }
  }

  const executeSearch = async () => {
    if (!query.trim()) return
    setSearching(true); setHasSearched(true)
    try {
      const res = await fetch('/api/library/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 20 }),
      })
      const data = await res.ok ? await res.json() : { results: [] }
      setSearchResults(data.results || [])
    } catch { setSearchResults([]) }
    finally { setSearching(false) }
  }

  return (
    <div className="min-h-screen bg-slate-base pt-0">
      {/* Header */}
      <div className="bg-forest-deep border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-9 h-9 rounded-lg bg-forest-base/30 border border-forest-light/20 flex items-center justify-center">
              <Database className="w-4 h-4 text-forest-light" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-lg font-semibold text-off-white truncate">Knowledge Library</h1>
              <p className="text-[11px] text-white/30 font-mono hidden sm:block">Authority-Aware Hybrid-Semantic Search</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowOntology(!showOntology)} className={cn('hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition-all',
              showOntology ? 'bg-forest-base/20 text-forest-light border-forest-light/20' : 'bg-white/5 text-white/30 border-white/10 hover:text-white/50')}>
              <GraduationCap className="w-3.5 h-3.5" />Karmayogi
            </button>
            <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white/30 font-mono">30 docs</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-forest-deep/50 border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
                placeholder="Search across statutes, cases, global frameworks..."
                className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-off-white placeholder:text-white/20 focus:outline-none focus:border-forest-light/30 transition-all" />
            </div>
            <button onClick={executeSearch} disabled={searching || !query.trim()}
              className={cn('flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all shrink-0',
                query.trim() && !searching ? 'bg-forest-base text-white hover:bg-forest-deep' : 'bg-white/5 text-white/20 cursor-not-allowed')}>
              {searching ? <><Loader2 className="w-4 h-4 animate-spin" />Searching...</> : <><Sparkles className="w-4 h-4" />Search</>}
            </button>
            <button onClick={() => setShowFilters(!showFilters)}
              className={cn('flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium border shrink-0',
                showFilters || hasActiveFilters ? 'bg-forest-base/20 text-forest-light border-forest-light/20' : 'bg-white/5 text-white/30 border-white/10')}>
              <Filter className="w-3.5 h-3.5" />{hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-forest-light" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col lg:flex-row">
        {showFilters && (
          <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 bg-forest-deep/30 p-4 space-y-5 overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-180px)]">
            <h3 className="text-sm font-semibold text-off-white flex items-center gap-2"><Filter className="w-4 h-4 text-forest-light" />Filters</h3>
            <div><label className="text-[11px] font-mono text-white/30 uppercase mb-1 block">Jurisdiction</label>
              <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white">
                <option value="all">All</option><option value="domestic">India (Domestic)</option><option value="international">International</option>
              </select>
            </div>
            <div><label className="text-[11px] font-mono text-white/30 uppercase mb-1 block">Document Type</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white">
                <option value="all">All Types</option><option value="Statute">Statute</option><option value="Case Study">Case Study</option><option value="Global Framework">Global Framework</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><label className="text-[11px] font-mono text-white/30 uppercase mb-1 block">From</label>
                <input type="number" value={yearMin} onChange={(e) => setYearMin(e.target.value)} placeholder="1980" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" /></div>
              <div><label className="text-[11px] font-mono text-white/30 uppercase mb-1 block">To</label>
                <input type="number" value={yearMax} onChange={(e) => setYearMax(e.target.value)} placeholder="2026" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" /></div>
            </div>
          </aside>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 p-6">
          {hasSearched ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-white/40">{searchResults.length} results for &quot;{query}&quot;</p>
                <button onClick={() => { setHasSearched(false); setQuery(''); }} className="text-xs text-forest-light hover:text-forest-base">Clear</button>
              </div>
              {searchResults.length > 0 ? (
                <div className="space-y-4">{searchResults.map((r, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-off-white">{r.document_title || r.title || 'Result'}</h3>
                    <p className="text-xs text-white/40 mt-1">{r.year_of_origin || ''}</p>
                  </div>
                ))}</div>
              ) : (
                <div className="text-center py-16"><p className="text-white/30 text-sm">No results found.</p></div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {browseLoading ? (
                <div className="flex items-center justify-center py-16"><Loader2 className="w-5 h-5 text-forest-light animate-spin" /></div>
              ) : browseDocs.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  {browseDocs.map((doc: any) => (
                    <div key={doc.registry_id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-forest-base/20 text-forest-light border border-forest-light/20">{doc.document_type || 'Document'}</span>
                        <span className="text-[10px] text-white/30 font-mono">{doc.year_of_origin}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-off-white">{doc.document_title}</h3>
                      <p className="text-xs text-white/30 mt-1 font-mono">{doc.statutory_act}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-xl">
                    <Database className="w-10 h-10 text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 text-sm font-medium">Knowledge base is empty</p>
                    <p className="text-white/20 text-xs mt-1 font-mono mb-4">No documents have been indexed yet.</p>
                    <div className="flex items-center justify-center gap-3">
                      {!seeded && (
                        <button onClick={handleAutoSeed} disabled={seeding}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-base/20 text-forest-light border border-forest-light/20 text-xs font-medium hover:bg-forest-base/30 transition-all disabled:opacity-50">
                          {seeding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}{seeding ? 'Seeding...' : 'Seed Historical Documents'}
                        </button>
                      )}
                      <button onClick={() => setShowIngestForm(!showIngestForm)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-all">
                        <Upload className="w-3 h-3" /> Add Document
                      </button>
                    </div>
                  </div>
                  {showIngestForm && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                      <h3 className="text-sm font-semibold text-off-white flex items-center gap-2"><Plus className="w-4 h-4 text-blue-400" /> Add Document</h3>
                      {ingestError && <p className="text-xs text-red-400">{ingestError}</p>}
                      <input value={ingestTitle} onChange={(e) => setIngestTitle(e.target.value)} placeholder="Title *" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
                      <input value={ingestUrl} onChange={(e) => setIngestUrl(e.target.value)} placeholder="Source URL (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
                      <textarea value={ingestText} onChange={(e) => setIngestText(e.target.value)} placeholder="Content *" rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
                      <button onClick={handleManualIngest} disabled={ingesting || !ingestTitle.trim() || !ingestText.trim()}
                        className={cn('px-4 py-2 rounded-lg text-xs font-medium', ingestTitle.trim() && ingestText.trim() && !ingesting ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/20 cursor-not-allowed')}>
                        {ingesting ? 'Processing...' : 'Ingest'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
