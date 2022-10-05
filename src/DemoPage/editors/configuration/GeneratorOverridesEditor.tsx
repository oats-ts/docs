import React, { FC, useMemo } from 'react'
import { GeneratorConfiguration, GeneratorOverrides } from '../../../types'
import { getGeneratorTargets } from '../../model/getGeneratorTargets'
import { getOverrideFields } from '../../model/getOverrideFields'
import { editors } from './overrideFields/editors'

export type GeneratorOverridesEditorProps = {
  isDark: boolean
  input: GeneratorConfiguration
  onChange: (node: GeneratorConfiguration) => void
}

export const GeneratorOverridesEditor: FC<GeneratorOverridesEditorProps> = ({ input, isDark, onChange }) => {
  const { preset, configurationStyle, generators } = input

  const targets = useMemo(() => getGeneratorTargets(input), [preset, configurationStyle, generators])
  const overrideFields = useMemo(() => getOverrideFields(targets), [targets])

  const onOverridesChange = (overrides: Partial<GeneratorOverrides>) => {
    onChange({ ...input, overrides })
  }

  return (
    <div>
      {overrideFields.map((field) => {
        const Editor = editors[field]
        return <Editor field={field} key={field} data={input.overrides} isDark={isDark} onChange={onOverridesChange} />
      })}
    </div>
  )
}
