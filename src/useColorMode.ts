import { useEffect, useState } from 'react'
import { ColorMode } from './types'

// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
export function useColorMode(): ColorMode {
  const [colorMode, setColorMode] = useState<ColorMode>(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light',
  )
  useEffect(() => {
    window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener('change', (event) => {
      setColorMode(event.matches ? 'dark' : 'light')
    })
  }, [])
  return colorMode
}
