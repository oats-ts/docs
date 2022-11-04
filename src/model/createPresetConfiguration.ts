import { OpenAPIFullStackPresetConfig, CorsConfigurationGeneratorConfig } from '@oats-ts/openapi-generators'
import { isNil } from 'lodash'
import { PresetConfig, GeneratorPreset } from '../types'
import { needsCors } from './configUtils'

type PresetConfigurationFactory = (config: Partial<PresetConfig>) => OpenAPIFullStackPresetConfig | undefined

const client: PresetConfigurationFactory = (config) => {
  const { debugCookies, documentation, validateResponses } = config
  if (isNil(debugCookies) && isNil(documentation) && isNil(validateResponses)) {
    return undefined
  }
  return {
    ...(isNil(documentation) ? {} : { documentation }),
    ...(isNil(debugCookies) ? {} : { debugCookies }),
    ...(isNil(validateResponses) ? {} : { validateResponses }),
  }
}

const corsConfig = (config: Partial<PresetConfig>): Partial<CorsConfigurationGeneratorConfig> => {
  const {
    allowCredentials,
    allowedMethods: methods,
    allowedOrigins: origins,
    allowedRequestHeaders: req,
    allowedResponseHeaders: res,
    maxAge,
  } = config
  return {
    ...(isNil(allowCredentials) ? {} : { isCredentialsAllowed: () => allowCredentials }),
    ...(isNil(origins) ? {} : { getAllowedOrigins: () => origins }),
    ...(isNil(maxAge) ? {} : { getMaxAge: () => maxAge }),
    ...(isNil(req)
      ? {}
      : { isRequestHeaderAllowed: (header) => (typeof req === 'boolean' ? req : req.includes(header)) }),
    ...(isNil(res)
      ? {}
      : { isResponseHeaderAllowed: (header) => (typeof res === 'boolean' ? res : res.includes(header)) }),
    ...(isNil(methods)
      ? {}
      : { isMethodAllowed: (_, method) => (typeof methods === 'boolean' ? methods : methods.includes(method)) }),
  }
}

const server: PresetConfigurationFactory = (config) => {
  const { documentation } = config
  if (isNil(documentation) && !needsCors(config)) {
    return undefined
  }
  return {
    ...(isNil(documentation) ? {} : { documentation }),
    ...(needsCors(config) ? { cors: corsConfig(config) } : {}),
  }
}

const fullStack: PresetConfigurationFactory = (config) => {
  const clientCfg = client(config)
  const serverCfg = server(config)
  return {
    ...(isNil(clientCfg) ? {} : clientCfg),
    ...(isNil(serverCfg) ? {} : serverCfg),
  }
}

const presetConfigurationFactory: Record<GeneratorPreset, PresetConfigurationFactory> = {
  client,
  server,
  fullStack,
}

export function createPresetConfiguration(preset: GeneratorPreset, config: Partial<PresetConfig>) {
  return presetConfigurationFactory[preset](config)
}
