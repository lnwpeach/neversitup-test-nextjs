import { useContext } from 'react'

import { AuthContext, AuthContextType } from '../../components/providers/Auth'

export function useAuth(): AuthContextType {
  return useContext(AuthContext) as AuthContextType
}
