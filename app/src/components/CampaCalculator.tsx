import { useState } from 'react'
import { Calculator, TreePine, Map, IndianRupee, Info, TrendingUp, Leaf, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// CEC 2008 NPV MATRIX (₹ per hectare)
const NPV_MATRIX: Record<string, Record<string, number>> = {
  'Class I — Tropical Wet Evergreen':   { VDF: 1043000, MDF: 939000, OF: 730000 },
  'Class II — Tropical Semi-Evergreen': { VDF: 1043000, MDF: 939000, OF: 730000 },
  'Class III — Tropical Moist Deciduous': { VDF: 887000, MDF: 803000, OF: 626000 },
  'Class IV — Tropical Dry Deciduous':  { VDF: 626000, MDF: 563000, OF: 438000 },
  'Class V — Littoral & Swamp':         { VDF: 939000, MDF: 845000, OF: 657000 },
  'Class VI — Subtropical / Thorn / Himalayan': { VDF: 991000, MDF: 897000, OF: 699000 },
}
const ECO_CLASSES = Object.keys(NPV_MATRIX)
const CANOPY_CLASSES = ['VDF', 'MDF', 'OF']
const CA_RAISING_COST: Record<string, number> = { VDF: 185000, MDF: 125000, OF: 75000 }

function canopyLabel(c: string) { return c === 'VDF' ? '>70%' : c === 'MDF' ? '40-70%' : '10-40%' }
function ecoShort(full: string) { return full.split(' — ')[1] || full }

export default function CampaCalculator() {
  const [area, setArea] = useState(25)
  const [ecoClass, setEcoClass] = useState(ECO_CLASSES[3])
  const [canopyClass, setCanopyClass] = useState('MDF')
  const [isViolation, setIsViolation] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)

  const npvRate = NPV_MATRIX[ecoClass][canopyClass]
  const npvTotal = area * npvRate
  const penalMult = isViolation ? 2 : 1
  const adjustedNpv = npvTotal * penalMult
  const caLand = area * 2
  const caRaising = area * CA_RAISING_COST[canopyClass]
  const scafInterest = adjustedNpv * 0.0335
  const grandTotal = adjustedNpv + caRaising

  const badgeBg = canopyClass === 'VDF' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : canopyClass === 'MDF' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-orange-50 border-orange-200 text-orange-700'

  return (
    <div className="cin-card p-5 sm:p-6">
      <div className="flex items-start sm:items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-forest-base/10 border border-forest-base/20 flex items-center justify-center shrink-0"><Calculator className="w-5 h-5 text-forest-base" /></div>
        <div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-forest-deep">CAMPA & NPV Compliance Calculator</h3>
          <p className="text-[11px] text-slate-base/50 font-mono uppercase tracking-wider">FY 2025-26 — CEC Matrix 2008 | Van Adhiniyam 2023</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-forest-deep"><Map className="w-3.5 h-3.5" />Forest Land Diverted</label>
              <span className="text-sm font-mono font-semibold text-forest-base">{area} <span className="text-xs font-normal">ha</span></span>
            </div>
            <input type="range" min={1} max={500} value={area} onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-2 bg-parchment rounded-full accent-forest-base" />
            <div className="flex justify-between text-[10px] text-slate-base/40 font-mono mt-1"><span>1 ha</span><span>250 ha</span><span>500 ha</span></div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-forest-deep mb-2"><TreePine className="w-3.5 h-3.5" />Forest Eco-Class</label>
            <select value={ecoClass} onChange={(e) => setEcoClass(e.target.value)} className="w-full px-3 py-2.5 bg-parchment border border-forest-base/10 rounded-lg text-sm text-forest-deep outline-none focus:ring-1 focus:ring-forest-base/20">
              {ECO_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-forest-deep mb-2"><Leaf className="w-3.5 h-3.5" />Canopy Density</label>
            <div className="grid grid-cols-3 gap-2">
              {CANOPY_CLASSES.map((c) => (
                <button key={c} onClick={() => setCanopyClass(c)}
                  className={cn('px-2 py-2 rounded-lg text-xs font-medium transition-all border', canopyClass === c ? 'bg-forest-base text-white border-forest-base shadow-sm' : 'bg-parchment text-forest-deep/60 border-forest-base/10')}>
                  <span className="block text-[10px] font-mono opacity-70">{c}</span><span className="block mt-0.5">{canopyLabel(c)}</span>
                </button>
              ))}
            </div>
          </div>

          <label className={cn('flex items-start gap-3 p-3 rounded-xl border cursor-pointer', isViolation ? 'bg-red-50 border-red-200' : 'bg-parchment border-forest-base/10')}>
            <input type="checkbox" checked={isViolation} onChange={(e) => setIsViolation(e.target.checked)} className="w-4 h-4 mt-0.5 accent-forest-base" />
            <div>
              <p className={cn('text-xs font-medium', isViolation ? 'text-red-700' : 'text-forest-deep')}>Violation under Van Adhiniyam 2023</p>
              <p className="text-[11px] text-slate-base/50 mt-0.5">{isViolation ? 'Penal NPV = 2x standard NPV' : 'Toggle if land diverted without approval'}</p>
            </div>
          </label>

          <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium', badgeBg)}>
            <Leaf className="w-3.5 h-3.5" /><span>{ecoShort(ecoClass)} — {canopyLabel(canopyClass)}{isViolation && ' | PENAL (2x)'}</span>
          </div>

          <div className="bg-forest-deep rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/40 font-mono uppercase mb-1">NPV Rate (CEC 2008)</p>
            <div className="flex items-center justify-center gap-1">
              <IndianRupee className="w-5 h-5 text-forest-light" />
              <span className="text-2xl font-display font-bold text-white">{(npvRate / 100000).toFixed(2)}</span>
              <span className="text-sm text-white/50 ml-1">L/ha</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-base/50">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p>NPV rates per CEC 2008 matrix accepted by Hon'ble Supreme Court (IA No. 566). SCAF interest FY 2024-25: 3.35% p.a.</p>
          </div>

          <button onClick={() => setShowMatrix(!showMatrix)} className="cin-btn-ghost w-full text-xs py-2">{showMatrix ? 'Hide' : 'Show'} Full NPV Matrix</button>
          {showMatrix && (
            <div className="bg-parchment rounded-lg p-3 border border-forest-base/10 overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead><tr className="border-b border-forest-base/10">
                  <th className="text-left py-1.5 pr-2 text-slate-base/50 font-mono">Eco-Class</th>
                  <th className="text-right py-1.5 px-1 text-emerald-700 font-mono">VDF</th>
                  <th className="text-right py-1.5 px-1 text-amber-700 font-mono">MDF</th>
                  <th className="text-right py-1.5 pl-1 text-orange-700 font-mono">OF</th>
                </tr></thead>
                <tbody>{ECO_CLASSES.map((cls) => (
                  <tr key={cls} className={cn('border-b border-forest-base/5', cls === ecoClass && 'bg-forest-base/5')}>
                    <td className="py-1.5 pr-2 text-forest-deep font-medium">{ecoShort(cls)}</td>
                    {CANOPY_CLASSES.map((c) => (
                      <td key={c} className={cn('text-right py-1.5 px-1 font-mono', cls === ecoClass && c === canopyClass ? 'text-forest-base font-semibold' : 'text-slate-base/60')}>
                        ₹{(NPV_MATRIX[cls][c] / 100000).toFixed(2)}L
                      </td>
                    ))}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className={cn('rounded-xl p-4 text-center border', isViolation ? 'bg-red-700 border-red-500' : 'bg-forest-deep border-forest-light/10')}>
            <p className="text-[10px] text-white/40 font-mono uppercase mb-1">Total Financial Obligation</p>
            <div className="flex items-center justify-center gap-1">
              <IndianRupee className="w-5 h-5 text-forest-light" />
              <span className="text-3xl font-display font-bold text-white">{(grandTotal / 10000000).toFixed(2)}</span>
              <span className="text-sm text-white/50 ml-1">Cr</span>
            </div>
            {isViolation && <p className="text-[10px] text-red-300 font-mono mt-1 flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" />Includes 2x penal NPV</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-parchment rounded-lg p-3 border border-forest-base/10">
              <div className="flex items-center gap-1.5 mb-1"><TrendingUp className="w-3 h-3 text-forest-base" /><span className="text-[10px] font-mono text-slate-base/50 uppercase">Net Present Value</span></div>
              <p className="text-lg font-mono font-semibold text-forest-deep">₹{(adjustedNpv / 10000000).toFixed(2)} <span className="text-xs text-slate-base/40">Cr</span></p>
            </div>
            <div className="bg-parchment rounded-lg p-3 border border-forest-base/10">
              <div className="flex items-center gap-1.5 mb-1"><TreePine className="w-3 h-3 text-forest-base" /><span className="text-[10px] font-mono text-slate-base/50 uppercase">CA Raising Cost</span></div>
              <p className="text-lg font-mono font-semibold text-forest-deep">₹{(caRaising / 10000000).toFixed(2)} <span className="text-xs text-slate-base/40">Cr</span></p>
            </div>
          </div>

          <div className="bg-parchment rounded-lg p-3 border border-forest-base/10">
            <div className="flex items-center gap-1.5 mb-1"><Map className="w-3 h-3 text-forest-base" /><span className="text-[10px] font-mono text-slate-base/50 uppercase">Compensatory Afforestation Land</span></div>
            <p className="text-sm font-semibold text-forest-deep">{caLand} hectares required</p>
            <p className="text-[10px] text-slate-base/40 font-mono">2x diverted area per FC Act 1980</p>
          </div>
        </div>
      </div>
    </div>
  )
}
