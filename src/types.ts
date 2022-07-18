import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'

export type ColorMode = 'dark' | 'light'
export type SourceLanguage = 'yaml' | 'json'
export type GeneratorStatus = 'success' | 'failure' | 'working'

export type Result = {
  status: GeneratorStatus
  data: string
  issues: Issue[]
}

export type GeneratorOutput = {
  status: GeneratorStatus
  data: FolderNode
  issues: Issue[]
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

export type ExplorerTreeState = {
  [path: string]: boolean
}

export type GeneratorContextType = {
  generators: Record<OpenAPIGeneratorTarget, boolean>
  language: SourceLanguage
  source: string
  result: Result
  results: GeneratorOutput
  samples: SampleFile[]
  isLoading: boolean
  isIssuesPanelOpen: boolean
  isConfigurationPanelOpen: boolean
  editorInput?: FileNode
  explorerTreeState: ExplorerTreeState
  setIssuesPanelOpen: (isOpen: boolean) => void
  setConfigurationPanelOpen: (isOpen: boolean) => void
  setSourceBySample: (sampleUrl: string) => void
  setGenerators: (generators: Record<OpenAPIGeneratorTarget, boolean>) => void
  setLanguage: (lang: SourceLanguage) => void
  setSource: (source: string) => void
  setEditorInput: (file?: FileNode) => void
  setExplorerTreeState: (state: ExplorerTreeState) => void
}

export type ColorModeContextType = {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
}

export type FileNode = {
  type: 'file'
  path: string
  name: string
  content: string
}

export type FolderNode = {
  type: 'folder'
  path: string
  name: string
  children: FileOrFolderNode[]
}

export type FileOrFolderNode = FileNode | FolderNode
