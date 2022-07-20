import { array, DefaultConfig, items, literal, object, shape, string, union } from '@oats-ts/validators'

import { ConfigurationNode, GeneratorConfiguration, ReaderConfiguration } from '../../types'

const languageValidator = union({
  json: literal('json'),
  yaml: literal('yaml'),
  mixed: literal('mixed'),
})

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
const configurationValidator = object(
  shape<ConfigurationNode>({
    type: literal('configuration'),
    active: union({
      reader: literal('reader'),
      generator: literal('generator'),
      'generator-source': literal('generator-source'),
    }),
    reader: readerConfigValidator,
    generator: generatorConfigValidator,
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
