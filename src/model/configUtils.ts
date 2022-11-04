import { isNil } from 'lodash'
import { PresetConfig } from '../types'

export function needsCors(config: Partial<PresetConfig>) {
  return !(
    isNil(config.allowCredentials) &&
    isNil(config.allowedMethods) &&
    isNil(config.allowedOrigins) &&
    isNil(config.allowedRequestHeaders) &&
    isNil(config.allowedResponseHeaders) &&
    isNil(config.maxAge)
  )
}
