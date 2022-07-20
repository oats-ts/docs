import { CommentConfig } from '@oats-ts/typescript-writer'
import {
  array,
  boolean,
  DefaultConfig,
  items,
  literal,
  number,
  object,
  optional,
  shape,
  string,
  union,
} from '@oats-ts/validators'

import {
  ConfigurationNode,
  GeneratorConfiguration,
  ReaderConfiguration,
  WriterConfiguration,
  PrettierConfiguration,
} from '../../types'

const languageValidator = union({
  json: literal('json'),
  yaml: literal('yaml'),
  mixed: literal('mixed'),
})

const commentConfigValidator = object(
  shape<CommentConfig>({
    text: string(),
    type: union({
      jsdoc: literal('jsdoc'),
      block: literal('block'),
      line: literal('line'),
    }),
  }),
)

const readerConfigValidator = object(
  shape<ReaderConfiguration>({
    readerType: union({
      inline: literal('inline'),
      remote: literal('remote'),
    }),
    inlineContent: string(),
    inlineLanguage: languageValidator,
    remoteLanguage: languageValidator,
    remotePath: string(),
    remoteProtocol: union({
      http: literal('http'),
      https: literal('https'),
      file: literal('file'),
      mixed: literal('mixed'),
    }),
  }),
)

const generatorConfigValidator = object(
  shape<GeneratorConfiguration>({
    configurationStyle: union({
      preset: literal('preset'),
      generators: literal('generators'),
    }),
    generators: array(items(string())),
    pathProviderType: union({
      default: literal('default'),
      singleFile: literal('singleFile'),
      byTarget: literal('byTarget'),
      byName: literal('byName'),
    }),
    preset: union({
      fullStack: literal('fullStack'),
      client: literal('client'),
      server: literal('server'),
    }),
    rootPath: string(),
  }),
)

const writerConfigurationValidator = object(
  shape<WriterConfiguration>({
    lineSeparator: union({
      LF: literal('\n'),
      CRLF: literal('\r\n'),
    }),
    useFormatter: boolean(),
    leadingComments: array(items(commentConfigValidator)),
    trailingComments: array(items(commentConfigValidator)),
    prettier: object(
      shape<PrettierConfiguration>({
        arrowParens: optional(
          union({
            avoid: literal('avoid'),
            always: literal('always'),
          }),
        ),
        bracketSameLine: optional(boolean()),
        bracketSpacing: optional(boolean()),
        endOfLine: optional(
          union({
            lf: literal('lf'),
            crlf: literal('crlf'),
          }),
        ),
        printWidth: optional(number()),
        tabWidth: optional(number()),
        useTabs: optional(boolean()),
        quoteProps: optional(
          union({
            'as-needed': literal('as-needed'),
            consistent: literal('consistent'),
            preserve: literal('preserve'),
          }),
        ),
        semi: optional(boolean()),
        singleQuote: optional(boolean()),
        trailingComma: optional(
          union({
            none: literal('none'),
            es5: literal('es5'),
            all: literal('all'),
          }),
        ),
      }),
    ),
  }),
)

const configurationValidator = object(
  shape<ConfigurationNode>({
    type: literal('configuration'),
    active: union({
      reader: literal('reader'),
      generator: literal('generator'),
      writer: literal('writer'),
      'generator-source': literal('generator-source'),
    }),
    reader: readerConfigValidator,
    generator: generatorConfigValidator,
    writer: writerConfigurationValidator,
  }),
)

export function verifyConfiguration(data?: ConfigurationNode): boolean {
  const issues = configurationValidator(data, '$', DefaultConfig)
  const isValid = issues.length === 0
  if (!isValid) {
    console.error('Local storage invalid', { data, issues })
  }
  return isValid
}
