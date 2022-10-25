import { GeneratorConfiguration, ReaderConfiguration, ValidatorConfiguration, WriterConfiguration } from './types'

import { PrettierConfiguration } from '../../types'

const prettierConfiguration: Required<PrettierConfiguration> = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
}

const validatorConfiguration: ValidatorConfiguration = {
  enabled: true,
}

const readerConfiguration: ReaderConfiguration = {
  readerType: 'remote',
  inlineContent: '',
  inlineLanguage: 'json',
  remoteLanguage: 'mixed',
  remotePath: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/pet-store-yaml.yaml',
  remoteProtocol: 'mixed',
}

const generatorConfiguration: GeneratorConfiguration = {
  preset: 'fullStack',
  pathProviderType: 'default',
  rootPath: '/src/generated',
  configurationStyle: 'preset',
  presetConfig: {},
  generators: [],
}

const writerConfiguration: WriterConfiguration = {
  writerType: 'file',
  lineSeparator: '\n',
  useFormatter: true,
  leadingComments: [],
  trailingComments: [],
  prettier: prettierConfiguration,
}

export const defaults = {
  readerConfiguration,
  validatorConfiguration,
  generatorConfiguration,
  writerConfiguration,
  prettierConfiguration,
}
