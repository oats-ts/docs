import { useEffect } from 'react'

export function useDebounceEffect(callback: () => void, ms: number) {
  useEffect(() => {
    const timeout = setTimeout(callback, ms)
    return () => clearTimeout(timeout)
  }, [callback, ms])
}
