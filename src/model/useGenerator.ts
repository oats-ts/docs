import { generate, GeneratorStepCompleted, ValidatorStepCompleted, version } from '@oats-ts/oats-ts'
import { AbstractLoggerPlugin } from '@oats-ts/openapi-logger/lib/AbstractLoggerPlugin'
import { validator, loggers } from '@oats-ts/openapi'
import { isNil } from 'lodash'
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
} from './types'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { storage, Ttl } from '../storage'
import { getSampleFiles } from './getSampleFiles'
import { buildExplorerTree } from './buildExplorerTree'
import { GeneratorContext } from './GeneratorContext'
import { useDebounceEffect } from './useDebounceEffect'
import { getGeneratorSource } from './getGeneratorSource'
import { createGenerator, createReader, createWriter } from './oatsFactories'
import { verifyConfiguration } from './verifyConfiguration'
import { filterExplorerTree } from './filterExplorerTree'
import { getPackageJsonSource } from './getPackageJsonSource'
import { findFileByPath } from './findFileByPath'
import { getVersionMap } from './getVersionMap'
import { defaults } from './defaults'

export function useGenerator(): GeneratorContextType {
  const [samples, setSamples] = useState<string[]>([])
  const [configuration, setConfiguration] = useState<ConfigurationNode>(() =>
    storage.get<ConfigurationNode>(
      'configuration',
      {
        type: 'configuration',
        active: 'reader',
        version,
        reader: defaults.readerConfiguration,
        validator: defaults.validatorConfiguration,
        generator: defaults.generatorConfiguration,
        writer: defaults.writerConfiguration,
        advancedOpen: defaults.advancedOpenConfiguration,
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
  const [isGenerating, setGenerating] = useState<boolean>(true)
  const [explorerTreeState, setExplorerTreeState] = useState<ExplorerTreeState>({})
  const [filteredOutput, setFilteredOutput] = useState(_output)
  const [editorInputKey, setEditorInputKey] = useState<EditorInputKey | undefined>(() =>
    storage.get<EditorInputKey>('editorInput', 'configuration'),
  )

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
    class IssueHandlerPlugin extends AbstractLoggerPlugin {
      protected override onValidatorStepCompleted({ issues: validatorIssues }: ValidatorStepCompleted): void {
        setIssues((i) => ({ ...i, issues: [...i.issues, ...validatorIssues] }))
      }
      protected override onGeneratorStepCompleted({
        dependencies,
        issues: genIssues,
      }: GeneratorStepCompleted<any>): void {
        getVersionMap('typescript', 'ts-node')
          .then((versionMap) => getPackageJsonSource(dependencies, versionMap))
          .then((source) => setPackageJson({ ...packageJson, source }))
        setIssues((i) => ({ ...i, issues: [...i.issues, ...genIssues] }))
      }
    }
    generate({
      plugins: [loggers.simple(), new IssueHandlerPlugin()],
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

  return {
    output: filteredOutput,
    issues,
    samples,
    isLoading: isSamplesLoading || isGenerating,
    editorInput,
    explorerTreeState,
    configuration,
    generatorSource,
    treeFilter,
    packageJson,
    setExplorerTreeState,
    setEditorInput: setEditorInputKey,
    setConfiguration,
    setTreeFilter,
  }
}

export function useGeneratorContext(): GeneratorContextType {
  return useContext(GeneratorContext)
}
