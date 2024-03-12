import { fetchWithTimeout } from '../common/fetchWithTimeout'
import { useAuth } from './useAuth'

interface FetchOptions extends RequestInit {
  timeout?: number
}

export function useApi(): (url: string, options?: FetchOptions) => Promise<any> {
  const { token } = useAuth()

  return async (url: string, options?: FetchOptions) => {
    return await fetchWithTimeout(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    })
  }
}
