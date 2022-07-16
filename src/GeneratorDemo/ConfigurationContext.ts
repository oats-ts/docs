import { createContext } from 'react'
import { defaultGenerators } from './defaultGenerators'
import { ConfigurationContextType } from '../types'

export const ConfigurationContext = createContext<ConfigurationContextType>({
  generators: defaultGenerators,
  sourceType: 'json',
  setGenerators: () => {},
  setSourceType: () => {},
})
