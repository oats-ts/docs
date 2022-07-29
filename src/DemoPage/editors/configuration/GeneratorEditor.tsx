import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC } from 'react'
import {
  Dropdown,
  DropdownProps,
  Form,
  Header,
  Input,
  InputOnChangeData,
  StrictDropdownItemProps,
} from 'semantic-ui-react'
import { GeneratorConfigurationStyle, GeneratorConfiguration, GeneratorPreset, PathProviderType } from '../../../types'
import { allGenerators } from '../../model/allGenerators'
import { wrapperStyle } from '../commonStyles'

type ConfigStyleDropdownItemProps = StrictDropdownItemProps & { value: GeneratorConfigurationStyle }
type GeneratorDropdownItemProps = StrictDropdownItemProps & { value: OpenAPIGeneratorTarget }
type PresetDropdownItemProps = StrictDropdownItemProps & { value: GeneratorPreset }
type PathProviderDropdownItemProps = StrictDropdownItemProps & { value: PathProviderType }

const configurationStyleOptions: ConfigStyleDropdownItemProps[] = [
  { value: 'preset', text: 'Preset' },
  { value: 'generators', text: 'Individual generators' },
]

const presetOptions: PresetDropdownItemProps[] = [
  { value: 'client', text: 'Client' },
  { value: 'server', text: 'Server' },
  { value: 'fullStack', text: 'Full-stack' },
]

const pathProviderTypeOptions: PathProviderDropdownItemProps[] = [
  { value: 'default', text: 'Default' },
  { value: 'singleFile', text: 'Single file' },
  { value: 'byName', text: 'By name' },
  { value: 'byTarget', text: 'By generator target' },
]

const generatorOptions: GeneratorDropdownItemProps[] = allGenerators.map((target) => ({ value: target, text: target }))

export type GeneratorEditorProps = {
  isDark: boolean
  input: GeneratorConfiguration
  onChange: (node: GeneratorConfiguration) => void
}

export const GeneratorEditor: FC<GeneratorEditorProps> = ({ isDark, input, onChange }) => {
  const onConfigurationStyleChange = (_: any, data: DropdownProps) => {
    const configurationStyle = data.value! as GeneratorConfigurationStyle
    onChange({ ...input, configurationStyle })
  }

  const onGeneratorsChange = (_: any, data: DropdownProps) => {
    const generators = data.value! as OpenAPIGeneratorTarget[]
    onChange({ ...input, generators })
  }

  const onPresetChange = (_: any, data: DropdownProps) => {
    const preset = data.value! as GeneratorPreset
    onChange({ ...input, preset })
  }

  const onPathProviderTypeChange = (_: any, data: DropdownProps) => {
    const pathProviderType = data.value! as PathProviderType
    onChange({ ...input, pathProviderType })
  }
  const onPathRootChange = (_: any, data: InputOnChangeData) => {
    const rootPath = data.value!
    onChange({ ...input, rootPath })
  }

  return (
    <div className={wrapperStyle}>
      <Header as="h2">Generator settings</Header>
      <Form inverted={isDark}>
        <Form.Field>
          <label>Configuration style</label>
          <Dropdown
            placeholder="Configuration style"
            fluid
            selection
            options={configurationStyleOptions}
            onChange={onConfigurationStyleChange}
            value={input.configurationStyle}
          />
        </Form.Field>
        {input.configurationStyle === 'preset' && (
          <Form.Field>
            <label>Preset</label>
            <Dropdown
              placeholder="Preset"
              fluid
              selection
              options={presetOptions}
              onChange={onPresetChange}
              value={input.preset}
            />
          </Form.Field>
        )}
        {input.configurationStyle === 'generators' && (
          <Form.Field>
            <label>Generators</label>
            <Dropdown
              placeholder="Generators"
              fluid
              multiple
              search
              selection
              clearable
              options={generatorOptions}
              onChange={onGeneratorsChange}
              value={input.generators}
            />
          </Form.Field>
        )}
        <Form.Field>
          <label>Path provider type</label>
          <Dropdown
            placeholder="Path provider type"
            fluid
            selection
            options={pathProviderTypeOptions}
            onChange={onPathProviderTypeChange}
            value={input.pathProviderType}
          />
        </Form.Field>
        <Form.Field>
          <label>Root path</label>
          <Input placeholder="Root path" fluid onChange={onPathRootChange} value={input.rootPath} />
        </Form.Field>
      </Form>
    </div>
  )
}
