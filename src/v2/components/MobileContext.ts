import { noop } from 'lodash'
import { createContext, useContext, useState } from 'react'

export type MobileContextType = {
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export const MobileContext = createContext<MobileContextType>({ isMenuOpen: false, setMenuOpen: noop })

export const useMobileContext = () => useContext(MobileContext)

export const useProvideMobileContext = (): MobileContextType => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return { isMenuOpen, setMenuOpen }
}
