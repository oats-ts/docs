import { generate } from '@oats-ts/oats-ts'
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
import { GeneratorContextType, Result, SampleFile, SourceLanguage } from '../types'
import { Options } from 'prettier'
import { useCallback, useEffect, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { IssueTypes } from '@oats-ts/validators'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import debounce from 'lodash/debounce'
import { storage } from '../storage'
import { defaultGenerators } from './defaultGenerators'
import { getSampleFile, getSampleFiles } from './getSampleFiles'

const DUMMY_URL = 'https://dummy.schema.com'

const baseOptions: Options = {
  parser: 'typescript',
  plugins: [typescriptParser],
}

export function useGenerator(): GeneratorContextType {
  const [samples, setSamples] = useState<SampleFile[]>([])
  const [source, setSource] = useState<string>(() => storage.get('source'))
  const [language, setLanguage] = useState<SourceLanguage>(() => 'json')
  const [generators, setGenerators] = useState<Record<OpenAPIGeneratorTarget, boolean>>(() => defaultGenerators)
  const [isLoading, setLoading] = useState<boolean>(true)

  const [result, setResult] = useState<Result>({ data: '', status: 'success', issues: [] })

  useEffect(() => {
    setLoading(true)
    getSampleFiles(['schemas', 'generated-schemas'])
      .then((fetchedSamples) => setSamples(fetchedSamples))
      .finally(() => setLoading(false))
  }, [])

  function processResult(output: Try<GeneratedFile[]>): void {
    if (isSuccess(output)) {
      const { data } = output
      if (data === undefined || data.length !== 1) {
        return setResult({
          status: 'failure',
          data: '',
          issues: [
            {
              message: `Expected exactly 1 output file, got ${data.length}`,
              path: 'output',
              severity: 'error',
              type: IssueTypes.other,
            },
          ],
        })
      }
      const [file] = data
      setResult({ data: file?.content!, issues: [], status: 'success' })
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
      setResult({ data: '', issues: [], status: 'working' })
      generate({
        logger: loggers.simple(),
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
    setGenerators,
    setSource,
    setLanguage,
    setSourceBySample,
  }
}
