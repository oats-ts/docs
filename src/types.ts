import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'

export type SourceLanguage = 'yaml' | 'json'
export type GeneratorStatus = 'success' | 'failure' | 'working'

export type Result = {
  status: GeneratorStatus
  data: string
  issues: Issue[]
}

export type GeneratorContextType = {
  generators: Record<OpenAPIGeneratorTarget, boolean>
  language: SourceLanguage
  source: string
  result: Result

  setGenerators: (generators: Record<OpenAPIGeneratorTarget, boolean>) => void
  setLanguage: (lang: SourceLanguage) => void
  setSource: (source: string) => void
}
