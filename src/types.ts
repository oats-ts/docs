import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'

export type SourceType = 'yaml' | 'json'
export type GeneratorStatus = 'success' | 'failure' | 'working'

export type Result = {
  status: GeneratorStatus
  data: string
  issues: Issue[]
}

export type ConfigurationContextType = {
  generators: Record<OpenAPIGeneratorTarget, boolean>
  sourceType: SourceType

  setGenerators: (generators: Record<OpenAPIGeneratorTarget, boolean>) => void
  setSourceType: (sourceType: SourceType) => void
}
