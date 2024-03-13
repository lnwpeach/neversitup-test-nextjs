import { fetchWithTimeout } from '../common/fetchWithTimeout'
import { useAuth } from './useAuth'

interface FetchOptions extends RequestInit {
  timeout?: number
}

export function useApi(): (url: string, options?: FetchOptions) => Promise<any> {
  const { auth } = useAuth()

  return async (url: string, options?: FetchOptions) => {
    return await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`,
        ...options?.headers,
      },
    })
  }
}
