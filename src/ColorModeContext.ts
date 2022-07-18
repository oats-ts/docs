import { createContext } from 'react'
import { ColorModeContextType } from './types'

export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'light',
  setColorMode: () => {},
})
