import { createContext, useContext, useState, type ReactNode } from 'react'

type Track = 'civil' | 'corporate'

type TrackContextType = {
  activeTrack: Track
  toggleTrack: () => void
}

const TrackContext = createContext<TrackContextType>({
  activeTrack: 'civil',
  toggleTrack: () => {},
})

export function TrackProvider({ children }: { children: ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<Track>('civil')

  const toggleTrack = () => {
    setActiveTrack((prev) => (prev === 'civil' ? 'corporate' : 'civil'))
  }

  return (
    <TrackContext.Provider value={{ activeTrack, toggleTrack }}>
      {children}
    </TrackContext.Provider>
  )
}

export function useTrack() {
  return useContext(TrackContext)
}
