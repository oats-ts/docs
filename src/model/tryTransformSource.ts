import YAML from 'yamljs'
import { SourceLanguage } from '../types'

export function tryTransformSource(from: SourceLanguage, to: SourceLanguage, code: string): string {
  if (from !== to) {
    if (to === 'json') {
      try {
        return JSON.stringify(YAML.parse(code), null, 2)
      } catch (e) {
        return code
      }
    }
    if (to === 'yaml') {
      try {
        return YAML.stringify(JSON.parse(code), 10000, 2)
      } catch (e) {
        return code
      }
    }
  }
  return code
}
