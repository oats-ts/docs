import React, { FC, useMemo } from 'react'
import { getPresetConfigFields } from '../../../../model/getPresetConfigFields'
import { GeneratorConfiguration, PresetConfig } from '../../../../model/types'
import { editors } from './editors'

export type PresetConfigurationEditorProps = {
  input: GeneratorConfiguration
  onChange: (node: GeneratorConfiguration) => void
}

export const PresetConfigurationEditor: FC<PresetConfigurationEditorProps> = ({ input, onChange }) => {
  const { preset, configurationStyle, generators } = input

  const overrideFields = useMemo(
    () => (configurationStyle === 'preset' ? getPresetConfigFields(preset) : []),
    [generators, preset, configurationStyle],
  )

  const onPresetConfigChange = (presetConfig: Partial<PresetConfig>) => {
    onChange({ ...input, presetConfig })
  }

  return (
    <>
      {overrideFields.map((field) => {
        const Editor = editors[field]
        return <Editor field={field} key={field} data={input.presetConfig} onChange={onPresetConfigChange} />
      })}
    </>
  )
}
