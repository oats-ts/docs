import { GeneratorPreset, PresetConfigField } from '../types'

const commonFields: PresetConfigField[] = ['documentation']

const clientFields: PresetConfigField[] = ['validateResponses', 'debugCookies']

const serverFields: PresetConfigField[] = [
  'allowedOrigins',
  'allowedMethods',
  'allowedRequestHeaders',
  'allowedResponseHeaders',
  'allowCredentials',
  'maxAge',
]

export function getPresetConfigFields(preset: GeneratorPreset): PresetConfigField[] {
  switch (preset) {
    case 'client':
      return [...commonFields, ...clientFields]
    case 'server':
      return [...commonFields, ...serverFields]
    case 'fullStack':
      return [...commonFields, ...clientFields, ...serverFields]
  }
}
