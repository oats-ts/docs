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
import { Result, SourceType } from './types'
import { Options } from 'prettier'
import { useEffect, useState } from 'react'
import { isSuccess, Try } from '@oats-ts/try'
import { GeneratedFile } from '@oats-ts/typescript-writer'
import { IssueTypes } from '@oats-ts/validators'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'

const DUMMY_URL = 'https://dummy.schema.com'

const baseOptions: Options = {
  parser: 'typescript',
  plugins: [typescriptParser],
}

export function useGenerator(
  source: string,
  sourceType: SourceType,
  generators: Record<OpenAPIGeneratorTarget, boolean>,
): Result {
  const [result, setResult] = useState<Result>({ data: '', status: 'success', issues: [] })

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

  useEffect(() => {
    setResult({ data: '', issues: [], status: 'working' })
    generate({
      logger: loggers.verbose(),
      validator: validator(),
      reader: readers.test[sourceType]({
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
  }, [source, sourceType, generators])

  return result
}
