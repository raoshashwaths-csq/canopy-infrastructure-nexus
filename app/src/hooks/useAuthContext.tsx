import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type User = {
  user_id: string
  email: string
  full_name: string
  persona: string
  organization?: string
  designation?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  persona: string | null
  login: (email: string, password: string) => Promise<void>
  register: (payload: Record<string, unknown>) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  persona: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login - in production, call API
    setUser({
      user_id: 'demo-user',
      email,
      full_name: 'Demo User',
      persona: 'ifs_officer',
    })
  }, [])

  const register = useCallback(async (payload: Record<string, unknown>) => {
    setUser({
      user_id: 'new-user',
      email: payload.email as string,
      full_name: (payload.full_name as string) || '',
      persona: (payload.persona as string) || 'civil_aspirant',
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        persona: user?.persona || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
