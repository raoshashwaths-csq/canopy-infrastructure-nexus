import { useState, useEffect } from 'react'
import {
  Waves, TreePine, PawPrint, Shovel,
  Loader2, Plus, AlertTriangle, CheckCircle2,
  Building2, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BackButton from '@/components/BackButton'

type CalcTab = 'cat' | 'green-credit' | 'wildlife' | 'crz'

const TABS: { key: CalcTab; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'cat', label: 'CAT Plan', icon: <Shovel className="w-4 h-4" />, desc: 'Silt Yield Index' },
  { key: 'green-credit', label: 'Green Credit', icon: <TreePine className="w-4 h-4" />, desc: 'IPCC Tier-2 Carbon' },
  { key: 'wildlife', label: 'Wildlife', icon: <PawPrint className="w-4 h-4" />, desc: 'Mitigation Levy' },
  { key: 'crz', label: 'CRZ / MISHTI', icon: <Waves className="w-4 h-4" />, desc: 'Mangrove Restoration' },
]

function useCompanyId(): string {
  const guestId = localStorage.getItem('cin_guest_company_id') || `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  localStorage.setItem('cin_guest_company_id', guestId)
  return guestId
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return <div className="bg-white/5 rounded-lg p-3"><p className="text-[10px] text-white/20 font-mono uppercase">{label}</p><p className={cn('text-lg font-display font-semibold', color)}>{value}</p></div>
}

export default function EnvironmentalClearancePage() {
  const [activeTab, setActiveTab] = useState<CalcTab>('cat')
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [pName, setPName] = useState(''); const [pState, setPState] = useState(''); const [pInvest, setPInvest] = useState('')
  const [pForest, setPForest] = useState(''); const [pCoastal, setPCoastal] = useState(''); const [pCorridor, setPCorridor] = useState('')
  const [creating, setCreating] = useState(false); const [createError, setCreateError] = useState<string | null>(null)
  const companyId = useCompanyId()

  const handleCreateProject = async () => {
    if (!pName.trim() || !pState.trim() || !pInvest) { setCreateError('Name, state, and investment required'); return }
    setCreateError(null); setCreating(true)
    try {
      const project = { project_id: `proj-${Date.now()}`, company_identifier: companyId, project_name: pName.trim(), target_state: pState.trim(), total_investment_cr: parseFloat(pInvest), forest_diverted_hectares: pForest ? parseFloat(pForest) : 0, coastal_diversion_sqm: pCoastal ? parseFloat(pCoastal) : 0, closest_wildlife_corridor_km: pCorridor ? parseFloat(pCorridor) : null, created_at: new Date().toISOString() }
      setProjects((prev) => [project, ...prev]); setSelectedProject(project)
      setPName(''); setPState(''); setPInvest(''); setPForest(''); setPCoastal(''); setPCorridor(''); setShowCreateForm(false)
    } catch { setCreateError('Failed to create') } finally { setCreating(false) }
  }

  return (
    <div className="min-h-screen bg-slate-base pt-0">
      <div className="bg-forest-deep border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"><Shovel className="w-4 h-4 text-amber-400" /></div>
            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-lg font-semibold text-off-white truncate">Environmental Clearance Suite</h1>
              <p className="text-[11px] text-white/30 font-mono hidden sm:block">MoEFCC Compliance — CAT | GCP | Wildlife | CRZ</p>
            </div>
          </div>
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/30 transition-all"><Plus className="w-3.5 h-3.5" /> New Project</button>
        </div>
      </div>

      {showCreateForm && (
        <div className="px-6 py-4 border-b border-white/5 bg-forest-deep/30">
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-off-white">New Clearance Project</h3>
            {createError && <p className="text-xs text-red-400">{createError}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Name *" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
              <input value={pState} onChange={(e) => setPState(e.target.value)} placeholder="State *" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
              <input type="number" value={pInvest} onChange={(e) => setPInvest(e.target.value)} placeholder="Investment (Cr) *" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-off-white" />
            </div>
            <button onClick={handleCreateProject} disabled={creating} className={cn('px-4 py-2 rounded-lg text-xs font-medium', pName.trim() && pState.trim() && pInvest && !creating ? 'bg-amber-500 text-white' : 'bg-white/5 text-white/20 cursor-not-allowed')}>{creating ? 'Creating...' : 'Create'}</button>
          </div>
        </div>
      )}

      <div className="bg-forest-deep/30 border-b border-white/5 px-6">
        <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} disabled={!selectedProject}
              className={cn('flex items-center gap-2 px-4 py-3 text-xs font-medium transition-all border-b-2 whitespace-nowrap shrink-0',
                activeTab === tab.key ? 'border-amber-400 text-off-white' : 'border-transparent text-white/30', !selectedProject && 'opacity-40')}>
              {tab.icon}<span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {!selectedProject ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-xl">
            <Building2 className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm font-medium">No project selected</p>
            <button onClick={() => setShowCreateForm(true)} className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium"><Plus className="w-3.5 h-3.5" /> Create First Project</button>
          </div>
        ) : (
          <div className="text-white/40 text-sm">
            <p>Select a calculator tab above to run computations for <strong className="text-white/60">{selectedProject.project_name}</strong>.</p>
            <p className="mt-2 text-xs font-mono text-white/20">Project ID: {selectedProject.project_id} | State: {selectedProject.target_state} | Investment: ₹{selectedProject.total_investment_cr}Cr</p>
          </div>
        )}
      </div>
    </div>
  )
}
