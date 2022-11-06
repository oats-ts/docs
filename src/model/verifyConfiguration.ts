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
import { version } from '@oats-ts/oats-ts'

import {
  ConfigurationNode,
  GeneratorConfiguration,
  ReaderConfiguration,
  WriterConfiguration,
  PrettierConfiguration,
  ValidatorConfiguration,
  PresetConfig,
  AdvancedOpenConfiguration,
} from './types'

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
    remoteLanguage: union({
      json: literal('json'),
      yaml: literal('yaml'),
      mixed: literal('mixed'),
    }),
    remotePath: string(),
    remoteProtocol: union({
      http: literal('http'),
      https: literal('https'),
      file: literal('file'),
      mixed: literal('mixed'),
    }),
  }),
)

const validatorConfigValidator = object(
  shape<ValidatorConfiguration>({
    enabled: boolean(),
  }),
)

const strArrOrBool = union({
  stringArray: array(items(string())),
  boolean: boolean(),
})

const presetConfigValidator = object(
  shape<PresetConfig>({
    allowCredentials: optional(boolean()),
    allowedMethods: optional(strArrOrBool),
    allowedOrigins: optional(strArrOrBool),
    allowedRequestHeaders: optional(strArrOrBool),
    allowedResponseHeaders: optional(strArrOrBool),
    documentation: optional(boolean()),
    maxAge: optional(number()),
    debugCookies: optional(boolean()),
    validateResponses: optional(boolean()),
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
    presetConfig: presetConfigValidator,
  }),
)

const writerConfigurationValidator = object(
  shape<WriterConfiguration>({
    lineSeparator: union({
      LF: literal('\n'),
      CRLF: literal('\r\n'),
    }),
    writerType: union({
      file: literal('file'),
      memory: literal('memory'),
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

const advancedOpenValidator = object(
  shape<AdvancedOpenConfiguration>({
    generator: boolean(),
    reader: boolean(),
    validator: boolean(),
    writer: boolean(),
  }),
)

const configurationValidator = object(
  shape<ConfigurationNode>({
    type: literal('configuration'),
    version: literal(version),
    active: union({
      reader: literal('reader'),
      validator: literal('validator'),
      generator: literal('generator'),
      writer: literal('writer'),
    }),
    advancedOpen: advancedOpenValidator,
    validator: validatorConfigValidator,
    reader: readerConfigValidator,
    generator: generatorConfigValidator,
    writer: writerConfigurationValidator,
  }),
)

export function verifyConfiguration(data?: ConfigurationNode): boolean {
  const issues = configurationValidator(data, '$', DefaultConfig)
  const isValid = issues.length === 0
  if (!isValid) {
    console.warn('Local storage invalid', { data, issues })
  }
  return isValid
}
