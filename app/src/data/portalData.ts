import { seededArticles2026 } from './seedArticles2026'

export interface KnowledgeCard {
  id: string
  title: string
  summary: string
  category: string
  tags: string[]
  date: string
  source: string
  track: 'civil' | 'corporate' | 'both'
  status?: string
  clearanceCode?: string
}

const CIVIL_TRACK: KnowledgeCard[] = seededArticles2026.filter((c) => c.track === 'civil' || c.track === 'both')
const CORPORATE_TRACK: KnowledgeCard[] = seededArticles2026.filter((c) => c.track === 'corporate' || c.track === 'both')

export function getFeed(track: 'civil' | 'corporate') {
  const cards = track === 'civil' ? CIVIL_TRACK : CORPORATE_TRACK
  return { cards, source: 'seed' as const, loading: false }
}
