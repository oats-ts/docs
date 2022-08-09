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
import { GeneratorConfiguration, ReaderConfiguration, WriterConfiguration } from '../../types'
import typescriptParser from 'prettier/parser-typescript'

export function createReader(input: ReaderConfiguration) {
  switch (input.readerType) {
    case 'inline':
      return readers.memory.mixed[input.inlineLanguage]('', { '': input.inlineContent })
    case 'remote':
      return readers[input.remoteProtocol][input.remoteLanguage](input.remotePath)
  }
}

function createGeneratorChildren(input: GeneratorConfiguration) {
  switch (input.configurationStyle) {
    case 'generators':
      return input.generators.map((target) => generators.create(target))
    case 'preset':
      return presets[input.preset]()
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
