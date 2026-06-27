import { useState } from 'react'
import { Gavel, Clock, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CASES = [
  { id: 1, title: 'Forest Diversion Approval (FCA 1980)', description: 'A mining company seeks to divert 50ha of forest land in Odisha. As DFO, process the application.', questions: [{ q: 'Which section requires Central Govt approval?', options: ['Section 2', 'Section 3A', 'Section 4'], correct: 0 }], timeLimit: 15 },
  { id: 2, title: 'FRA 2006 — Gram Sabha Consent', description: 'A tribal community claims forest rights under FRA. What is the correct procedure?', questions: [{ q: 'Who initiates the rights claim process?', options: ['District Collector', 'Gram Sabha', 'State Govt'], correct: 1 }], timeLimit: 10 },
  { id: 3, title: 'NGT Jurisdiction — Environmental Damage', description: 'A factory is discharging untreated effluent into a river. What is the appropriate legal forum?', questions: [{ q: 'Which tribunal has jurisdiction?', options: ['High Court', 'NGT', 'District Court'], correct: 1 }], timeLimit: 12 },
]

export default function DeskSimulator() {
  const [activeCase, setActiveCase] = useState<number | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)

  const currentCase = CASES.find((c) => c.id === activeCase)

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx)
    const correct = currentCase?.questions[0].correct === idx
    setResult(correct ? 'correct' : 'incorrect')
  }

  return (
    <div className="cin-card p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><Gavel className="w-5 h-5 text-blue-600" /></div>
        <div><h3 className="font-display text-base sm:text-lg font-semibold text-forest-deep">Administrative Desk Simulator</h3><p className="text-[11px] text-slate-base/50 font-mono uppercase">Timed case studies for IFS/UPSC</p></div>
      </div>

      {activeCase === null ? (
        <div className="space-y-3">
          {CASES.map((c) => (
            <button key={c.id} onClick={() => { setActiveCase(c.id); setSelectedAnswer(null); setResult(null); }}
              className="w-full flex items-center gap-4 p-4 bg-parchment rounded-xl border border-forest-base/10 hover:border-forest-base/30 transition-all text-left">
              <div className="w-8 h-8 rounded-lg bg-forest-base/10 flex items-center justify-center shrink-0"><span className="text-xs font-mono font-semibold text-forest-base">{c.id}</span></div>
              <div className="flex-1 min-w-0"><h4 className="text-sm font-semibold text-forest-deep">{c.title}</h4><p className="text-xs text-slate-base/50 mt-0.5 line-clamp-2">{c.description}</p></div>
              <div className="flex items-center gap-1 text-xs text-slate-base/40 shrink-0"><Clock className="w-3 h-3" />{c.timeLimit}m</div>
              <ChevronRight className="w-4 h-4 text-slate-base/30 shrink-0" />
            </button>
          ))}
        </div>
      ) : currentCase ? (
        <div className="space-y-4">
          <button onClick={() => setActiveCase(null)} className="text-xs text-slate-base/50 hover:text-forest-base">← Back to cases</button>
          <div>
            <h4 className="font-display text-lg font-semibold text-forest-deep">{currentCase.title}</h4>
            <p className="text-sm text-slate-base/70 mt-2">{currentCase.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-base/40"><Clock className="w-3 h-3" />{currentCase.timeLimit} minutes</div>
          </div>
          <div className="bg-parchment rounded-xl p-5 border border-forest-base/10">
            <p className="text-sm font-medium text-forest-deep mb-4">{currentCase.questions[0].q}</p>
            <div className="space-y-2">
              {currentCase.questions[0].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={result !== null}
                  className={cn('w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all',
                    selectedAnswer === idx ? (result === 'correct' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800') : 'bg-white/50 border-forest-base/10 hover:bg-white')}>
                  <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono',
                    selectedAnswer === idx ? (result === 'correct' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white') : 'bg-forest-base/10 text-forest-base')}>{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </button>
              ))}
            </div>
            {result === 'correct' && <div className="mt-4 flex items-center gap-2 text-emerald-700 text-sm"><CheckCircle2 className="w-4 h-4" />Correct! Well reasoned.</div>}
            {result === 'incorrect' && <div className="mt-4 flex items-center gap-2 text-red-700 text-sm"><AlertTriangle className="w-4 h-4" />Incorrect. Review the statutory provisions.</div>}
          </div>
        </div>
      ) : null}
    </div>
  )
}
