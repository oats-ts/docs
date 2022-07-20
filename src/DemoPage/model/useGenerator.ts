import { generate, Logger } from '@oats-ts/oats-ts'
import typescriptParser from 'prettier/parser-typescript'
import { formatters, validator, writers, loggers } from '@oats-ts/openapi'
import isNil from 'lodash/isNil'
import {
  EditorInput,
  ExplorerTreeState,
  FolderNode,
  GeneratorContextType,
  IssuesNode,
  ConfigurationNode,
} from '../../types'
import { Options } from 'prettier'
import { useCallback, useContext, useEffect, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { storage, Ttl } from '../../storage'
import { getSampleFiles } from './getSampleFiles'
import { buildExplorerTree } from './buildExplorerTree'
import { GeneratorContext } from '../GeneratorContext'
import petStore from './pet-store.yaml'
import { useDebounceEffect } from './useDebounceEffect'
import { getGeneratorSource } from './getGeneratorSource'
import { createGenerator, createReader } from './oatsFactories'
import { verifyConfiguration } from './verifyConfiguration'

const baseOptions: Options = {
  parser: 'typescript',
  plugins: [typescriptParser],
}

export function useGeneratorContext(): GeneratorContextType {
  const [samples, setSamples] = useState<string[]>([])
  const [configuration, _setConfiguration] = useState<ConfigurationNode>(() =>
    storage.get(
      'configuration',
      {
        type: 'configuration',
        active: 'generator-source',
        generator: {
          preset: 'fullStack',
          pathProviderType: 'default',
          rootPath: '/',
          configurationStyle: 'preset',
          generators: [],
        },
        reader: {
          readerType: 'inline',
          inlineContent: petStore,
          inlineLanguage: 'yaml',
          remoteLanguage: 'yaml',
          remotePath: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/pet-store.yaml',
          remoteProtocol: 'https',
        },
      },
      verifyConfiguration,
    ),
  )
  const [generatorSource, _setGeneratorSource] = useState<string>('')

  const [isSamplesLoading, setSamplesLoading] = useState<boolean>(true)
  const [isGenerating, setGenerating] = useState<boolean>(true)
  const [isIssuesPanelOpen, setIssuesPanelOpen] = useState<boolean>(false)
  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState<boolean>(false)
  const [output, setOutput] = useState<FolderNode>({ type: 'folder', path: '/', name: '/', children: [] })
  const [issues, setIssues] = useState<IssuesNode>({ type: 'issues', issues: [] })
  const [editorInput, _setEditorInput] = useState<EditorInput | undefined>(configuration)
  const [explorerTreeState, setExplorerTreeState] = useState<ExplorerTreeState>({})

  function processResult(output: Try<GeneratedFile[]>): void {
    if (isSuccess(output)) {
      const { data } = output
      setOutput(buildExplorerTree(data))
    } else {
      setOutput({ type: 'folder', name: '/', path: '/', children: [] })
      setIssues({ type: 'issues', issues: output.issues })
    }
  }

  function setEditorInput(input?: EditorInput): void {
    _setEditorInput(input)
  }

  function setConfiguration(configuration: ConfigurationNode) {
    _setConfiguration(configuration)
    setEditorInput(configuration)
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

  const runGenerator = useCallback(() => {
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
      reader: createReader(configuration.reader),
      generator: createGenerator(configuration.generator),
      writer: writers.typescript.memory({
        format: formatters.prettier({ ...baseOptions }),
      }),
    })
      .then(processResult)
      .finally(() => setGenerating(false))
  }, [configuration.reader, configuration.generator])

  useDebounceEffect(runGenerator, 1000)

  const computeGeneratorSource = useCallback(() => {
    _setGeneratorSource(getGeneratorSource(configuration))
  }, [configuration.reader, configuration.generator])

  useDebounceEffect(computeGeneratorSource, 1000)

  const updateConfigurationStorage = useCallback(() => {
    storage.set('configuration', configuration)
  }, [configuration])

  useDebounceEffect(updateConfigurationStorage, 200)

  return {
    output,
    issues,
    samples,
    isLoading: isSamplesLoading || isGenerating,
    isConfigurationPanelOpen,
    isIssuesPanelOpen,
    editorInput,
    explorerTreeState,
    configuration,
    generatorSource,
    setExplorerTreeState,
    setEditorInput,
    setIssuesPanelOpen,
    setConfigurationPanelOpen,
    setConfiguration,
  }
}

export function useGenerator(): GeneratorContextType {
  return useContext(GeneratorContext)
}
