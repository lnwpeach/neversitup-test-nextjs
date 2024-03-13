interface FetchOptions extends RequestInit {
  timeout?: number
}

export async function fetchWithTimeout<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { timeout = 29000 } = options
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    clearTimeout(timeoutId)
    return await response.json()
  } catch (error: any) {
    clearTimeout(timeoutId)
    throw error
  }
}
