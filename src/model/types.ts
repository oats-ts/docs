import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { Issue } from '@oats-ts/validators'
import { HttpMethod } from '@oats-ts/openapi-http'
import { CommentConfig } from '@oats-ts/typescript-writer'
import { Options } from 'prettier'

export type ColorMode = 'dark' | 'light'
export type SourceLanguage = 'yaml' | 'json' | 'mixed'
export type RemoteProtocol = 'http' | 'https' | 'file' | 'mixed'
export type GeneratorPreset = 'fullStack' | 'client' | 'server'
export type PathProviderType = 'default' | 'singleFile' | 'byTarget' | 'byName'
export type GeneratorConfigurationStyle = 'preset' | 'generators'
export type WriterType = 'file' | 'memory'

export type EditorInputKey =
  | ConfigurationNode['type']
  | IssuesNode['type']
  | GeneratorSourceNode['type']
  | PackageJsonNode['type']
  | `${FileNode['type']}::${string}`

export type GhFileDescriptor = {
  path: string
  mode: string
  type: 'tree' | 'blob'
  sha: string
  size: number
  url: string
}

export type ExplorerTreeState = {
  [path: string]: boolean
}

export type GeneratorContextType = {
  // Configuration
  configuration: ConfigurationNode
  editorInput?: EditorInput
  explorerTreeState: ExplorerTreeState
  samples: string[]
  treeFilter: string
  // Generator output
  output: FolderNode
  issues: IssuesNode
  isLoading: boolean
  generatorSource: GeneratorSourceNode
  packageJson: PackageJsonNode
  // Setters
  setTreeFilter: (filter: string) => void
  setConfiguration: (node: ConfigurationNode) => void
  setEditorInput: (key?: EditorInputKey) => void
  setExplorerTreeState: (state: ExplorerTreeState) => void
}

export type ColorModeContextType = {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
}

export type GeneratorSourceNode = {
  type: 'generator-source'
  source: string
}

export type PackageJsonNode = {
  type: 'package-json'
  source: string
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

export type IssuesNode = {
  type: 'issues'
  issues: Issue[]
}

export type ReaderConfiguration = {
  remoteProtocol: RemoteProtocol
  remoteLanguage: SourceLanguage
  remotePath: string
}

export type ValidatorConfiguration = {
  enabled: boolean
}

export type PresetConfig = {
  documentation: boolean
  debugCookies: boolean
  validateResponses: boolean
  allowCredentials: boolean
  maxAge: number
  allowedOrigins: boolean | string[]
  allowedRequestHeaders: boolean | string[]
  allowedResponseHeaders: boolean | string[]
  allowedMethods: boolean | HttpMethod[]
}

export type PresetConfigField = keyof PresetConfig

export type GeneratorConfiguration = {
  configurationStyle: GeneratorConfigurationStyle
  pathProviderType: PathProviderType
  rootPath: string
  preset: GeneratorPreset
  generators: OpenAPIGeneratorTarget[]
  presetConfig: Partial<PresetConfig>
}

export type PrettierConfiguration = Pick<
  Options,
  | 'arrowParens'
  | 'bracketSameLine'
  | 'bracketSpacing'
  | 'endOfLine'
  | 'printWidth'
  | 'tabWidth'
  | 'useTabs'
  | 'quoteProps'
  | 'semi'
  | 'singleQuote'
  | 'trailingComma'
>

export type WriterConfiguration = {
  writerType: WriterType
  prettier: PrettierConfiguration
  useFormatter: boolean
  leadingComments: CommentConfig[]
  trailingComments: CommentConfig[]
  lineSeparator: '\n' | '\r\n'
}

export type AdvancedOpenConfiguration = {
  reader: boolean
  writer: boolean
  validator: boolean
  generator: boolean
}

export type ConfigurationNode = {
  type: 'configuration'
  version: string
  active: 'reader' | 'validator' | 'generator' | 'writer'
  reader: ReaderConfiguration
  validator: ValidatorConfiguration
  generator: GeneratorConfiguration
  advancedOpen: AdvancedOpenConfiguration
  writer: WriterConfiguration
}

export type FsNode = FileNode | FolderNode

export type EditorInput = FsNode | ConfigurationNode | IssuesNode | GeneratorSourceNode | PackageJsonNode
