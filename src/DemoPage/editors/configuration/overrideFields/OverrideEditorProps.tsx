import { GeneratorOverrides, OverrideField } from '../../../../types'

export type OverrideEditorProps = {
  isDark: boolean
  field: OverrideField
  data: Partial<GeneratorOverrides>
  onChange: (data: Partial<GeneratorOverrides>) => void
}
