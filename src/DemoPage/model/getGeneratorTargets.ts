import { CompositeGenerator } from '@oats-ts/oats-ts'
import { presets } from '@oats-ts/openapi'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { GeneratorConfiguration } from '../../types'

export function getGeneratorTargets(config: GeneratorConfiguration): OpenAPIGeneratorTarget[] {
  if (config.configurationStyle === 'generators') {
    return config.generators
  }
  const preset = presets[config.preset]() as CompositeGenerator<any, any>
  return preset.children.map((child) => child.name() as OpenAPIGeneratorTarget)
}
