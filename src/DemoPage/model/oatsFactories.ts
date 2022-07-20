import { generators, presets, readers, generator, nameProviders, pathProviders } from '@oats-ts/openapi'
import { GeneratorConfiguration, ReaderConfiguration } from '../../types'

export function createReader(input: ReaderConfiguration) {
  switch (input.readerType) {
    case 'inline':
      return readers.test[input.inlineLanguage]({
        path: '',
        content: new Map().set('', input.inlineContent),
      })
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
