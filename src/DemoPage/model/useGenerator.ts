import { generate, Logger } from '@oats-ts/oats-ts'

import { validator, loggers } from '@oats-ts/openapi'
import isNil from 'lodash/isNil'
import {
  EditorInput,
  ExplorerTreeState,
  FolderNode,
  GeneratorContextType,
  IssuesNode,
  ConfigurationNode,
  GeneratorSourceNode,
} from '../../types'
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
import { createGenerator, createReader, createWriter } from './oatsFactories'
import { verifyConfiguration } from './verifyConfiguration'
import { filterExplorerTree } from './filterExplorerTree'

export function _useGenerator(): GeneratorContextType {
  const [samples, setSamples] = useState<string[]>([])
  const [configuration, _setConfiguration] = useState<ConfigurationNode>(() =>
    storage.get<ConfigurationNode>(
      'configuration',
      {
        type: 'configuration',
        active: 'reader',
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
        writer: {
          lineSeparator: '\n',
          useFormatter: true,
          leadingComments: [],
          trailingComments: [],
          prettier: {},
        },
      },
      verifyConfiguration,
    ),
  )
  const [generatorSource, _setGeneratorSource] = useState<GeneratorSourceNode>({ type: 'generator-source', source: '' })

  const [treeFilter, setTreeFilter] = useState<string>('')
  const [isSamplesLoading, setSamplesLoading] = useState<boolean>(true)
  const [isGenerating, setGenerating] = useState<boolean>(true)
  const [isIssuesPanelOpen, setIssuesPanelOpen] = useState<boolean>(false)
  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState<boolean>(false)
  const [_output, setOutput] = useState<FolderNode>({ type: 'folder', path: '/', name: '/', children: [] })
  const [issues, setIssues] = useState<IssuesNode>({ type: 'issues', issues: [] })
  const [editorInput, _setEditorInput] = useState<EditorInput | undefined>(undefined)
  const [explorerTreeState, setExplorerTreeState] = useState<ExplorerTreeState>({})
  const [filteredOutput, setFilteredOutput] = useState(_output)

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
    if (editorInput?.type === 'configuration') {
      setEditorInput(configuration)
    }
  }

  function setGeneratorSource(source: GeneratorSourceNode) {
    _setGeneratorSource(source)
    if (editorInput?.type === 'generator-source') {
      setEditorInput(source)
    }
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
      writer: createWriter(configuration.writer),
    })
      .then(processResult)
      .finally(() => setGenerating(false))
  }, [configuration.reader, configuration.generator, configuration.writer])

  useDebounceEffect(runGenerator, 1000)

  const computeGeneratorSource = useCallback(() => {
    setGeneratorSource({
      type: 'generator-source',
      source: getGeneratorSource(configuration),
    })
  }, [configuration.reader, configuration.generator, configuration.writer])

  useDebounceEffect(computeGeneratorSource, 1000)

  const updateConfigurationStorage = useCallback(() => {
    storage.set('configuration', configuration)
  }, [configuration])

  useDebounceEffect(updateConfigurationStorage, 200)

  useEffect(() => {
    setFilteredOutput(filterExplorerTree(_output, treeFilter))
  }, [_output, treeFilter])

  return {
    output: filteredOutput,
    issues,
    samples,
    isLoading: isSamplesLoading || isGenerating,
    isConfigurationPanelOpen,
    isIssuesPanelOpen,
    editorInput,
    explorerTreeState,
    configuration,
    generatorSource,
    treeFilter,
    setExplorerTreeState,
    setEditorInput,
    setIssuesPanelOpen,
    setConfigurationPanelOpen,
    setConfiguration,
    setTreeFilter,
  }
}

export function useGeneratorContext(): GeneratorContextType {
  return useContext(GeneratorContext)
}
