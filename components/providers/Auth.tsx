"use client";
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useState } from 'react'

import { removeCookie, setCookie } from '@/utils/common/cookie'

export interface AuthContextType {
  token: string | null
  signIn: (tokenData: string) => void
  signOut: () => void
}

interface AuthProviderProps {
  dataFromServer: string | null
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  signIn: () => {},
  signOut: () => {},
})

export function AuthProvider({ dataFromServer, children }: AuthProviderProps): JSX.Element {
  const router = useRouter()
  const [token, setToken] = useState(dataFromServer)

  function signIn(token: string): void {
    console.log('signIn')
    setCookie('auth', token, 30)
    setToken(token)
  }

  function signOut(): void {
    removeCookie('auth')
    setTimeout(() => {
      setToken(null)
      router.push('/login')
    }, 100)
  }

  return <AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>
}
