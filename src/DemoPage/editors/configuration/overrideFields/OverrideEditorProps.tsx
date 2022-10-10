import { PresetConfig, PresetConfigField } from '../../../../types'

export type OverrideEditorProps = {
  isDark: boolean
  field: PresetConfigField
  data: Partial<PresetConfig>
  onChange: (data: Partial<PresetConfig>) => void
}
