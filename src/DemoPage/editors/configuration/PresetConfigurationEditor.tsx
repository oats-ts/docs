import React, { FC, useMemo } from 'react'
import { GeneratorConfiguration, PresetConfig } from '../../../types'
import { getPresetConfigFields } from '../../model/getPresetConfigFields'
import { editors } from './overrideFields/editors'

export type PresetConfigurationEditorProps = {
  isDark: boolean
  input: GeneratorConfiguration
  onChange: (node: GeneratorConfiguration) => void
}

export const PresetConfigurationEditor: FC<PresetConfigurationEditorProps> = ({ input, isDark, onChange }) => {
  const { preset, configurationStyle, generators } = input

  const overrideFields = useMemo(
    () => (configurationStyle === 'preset' ? getPresetConfigFields(preset) : []),
    [generators, preset, configurationStyle],
  )

  const onPresetConfigChange = (presetConfig: Partial<PresetConfig>) => {
    onChange({ ...input, presetConfig })
  }

  return (
    <div>
      {overrideFields.map((field) => {
        const Editor = editors[field]
        return (
          <Editor field={field} key={field} data={input.presetConfig} isDark={isDark} onChange={onPresetConfigChange} />
        )
      })}
    </div>
  )
}
