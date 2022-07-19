import { useContext, useState } from 'react'
import { ColorModeContext } from './ColorModeContext'
import { storage } from './storage'
import { ColorMode, ColorModeContextType } from './types'

export function useColorModeContext(): ColorModeContextType {
  const [colorMode, _setColorMode] = useState<ColorMode>(storage.get('colorMode', 'light'))

  const setColorMode = (mode: ColorMode) => {
    _setColorMode(mode)
    storage.set('colorMode', mode)
  }

  return {
    colorMode,
    setColorMode,
  }
}

export function useColorMode(): ColorModeContextType {
  return useContext(ColorModeContext)
}
