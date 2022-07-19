import { generate, Logger } from '@oats-ts/oats-ts'
import typescriptParser from 'prettier/parser-typescript'
import {
  formatters,
  validator,
  readers,
  writers,
  presets,
  nameProviders,
  pathProviders,
  generator as oatsGenerator,
  loggers,
  generators,
} from '@oats-ts/openapi'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'
import {
  EditorInput,
  ExplorerTreeState,
  FolderNode,
  GeneratorContextType,
  GeneratorNode,
  IssuesNode,
  ReaderNode,
} from '../../types'
import { Options } from 'prettier'
import { useContext, useEffect, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { storage, Ttl } from '../../storage'
import { getSampleFiles } from './getSampleFiles'
import { buildExplorerTree } from './buildExplorerTree'
import { GeneratorContext } from '../GeneratorContext'
import petStore from './pet-store.yaml'

const baseOptions: Options = {
  parser: 'typescript',
  plugins: [typescriptParser],
}

function createReader(input: ReaderNode) {
  switch (input.readerType) {
    case 'inline':
      return readers.test[input.inlineLanguage]({
        path: '',
        content: new Map().set('', input.inlineContent),
      })
    case 'remote':
      return readers[input.remoteProtocol][input.remoteLanguage](input.remotePath)
  }
}

function createGeneratorChildren(input: GeneratorNode) {
  if (!isNil(input.preset)) {
    return presets[input.preset]()
  }
  if (!isNil(input.generators)) {
    return input.generators.map((target) => generators.create(target))
  }
  return []
}

function createGenerator(input: GeneratorNode) {
  return oatsGenerator({
    nameProvider: nameProviders.default(),
    pathProvider: pathProviders[input.pathProviderType](input.rootPath),
    children: createGeneratorChildren(input),
  })
}

export function useGeneratorContext(): GeneratorContextType {
  const [samples, setSamples] = useState<string[]>([])
  const [reader, _setReader] = useState<ReaderNode>({
    type: 'reader',
    readerType: 'inline',
    inlineContent: petStore,
    inlineLanguage: 'yaml',
    remoteLanguage: 'yaml',
    remotePath: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/pet-store.yaml',
    remoteProtocol: 'https',
  })
  const [generator, setGenerator] = useState<GeneratorNode>({
    type: 'generator',
    preset: 'fullStack',
    pathProviderType: 'default',
    rootPath: '',
  })
  const [isSamplesLoading, setSamplesLoading] = useState<boolean>(true)
  const [isGenerating, setGenerating] = useState<boolean>(true)
  const [isIssuesPanelOpen, setIssuesPanelOpen] = useState<boolean>(false)
  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState<boolean>(false)
  const [output, setOutput] = useState<FolderNode>({ type: 'folder', path: '/', name: '/', children: [] })
  const [issues, setIssues] = useState<IssuesNode>({ type: 'issues', issues: [] })
  const [editorInput, setEditorInput] = useState<EditorInput | undefined>(reader)
  const [explorerTreeState, setExplorerTreeState] = useState<ExplorerTreeState>({})

  function processResult(output: Try<GeneratedFile[]>): void {
    setExplorerTreeState({})
    if (isSuccess(output)) {
      const { data } = output
      setOutput(buildExplorerTree(data))
    } else {
      setOutput({ type: 'folder', name: '/', path: '/', children: [] })
      setIssues({ type: 'issues', issues: output.issues })
    }
  }

  function setReader(input: ReaderNode): void {
    _setReader(input)
    setEditorInput(input)
    setIssues({ type: 'issues', issues: [] })
  }

  useEffect(() => {
    setSamplesLoading(true)
    const inStorage = storage.get<string[]>('samples')
    if (!isNil(inStorage) && Array.isArray(inStorage)) {
      setSamples(inStorage)
      setSamplesLoading(false)
    } else {
      getSampleFiles(['schemas', 'generated-schemas'])
        .then((fetchedSamples) => {
          setSamples(fetchedSamples)
          storage.set('samples', fetchedSamples, Ttl.hours(1))
        })
        .finally(() => setSamplesLoading(false))
    }
  }, [])

  useEffect(
    debounce(() => {
      setGenerating(true)
      setIssues({ type: 'issues', issues: [] })
      setOutput({ type: 'folder', children: [], name: '/', path: '/' })
      // TODO warnings not emmited for some reason
      const logger: Logger = (emitter) => {
        loggers.simple()(emitter)
        emitter.addListener('validator-step-completed', ({ issues }) => {
          setIssues((existing) => ({ ...existing, issues: [...existing.issues, ...issues] }))
        })
      }
      generate({
        logger,
        validator: validator(),
        reader: createReader(reader),
        generator: createGenerator(generator),
        writer: writers.typescript.memory({
          format: formatters.prettier({ ...baseOptions }),
        }),
      })
        .then(processResult)
        .finally(() => setGenerating(false))
    }, 500),
    [reader, generator],
  )

  return {
    generator,
    output,
    issues,
    samples,
    isLoading: isSamplesLoading || isGenerating,
    isConfigurationPanelOpen,
    isIssuesPanelOpen,
    editorInput,
    explorerTreeState,
    reader,
    setReader,
    setExplorerTreeState,
    setEditorInput,
    setIssuesPanelOpen,
    setConfigurationPanelOpen,
    setGenerator,
  }
}

export function useGenerator(): GeneratorContextType {
  return useContext(GeneratorContext)
}
