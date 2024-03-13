import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useState } from 'react'

import { removeCookie, setCookie } from '@/utils/common/cookie'
import { b64Decode, b64Encode } from '@/utils/common/base64'

export interface AuthType {
  _id: string
  iat: number
  exp: number
  token: string
}

export interface AuthContextType {
  auth: AuthType | null
  signIn: (authData: AuthType) => void
  signOut: () => void
}

interface AuthProviderProps {
  dataFromServer: string
  children: ReactNode
}

function getAuthInitialState(dataFromServer: string): AuthType | null {
  try {
    const data: AuthType = JSON.parse(b64Decode(dataFromServer))
    return data
  } catch (error) {
    return null
  }
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  signIn: () => {},
  signOut: () => {},
})

export function AuthProvider({ dataFromServer, children }: AuthProviderProps): JSX.Element {
  const router = useRouter()
  const [auth, setAuth] = useState(getAuthInitialState(dataFromServer))

  function signIn(auth: AuthType): void {
    setCookie('auth', b64Encode(JSON.stringify(auth)), 30)
    setAuth(auth)
  }

  function signOut(): void {
    removeCookie('auth')
    setTimeout(() => {
      setAuth(null)
      router.push('/login')
    }, 100)
  }

  return <AuthContext.Provider value={{ auth, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function isAuth(auth: string): boolean {
  if (!auth) {
    return false
  }

  let authData: AuthType | null = null
  let isExp: boolean = false

  try {
    authData = JSON.parse(b64Decode(auth))
  } catch (error) {
    console.error(error)
  }

  const now = Math.floor(Date.now() / 1000)
  if (authData?.exp && authData.exp <= now) {
    isExp = true
  }

  return !!authData && !isExp
}
