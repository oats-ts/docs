import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'

export type ColorMode = 'dark' | 'light'
export type SourceLanguage = 'yaml' | 'json' | 'mixed'
export type RemoteProtocol = 'http' | 'https' | 'mixed'
export type GeneratorStatus = 'success' | 'failure' | 'working'

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
  source: OpenAPIInputNode
  inlineSource: InlineOpenAPINode
  remoteSource: RemoteOpenAPINode
  editorInput?: EditorInput
  output: FolderNode
  issues: IssuesNode
  samples: string[]
  isLoading: boolean
  isIssuesPanelOpen: boolean
  isConfigurationPanelOpen: boolean
  explorerTreeState: ExplorerTreeState
  setIssuesPanelOpen: (isOpen: boolean) => void
  setConfigurationPanelOpen: (isOpen: boolean) => void
  setGenerators: (generators: Record<OpenAPIGeneratorTarget, boolean>) => void
  setSource: (source: OpenAPIInputNode) => void
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

export type FsNode = FileNode | FolderNode

export type InlineOpenAPINode = {
  type: 'inline-openapi'
  language: SourceLanguage
  content: string
}

export type RemoteOpenAPINode = {
  type: 'remote-openapi'
  language: SourceLanguage
  protocol: RemoteProtocol
  path: string
}

export type OpenAPIInputNode = InlineOpenAPINode | RemoteOpenAPINode

export type IssuesNode = {
  type: 'issues'
  issues: Issue[]
}

export type EditorInput = FsNode | OpenAPIInputNode | IssuesNode
