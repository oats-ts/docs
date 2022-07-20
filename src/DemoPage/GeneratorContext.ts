import { createContext } from 'react'
import { GeneratorContextType } from '../types'

export const GeneratorContext = createContext<GeneratorContextType>({} as GeneratorContextType)
