import { createContext } from 'react'
import { defaultGenerators } from './defaultGenerators'
import { GeneratorContextType } from '../types'

export const GeneratorContext = createContext<GeneratorContextType>({
  generators: defaultGenerators,
  language: 'json',
  source: '',
  samples: [],
  isLoading: true,
  isConfigurationPanelOpen: false,
  isIssuesPanelOpen: false,
  result: {
    data: '',
    issues: [],
    status: 'success',
  },
  setIssuesPanelOpen: () => {},
  setConfigurationPanelOpen: () => {},
  setGenerators: () => {},
  setLanguage: () => {},
  setSource: () => {},
  setSourceBySample: () => {},
})
