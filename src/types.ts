import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'

export type ColorMode = 'dark' | 'light'
export type SourceLanguage = 'yaml' | 'json' | 'mixed'
export type RemoteProtocol = 'http' | 'https' | 'mixed'
export type GeneratorPreset = 'fullStack' | 'client' | 'server'
export type PathProviderType = 'default' | 'singleFile' | 'byTarget' | 'byName'

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
  // Configuration
  reader: ReaderNode
  generator: GeneratorNode
  editorInput?: EditorInput
  explorerTreeState: ExplorerTreeState
  samples: string[]
  // Generator output
  output: FolderNode
  issues: IssuesNode
  isLoading: boolean
  // Cosmetic stuff
  isIssuesPanelOpen: boolean
  isConfigurationPanelOpen: boolean
  // Setters
  setIssuesPanelOpen: (isOpen: boolean) => void
  setConfigurationPanelOpen: (isOpen: boolean) => void
  setReader: (source: ReaderNode) => void
  setGenerator: (generator: GeneratorNode) => void
  setEditorInput: (file?: EditorInput) => void
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
  children: FsNode[]
}

export type ReaderNode = {
  type: 'reader'
  readerType: 'inline' | 'remote'
  inlineLanguage: SourceLanguage
  inlineContent: string
  remoteProtocol: RemoteProtocol
  remoteLanguage: SourceLanguage
  remotePath: string
}

export type IssuesNode = {
  type: 'issues'
  issues: Issue[]
}

export type GeneratorNode = {
  type: 'generator'
  pathProviderType: PathProviderType
  rootPath: string
  preset?: GeneratorPreset
  generators?: OpenAPIGeneratorTarget[]
}

export type FsNode = FileNode | FolderNode

export type InputNode = ReaderNode | GeneratorNode

export type EditorInput = FsNode | ReaderNode | IssuesNode | GeneratorNode
