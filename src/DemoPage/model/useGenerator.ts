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
  PackageJsonNode,
  EditorInputKey,
} from '../../types'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { storage, Ttl } from '../../storage'
import { fetchSampleFile, getSampleFiles, guessLanguage } from './getSampleFiles'
import { buildExplorerTree } from './buildExplorerTree'
import { GeneratorContext } from '../GeneratorContext'
import { useDebounceEffect } from './useDebounceEffect'
import { getGeneratorSource } from './getGeneratorSource'
import { createGenerator, createReader, createWriter } from './oatsFactories'
import { verifyConfiguration } from './verifyConfiguration'
import { filterExplorerTree } from './filterExplorerTree'
import { getPackageJsonSource } from './getPackageJsonSource'
import { findFileByPath } from './findFileByPath'
import { defaultPrettierConfig } from './deafultPrettierConfig'

export function useGenerator(): GeneratorContextType {
  const [samples, setSamples] = useState<string[]>([])
  const [configuration, setConfiguration] = useState<ConfigurationNode>(() =>
    storage.get<ConfigurationNode>(
      'configuration',
      {
        type: 'configuration',
        active: 'reader',
        validator: {
          enabled: true,
        },
        reader: {
          readerType: 'remote',
          inlineContent: '',
          inlineLanguage: 'json',
          remoteLanguage: 'mixed',
          remotePath: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',
          remoteProtocol: 'https',
        },
        generator: {
          preset: 'fullStack',
          pathProviderType: 'default',
          rootPath: '/',
          configurationStyle: 'preset',
          generators: [],
        },
        writer: {
          writerType: 'file',
          lineSeparator: '\n',
          useFormatter: true,
          leadingComments: [],
          trailingComments: [],
          prettier: defaultPrettierConfig,
        },
      },
      verifyConfiguration,
    ),
  )
  const [generatorSource, setGeneratorSource] = useState<GeneratorSourceNode>({ type: 'generator-source', source: '' })
  const [packageJson, setPackageJson] = useState<PackageJsonNode>({ type: 'package-json', source: '' })
  const [issues, setIssues] = useState<IssuesNode>({ type: 'issues', issues: [] })
  const [_output, setOutput] = useState<FolderNode>({ type: 'folder', path: '/', name: '/', children: [] })

  const [treeFilter, setTreeFilter] = useState<string>('')
  const [isSamplesLoading, setSamplesLoading] = useState<boolean>(true)
  const [isRemoteSampleLoading, setRemoteSampleLoading] = useState<boolean>(false)
  const [isGenerating, setGenerating] = useState<boolean>(true)
  const [explorerTreeState, setExplorerTreeState] = useState<ExplorerTreeState>({})
  const [filteredOutput, setFilteredOutput] = useState(_output)
  const [editorInputKey, setEditorInputKey] = useState<EditorInputKey | undefined>(() => storage.get('editorInput'))

  const editorInput = useMemo((): EditorInput | undefined => {
    if (isNil(editorInputKey)) {
      return undefined
    }
    if (editorInputKey.startsWith('file')) {
      const [, path] = editorInputKey.split('::')
      return findFileByPath(path!, _output)
    }
    switch (editorInputKey) {
      case 'configuration':
        return configuration
      case 'generator-source':
        return generatorSource
      case 'issues':
        return issues
      case 'package-json':
        return packageJson
      default:
        return undefined
    }
  }, [editorInputKey, generatorSource, issues, packageJson, _output, configuration])

  function processResult(output: Try<GeneratedFile[]>): void {
    if (isSuccess(output)) {
      const { data } = output
      setOutput(buildExplorerTree(data))
    } else {
      setOutput({ type: 'folder', name: '/', path: '/', children: [] })
      setIssues({ type: 'issues', issues: output.issues })
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
      emitter.addListener('validator-step-completed', ({ issues: validatorIssues }) => {
        setIssues({ type: 'issues', issues: validatorIssues })
      })
      emitter.addListener('generator-completed', ({ dependencies }) => {
        setPackageJson({ ...packageJson, source: getPackageJsonSource(dependencies) })
      })
    }
    generate({
      logger,
      validator: configuration.validator.enabled ? validator() : undefined,
      reader: createReader(configuration.reader),
      generator: createGenerator(configuration.generator),
      writer: createWriter(configuration.writer),
    })
      .then(processResult)
      .finally(() => setGenerating(false))
  }, [configuration.reader, configuration.validator, configuration.generator, configuration.writer])

  useDebounceEffect(runGenerator, 1000)

  const computeGeneratorSource = useCallback(() => {
    setGeneratorSource({
      type: 'generator-source',
      source: getGeneratorSource(configuration),
    })
  }, [configuration.reader, configuration.validator, configuration.generator, configuration.writer])

  useDebounceEffect(computeGeneratorSource, 1000)

  const updateConfigurationStorage = useCallback(() => {
    storage.set('configuration', configuration)
  }, [configuration])

  useDebounceEffect(updateConfigurationStorage, 200)

  const updateEditorInputStorage = useCallback(() => {
    storage.set('editorInput', editorInputKey)
  }, [editorInputKey])

  useDebounceEffect(updateEditorInputStorage, 200)

  useEffect(() => {
    setFilteredOutput(filterExplorerTree(_output, treeFilter))
  }, [_output, treeFilter])

  const loadRemoteAsInline = async () => {
    setRemoteSampleLoading(true)

    try {
      const content = await fetchSampleFile(configuration.reader.remotePath)
      setConfiguration({
        ...configuration,
        reader: {
          ...configuration.reader,
          readerType: 'inline',
          inlineContent: content,
          inlineLanguage: guessLanguage(content) ?? configuration.reader.inlineLanguage,
        },
      })
      setEditorInputKey('configuration')
    } catch (e) {
    } finally {
      setRemoteSampleLoading(false)
    }
  }

  return {
    output: filteredOutput,
    issues,
    samples,
    isLoading: isSamplesLoading || isGenerating || isRemoteSampleLoading,
    isRemoteSampleLoading,
    editorInput,
    explorerTreeState,
    configuration,
    generatorSource,
    treeFilter,
    packageJson,
    loadRemoteAsInline,
    setExplorerTreeState,
    setEditorInput: setEditorInputKey,
    setConfiguration,
    setTreeFilter,
  }
}

export function useGeneratorContext(): GeneratorContextType {
  return useContext(GeneratorContext)
}
