import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { Autocomplete } from '../../../components/Autocomplete'
import { dd, DropdownItem } from '../../../components/dropdownDefaults'
import { FormSection } from '../../../components/FormSection'
import { Select } from '../../../components/Select'
import { GeneratorConfiguration, GeneratorPreset, PathProviderType } from '../../../model/types'

const presetOptions: DropdownItem<GeneratorPreset>[] = [
  {
    value: 'client',
    key: 'client',
    label: 'Client',
    description: 'Generates a client side SDK, and utilities',
  },
  {
    value: 'server',
    key: 'server',
    label: 'Server',
    description: 'Generates server-side content, and utilities',
  },
  {
    value: 'fullStack',
    key: 'fullStack',
    label: 'Full-stack',
    description: 'Generates both client and server-side content',
  },
]

const pathProviderTypeOptions: DropdownItem<PathProviderType>[] = [
  {
    value: 'default',
    key: 'default',
    label: 'Default',
    description: "Generates each artifact in it's own file, in a reasonalbe folder structure",
  },
  {
    value: 'singleFile',
    key: 'singleFile',
    label: 'Single file',
    description: 'Generates everything into a single file',
  },
  {
    value: 'byName',
    key: 'byName',
    label: 'By name',
    description: "Generates each artifact in it's own file, into a single folder",
  },
  {
    value: 'byTarget',
    key: 'byTarget',
    label: 'By concern',
    description: 'Generates a separate file for each concern, eg.: types.ts, validators.ts, etc',
  },
]

const rootPathOptions = ['src/generated']

export type GeneratorConfigurationEditorProps = {
  input: GeneratorConfiguration
  onChange: (node: GeneratorConfiguration) => void
}

export const GeneratorConfigurationEditor: FC<GeneratorConfigurationEditorProps> = ({ input, onChange }) => {
  const onPresetChange = ({ value }: DropdownItem<GeneratorPreset>) => {
    onChange({ ...input, preset: value })
  }

  const onPathProviderTypeChange = ({ value }: DropdownItem<PathProviderType>) => {
    onChange({ ...input, pathProviderType: value })
  }

  const onPathRootChange = (rootPath: string) => {
    onChange({ ...input, rootPath })
  }

  const preset = useMemo((): DropdownItem<GeneratorPreset> | undefined => {
    return isNil(input.preset) ? undefined : presetOptions.find((p) => p.value === input.preset)
  }, [input.preset])

  const pathProvider = useMemo((): DropdownItem<PathProviderType> | undefined => {
    return isNil(input.pathProviderType)
      ? undefined
      : pathProviderTypeOptions.find((p) => p.value === input.pathProviderType)
  }, [input.preset])

  return (
    <>
      <FormSection name="Preset">
        <Select
          placeholder="Select preset"
          items={presetOptions}
          value={preset}
          onChange={onPresetChange}
          getDescription={dd.getDescription}
          getKey={dd.getKey}
          getValue={dd.getValue}
        />
      </FormSection>
      {input.configurationStyle === 'generators' && (
        <FormSection name="Path configuration">
          <Select
            placeholder="Select path configuration"
            items={pathProviderTypeOptions}
            value={pathProvider}
            onChange={onPathProviderTypeChange}
            getDescription={dd.getDescription}
            getKey={dd.getKey}
            getValue={dd.getValue}
          />
        </FormSection>
      )}
      <FormSection name="Root path">
        <Autocomplete
          placeholder="Root path"
          items={rootPathOptions}
          customLabel="Custom root path"
          value={input.rootPath}
          onChange={onPathRootChange}
        />
      </FormSection>
    </>
  )
}
