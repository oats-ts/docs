import { PresetConfig, PresetConfigField } from '../../../../types'

export type OverrideEditorProps = {
  field: PresetConfigField
  data: Partial<PresetConfig>
  onChange: (data: Partial<PresetConfig>) => void
}
