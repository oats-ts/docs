import {
  generators,
  presets,
  readers,
  generator,
  nameProviders,
  pathProviders,
  writers,
  formatters,
} from '@oats-ts/openapi'
import { GeneratorConfiguration, ReaderConfiguration, WriterConfiguration } from '../types'
import typescriptParser from 'prettier/parser-typescript'
import { createPresetConfiguration } from './createPresetConfiguration'
import { isNil } from 'lodash'

const DUMMY_URL = 'http://dummy-url.com'

export function createReader(input: ReaderConfiguration) {
  if (input.type === 'remote') {
    return readers[input.remoteProtocol][input.remoteLanguage](input.remotePath)
  } else {
    return readers.memory.mixed[input.inlineLanguage](DUMMY_URL, { [DUMMY_URL]: input.inlineSource })
  }
}

function createGeneratorChildren(input: GeneratorConfiguration) {
  switch (input.configurationStyle) {
    case 'generators':
      return input.generators.map((target) => generators.create(target))
    case 'preset': {
      const config = createPresetConfiguration(input.preset, input.presetConfig)
      const factory = presets[input.preset]
      return isNil(config) ? factory() : factory(config)
    }
    default:
      return []
  }
}

export function createGenerator(input: GeneratorConfiguration) {
  return generator({
    nameProvider: nameProviders.default(),
    pathProvider: pathProviders[input.pathProviderType](input.rootPath),
    children: createGeneratorChildren(input),
  })
}

export function createWriter(input: WriterConfiguration) {
  return writers.typescript.memory({
    comments: {
      leadingComments: input.leadingComments ?? [],
      trailingComments: input.trailingComments ?? [],
      lineSeparator: input.lineSeparator,
    },
    format: input.useFormatter
      ? formatters.prettier({
          ...input.prettier,
          parser: 'typescript',
          plugins: [typescriptParser],
        })
      : undefined,
  })
}
