import { Routes, Route, useLocation } from 'react-router'
import { useAuth, AuthProvider } from '@/hooks/useAuthContext'
import { TrackProvider } from '@/hooks/useTrackContext'
import Header from '@/components/Header'
import PortalPage from '@/pages/PortalPage'
import AuthPage from '@/pages/AuthPage'
import OnboardingPage from '@/pages/OnboardingPage'
import PricingPage from '@/pages/PricingPage'
import KnowledgeLibraryPage from '@/pages/KnowledgeLibraryPage'
import ESGDashboardPage from '@/pages/ESGDashboardPage'
import EnvironmentalClearancePage from '@/pages/EnvironmentalClearancePage'
import AdminPage from '@/pages/AdminPage'
import { Loader2 } from 'lucide-react'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'
  const isOnboardingPage = location.pathname === '/onboarding'

  return (
    <>
      {!isAuthPage && !isOnboardingPage && <Header />}
      <Routes>
        <Route path="/" element={<PortalPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/library" element={<KnowledgeLibraryPage />} />
        <Route path="/esg" element={<ESGDashboardPage />} />
        <Route path="/clearance" element={<EnvironmentalClearancePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <TrackProvider>
        <AppLayout />
      </TrackProvider>
    </AuthProvider>
  )
}