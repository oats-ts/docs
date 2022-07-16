import { Issue } from '@oats-ts/validators'

export type SourceType = 'yaml' | 'json'
export type GeneratorStatus = 'success' | 'failure' | 'working'

export type Result = {
  status: GeneratorStatus
  data: string
  issues: Issue[]
}
