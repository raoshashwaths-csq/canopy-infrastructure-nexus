import { useState } from 'react'
import { LayoutDashboard, DollarSign, Cpu, BookOpen, Menu, X, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

type AdminTab = 'revenue' | 'telemetry' | 'curation'

const ADMIN_TABS: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
  { key: 'revenue', label: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
  { key: 'telemetry', label: 'AI Telemetry', icon: <Cpu className="w-4 h-4" /> },
  { key: 'curation', label: 'Curation', icon: <BookOpen className="w-4 h-4" /> },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('revenue')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-base flex flex-col md:flex-row">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn('fixed md:static inset-y-0 left-0 z-50 w-56 bg-forest-deep border-r border-white/5 flex flex-col shrink-0 transition-transform md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-forest-light" />
            <span className="font-display text-sm font-semibold text-off-white">CIN Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {ADMIN_TABS.map((tab) => (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={cn('w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                activeTab === tab.key ? 'bg-forest-base/30 text-forest-light border border-forest-light/20' : 'text-white/30 hover:text-white/60 hover:bg-white/5')}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-forest-deep border-b border-white/5">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg bg-white/5 text-white/60">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <span className="text-xs font-semibold text-off-white font-display">CIN Admin</span>
        </div>

        <div className="p-6">
          {activeTab === 'revenue' && (
            <div>
              <h2 className="font-display text-xl font-semibold text-off-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400" /> Revenue Insights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['MRR', 'ARR', 'Active Subs', 'Churn Rate'].map((m) => (
                  <div key={m} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] font-mono uppercase text-white/30">{m}</p>
                    <p className="text-xl font-display font-semibold text-off-white mt-1">—</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'telemetry' && (
            <div>
              <h2 className="font-display text-xl font-semibold text-off-white mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-blue-400" /> AI Telemetry</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Total Queries', 'Avg Latency', 'Error Rate', 'Token Usage', 'Active Sessions', 'Feedback Score'].map((m) => (
                  <div key={m} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] font-mono uppercase text-white/30">{m}</p>
                    <p className="text-xl font-display font-semibold text-off-white mt-1">—</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'curation' && (
            <div>
              <h2 className="font-display text-xl font-semibold text-off-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-amber-400" /> Content Curation</h2>
              <p className="text-sm text-white/40">Manage ingested documents and approval queue.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
