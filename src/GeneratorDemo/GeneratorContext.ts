import { createContext } from 'react'
import { defaultGenerators } from './defaultGenerators'
import { GeneratorContextType } from '../types'

export const GeneratorContext = createContext<GeneratorContextType>({
  generators: defaultGenerators,
  language: 'json',
  source: '',
  result: {
    data: '',
    issues: [],
    status: 'success',
  },
  setGenerators: () => {},
  setLanguage: () => {},
  setSource: () => {},
})
