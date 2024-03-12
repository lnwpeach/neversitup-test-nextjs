import { useEffect, useRef } from 'react'

function useEffectDependency(func: () => void, deps: any[]): void {
  const firstRender = useRef(false)

  useEffect(() => {
    if (firstRender.current) func()
    else firstRender.current = true
  }, deps)
}

export default useEffectDependency
