const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// ── Auth ──
export async function loginUser(email: string, password: string) {
  return http('/auth/token', { method: 'POST', body: JSON.stringify({ email, password }) })
}
export async function registerUser(payload: Record<string, unknown>) {
  return http('/auth/register', { method: 'POST', body: JSON.stringify(payload) })
}
export async function getCurrentUser() {
  return http('/auth/me')
}

// ── Library ──
export async function fetchLibraryDocuments(params?: Record<string, unknown>) {
  const qs = params ? '?' + new URLSearchParams(params as Record<string, string>) : ''
  return http(`/library/documents${qs}`)
}
export async function hybridSearch(query: string, limit = 10) {
  return http('/library/search', { method: 'POST', body: JSON.stringify({ query, limit }) })
}
export async function seedHistoricalDocuments() {
  return http('/library/seed-historical', { method: 'POST' })
}
export async function ingestDocument(url: string, text: string, title = '') {
  return http('/tasks/ingest', { method: 'POST', body: JSON.stringify({ url, text, title }) })
}

// ── Ontology ──
export async function fetchOntologySummary() {
  return http('/library/ontology/summary')
}
export async function fetchOntologyMappings() {
  return http('/karmayogi/mappings')
}
export async function createOntologyMapping(payload: Record<string, unknown>) {
  return http('/karmayogi/mappings', { method: 'POST', body: JSON.stringify(payload) })
}

// ── Vriksh ──
export async function vrikshQuery(query: string) {
  return http('/tasks/query', { method: 'POST', body: JSON.stringify({ query }) })
}

// ── ESG ──
export async function fetchValueChainSummary(companyId: string) {
  return http(`/esg/value-chain/summary?company_id=${companyId}`)
}
export async function fetchVendors(companyId: string) {
  return http(`/esg/value-chain/vendors?company_id=${companyId}`)
}
export async function createVendor(payload: Record<string, unknown>) {
  return http('/esg/value-chain/vendors', { method: 'POST', body: JSON.stringify(payload) })
}
export async function fetchCarbonSectors() {
  return http('/esg/carbon-market/sectors')
}
export async function projectCarbonCompliance(payload: Record<string, unknown>) {
  return http('/esg/carbon-market/project', { method: 'POST', body: JSON.stringify(payload) })
}
export async function fetchPlots(companyId: string) {
  return http(`/esg/geospatial/plots?company_id=${companyId}`)
}
export async function createPlot(payload: Record<string, unknown>) {
  return http('/esg/geospatial/plots', { method: 'POST', body: JSON.stringify(payload) })
}
export async function fetchFpicProjects(companyId: string) {
  return http(`/esg/social-framework/projects?company_id=${companyId}`)
}
export async function createFpicProject(payload: Record<string, unknown>) {
  return http('/esg/social-framework/projects', { method: 'POST', body: JSON.stringify(payload) })
}
export async function fetchMaterialityEntries(companyId: string) {
  return http(`/esg/materiality/entries?company_id=${companyId}`)
}
export async function createMaterialityEntry(payload: Record<string, unknown>) {
  return http('/esg/materiality/entries', { method: 'POST', body: JSON.stringify(payload) })
}

// ── Clearance Projects ──
export async function createClearanceProject(payload: Record<string, unknown>) {
  return http('/esg/clearance-projects/', { method: 'POST', body: JSON.stringify(payload) })
}
export async function fetchClearanceProjects(companyId: string) {
  return http(`/esg/clearance-projects/?company_id=${companyId}`)
}

// ── Clearance Calculators ──
export async function calculateCatPlan(payload: Record<string, unknown>) {
  return http('/esg/cat-plan/calculate', { method: 'POST', body: JSON.stringify(payload) })
}
export async function calculateGreenCredit(payload: Record<string, unknown>) {
  return http('/esg/green-credit/calculate', { method: 'POST', body: JSON.stringify(payload) })
}
export async function calculateWildlifeMitigation(payload: Record<string, unknown>) {
  return http('/esg/wildlife-mitigation/calculate', { method: 'POST', body: JSON.stringify(payload) })
}
export async function calculateCrzMangrove(payload: Record<string, unknown>) {
  return http('/esg/crz-mangrove/calculate', { method: 'POST', body: JSON.stringify(payload) })
}

// ── Leads ──
export async function captureLead(payload: Record<string, unknown>) {
  return http('/leads/capture', { method: 'POST', body: JSON.stringify(payload) })
}

export { API_BASE }
