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
  generator,
  loggers,
} from '@oats-ts/openapi'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'
import { GeneratorContextType, Result, SampleFile, SourceLanguage } from '../types'
import { Options } from 'prettier'
import { useCallback, useEffect, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { storage, Ttl } from '../storage'
import { defaultGenerators } from './defaultGenerators'
import { getSampleFile, getSampleFiles } from './getSampleFiles'

const DUMMY_URL = ''

const baseOptions: Options = {
  parser: 'typescript',
  plugins: [typescriptParser],
}

export function useGenerator(): GeneratorContextType {
  const [samples, setSamples] = useState<SampleFile[]>([])
  const [source, setSource] = useState<string>(() => storage.get('source', ''))
  const [language, setLanguage] = useState<SourceLanguage>(() => storage.get('language', 'json'))
  const [generators, setGenerators] = useState<Record<OpenAPIGeneratorTarget, boolean>>(() =>
    storage.get('generators', defaultGenerators),
  )
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isIssuesPanelOpen, setIssuesPanelOpen] = useState<boolean>(false)
  const [isConfigurationDialogOpen, setConfigurationDialogOpen] = useState<boolean>(false)

  const [result, setResult] = useState<Result>({ data: '', status: 'success', issues: [] })

  function processResult(output: Try<GeneratedFile[]>): void {
    if (isSuccess(output)) {
      const { data } = output
      switch (data.length) {
        case 0:
          return setResult((result) => ({ ...result, data: '', status: 'success' }))
        default:
          return setResult((result) => ({ ...result, data: data[0]?.content!, status: 'success' }))
      }
    } else {
      setResult({ data: '', issues: output.issues, status: 'failure' })
    }
  }

  const setSourceBySample = useCallback((uri: string): void => {
    setLoading(true)
    getSampleFile(uri)
      .then((source) => {
        setLanguage('json')
        setSource(source)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(
    debounce(() => {
      storage.set('source', source, Ttl.days(1))
    }, 1000),
    [source],
  )

  useEffect(
    debounce(() => {
      storage.set('language', language, Ttl.days(1))
    }, 1000),
    [language],
  )

  useEffect(
    debounce(() => {
      storage.set('generators', generators, Ttl.days(1))
    }, 1000),
    [generators],
  )

  useEffect(() => {
    setLoading(true)
    const inStorage = storage.get<SampleFile[]>('samples')
    if (!isNil(inStorage) && Array.isArray(inStorage)) {
      setSamples(inStorage)
      setLoading(false)
    } else {
      getSampleFiles(['schemas', 'generated-schemas'])
        .then((fetchedSamples) => {
          setSamples(fetchedSamples)
          storage.set('samples', fetchedSamples, Ttl.hours(1))
        })
        .finally(() => setLoading(false))
    }
  }, [])

  useEffect(
    debounce(() => {
      setResult({ data: '', issues: [], status: 'working' })
      // TODO warnings not emmited for some reason
      const logger: Logger = (emitter) => {
        loggers.simple()(emitter)
        emitter.addListener('validator-step-completed', ({ issues }) => {
          setResult((result) => ({ ...result, issues }))
        })
      }
      generate({
        logger,
        validator: validator(),
        reader: readers.test[language]({
          path: DUMMY_URL,
          content: new Map().set(DUMMY_URL, source),
        }),
        generator: generator({
          nameProvider: nameProviders.default(),
          pathProvider: pathProviders.singleFile('test.ts'),
          children: presets.fullStack({ overrides: generators }),
        }),
        writer: writers.typescript.memory({
          format: formatters.prettier({ ...baseOptions }),
        }),
      }).then(processResult)
    }, 500),
    [source, language, generators],
  )

  return {
    generators,
    result,
    source,
    language,
    samples,
    isLoading,
    isConfigurationPanelOpen: isConfigurationDialogOpen,
    isIssuesPanelOpen,
    setIssuesPanelOpen,
    setConfigurationPanelOpen: setConfigurationDialogOpen,
    setGenerators,
    setSource,
    setLanguage,
    setSourceBySample,
  }
}
