import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { HiArrowUturnLeft, HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { Autocomplete } from '../../../../components/Autocomplete'
import { dd, DropdownItem } from '../../../../components/dropdownDefaults'
import { ConfigurationFormGroup } from '../../../../components/ConfigurationFormGroup'
import { FormSection } from '../../../../components/FormSection'
import { Select } from '../../../../components/Select'
import { GeneratorConfiguration, GeneratorPreset, PathProviderType } from '../../../../types'
import { PresetConfigurationEditor } from './PresetConfigurationEditor'
import { defaults } from '../../../../model/defaults'
import { ConfigurationFormGroupAttachment } from '../../../../components/ConfigurationFormGroupAttachment'
import { ConfigurationFormGroupTitleButton } from '../../../../components/ConfigurationFormGroupTitleButton'

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

const hints = {
  preset: 'Select what you need! Do you need a client SDK? Server boilerplate? Both?',
  rootPath: 'Set the root folder for the generated content',
  pathConfiguration: 'Set how you want to group generated artifacts into folders and files',
}

export type GeneratorConfigurationEditorProps = {
  input: GeneratorConfiguration
  isAdvancedOpen: boolean
  setAdvancedOpen: (isOpen: boolean) => void
  onChange: (node: GeneratorConfiguration) => void
}

export const GeneratorConfigurationEditor: FC<GeneratorConfigurationEditorProps> = ({
  input,
  isAdvancedOpen,
  setAdvancedOpen,
  onChange,
}) => {
  const toggleAdvanced = () => setAdvancedOpen(!isAdvancedOpen)

  const onPresetChange = ({ value }: DropdownItem<GeneratorPreset>) => {
    onChange({ ...input, preset: value })
  }

  const onPathProviderTypeChange = ({ value }: DropdownItem<PathProviderType>) => {
    onChange({ ...input, pathProviderType: value })
  }

  const onPathRootChange = (rootPath: string) => {
    onChange({ ...input, rootPath })
  }

  const onReset = () => onChange(defaults.generatorConfiguration)

  const preset = useMemo((): DropdownItem<GeneratorPreset> | undefined => {
    return isNil(input.preset) ? undefined : presetOptions.find((p) => p.value === input.preset)
  }, [input.preset])

  const pathProvider = useMemo((): DropdownItem<PathProviderType> | undefined => {
    return isNil(input.pathProviderType)
      ? undefined
      : pathProviderTypeOptions.find((p) => p.value === input.pathProviderType)
  }, [input.pathProviderType])

  return (
    <ConfigurationFormGroup
      name="Generator"
      bottomAttachment={
        <ConfigurationFormGroupAttachment.Bottom
          label={isAdvancedOpen ? 'Hide advanced' : 'Show advanced'}
          icon={isAdvancedOpen ? HiChevronUp : HiChevronDown}
          onClick={toggleAdvanced}
        />
      }
      titleAttachment={<ConfigurationFormGroupTitleButton label="Reset" icon={HiArrowUturnLeft} onClick={onReset} />}
    >
      <FormSection name="Preset" description={hints.preset}>
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
      <FormSection name="Root path" description={hints.rootPath}>
        <Autocomplete
          placeholder="Root path"
          items={rootPathOptions}
          customLabel="Custom root path"
          value={input.rootPath}
          onChange={onPathRootChange}
        />
      </FormSection>
      {isAdvancedOpen && (
        <>
          <FormSection name="Path configuration" description={hints.pathConfiguration}>
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
          <PresetConfigurationEditor input={input} onChange={onChange} />
        </>
      )}
    </ConfigurationFormGroup>
  )
}
