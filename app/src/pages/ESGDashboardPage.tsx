import { useState, useEffect } from 'react'
import {
  Truck, Leaf, Users, BarChart3, Loader2, Plus,
  Zap, Fuel, Satellite, Factory, Activity, Building2, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BackButton from '@/components/BackButton'

type ESGTab = 'value-chain' | 'carbon' | 'geospatial' | 'social' | 'materiality'

const TABS: { key: ESGTab; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'value-chain', label: 'Value Chain', icon: <Truck className="w-4 h-4" />, color: 'text-blue-400' },
  { key: 'carbon', label: 'Carbon Market', icon: <Factory className="w-4 h-4" />, color: 'text-emerald-400' },
  { key: 'geospatial', label: 'Geospatial', icon: <Satellite className="w-4 h-4" />, color: 'text-amber-400' },
  { key: 'social', label: 'Social / FPIC', icon: <Users className="w-4 h-4" />, color: 'text-rose-400' },
  { key: 'materiality', label: 'Materiality', icon: <BarChart3 className="w-4 h-4" />, color: 'text-purple-400' },
]

function useCompanyId() {
  const guestId = localStorage.getItem('cin_guest_company_id') || `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  localStorage.setItem('cin_guest_company_id', guestId)
  return guestId
}

function EmptyState({ icon, title, description, actionLabel, onAction }: any) {
  return (
    <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-xl">
      <div className="text-white/10 mb-3">{icon}</div>
      <p className="text-white/30 text-sm font-medium">{title}</p>
      <p className="text-white/20 text-xs mt-1 max-w-sm mx-auto">{description}</p>
      <button onClick={onAction} className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-base/20 text-forest-light border border-forest-light/20 text-xs font-medium hover:bg-forest-base/30 transition-all">
        {actionLabel} <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}

export default function ESGDashboardPage() {
  const [activeTab, setActiveTab] = useState<ESGTab>('value-chain')
  const companyId = useCompanyId()

  return (
    <div className="min-h-screen bg-slate-base">
      <div className="bg-forest-deep border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-lg font-semibold text-off-white truncate">ESG Command Center</h1>
              <p className="text-[11px] text-white/30 font-mono hidden sm:block">Enterprise One-Stop Shop — BRSR Core 3.0 | ICM | TNFD</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Building2 className="w-3 h-3 text-white/30" />
              <span className="text-[11px] text-white/40 font-mono hidden sm:inline">Guest Workspace</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-forest-deep/50 border-b border-white/5 px-6">
        <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={cn('flex items-center gap-2 px-4 py-3 text-xs font-medium transition-all border-b-2 whitespace-nowrap shrink-0',
                activeTab === tab.key ? 'border-emerald-400 text-off-white' : 'border-transparent text-white/30 hover:text-white/50')}>
              <span className={activeTab === tab.key ? tab.color : ''}>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'value-chain' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-off-white flex items-center gap-2"><Truck className="w-5 h-5 text-blue-400" /> Scope 3 Value Chain Portal</h2>
            </div>
            <EmptyState icon={<Truck className="w-8 h-8" />} title="No vendors onboarded yet" description="Add your first supplier to begin Scope 3 emissions tracking." actionLabel="Onboard First Vendor" onAction={() => {}} />
          </div>
        )}
        {activeTab === 'carbon' && (
          <div className="space-y-6">
            <h2 className="font-display text-lg font-semibold text-off-white flex items-center gap-2"><Factory className="w-5 h-5 text-emerald-400" /> India Carbon Market (ICM) Planner</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-white/40">Select a sector, production output, and actual emissions to project compliance.</p>
            </div>
          </div>
        )}
        {activeTab === 'geospatial' && <div><h2 className="font-display text-lg font-semibold text-off-white flex items-center gap-2"><Satellite className="w-5 h-5 text-amber-400" /> Geospatial Afforestation Verification</h2></div>}
        {activeTab === 'social' && <div><h2 className="font-display text-lg font-semibold text-off-white flex items-center gap-2"><Users className="w-5 h-5 text-rose-400" /> Social Framework & FPIC Ledger</h2></div>}
        {activeTab === 'materiality' && <div><h2 className="font-display text-lg font-semibold text-off-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-400" /> Double Materiality & Nature-Risk Matrix</h2></div>}
      </div>
    </div>
  )
}
