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
  samples: SampleFile[]
  isLoading: boolean

  setSourceBySample(sampleUrl: string): void
  setGenerators: (generators: Record<OpenAPIGeneratorTarget, boolean>) => void
  setLanguage: (lang: SourceLanguage) => void
  setSource: (source: string) => void
}

export type GhFileDescriptor = {
  path: string
  mode: string
  type: 'tree' | 'blob'
  sha: string
  size: number
  url: string
}

export type SampleFile = {
  name: string
  uri: string
}
