import { css } from '@emotion/css'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC } from 'react'
import {
  Button,
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
import { PresetConfigurationEditor } from './PresetConfigurationEditor'

const headerWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 24px;
  justify-content: space-between;
`
const headerLabelStyle = css`
  flex: 1 1 1px;
  margin: 0px !important;
  padding: 0px !important;
`

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

  const onResetPresetConfig = () => {
    onChange({ ...input, presetConfig: {} })
  }

  return (
    <div className={wrapperStyle}>
      <Header as="h2">Generator settings</Header>
      <Form inverted={isDark}>
        <Header as="h3">Basic settings</Header>
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
        <Form.Group widths="equal">
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
        </Form.Group>
        {input.configurationStyle === 'preset' ? (
          <>
            <div className={headerWrapperStyle}>
              <Header as="h3" className={headerLabelStyle}>
                Preset configuration
              </Header>
              <Button size="mini" secondary onClick={onResetPresetConfig}>
                Reset
              </Button>
            </div>
            <PresetConfigurationEditor input={input} isDark={isDark} onChange={onChange} />
          </>
        ) : null}
      </Form>
    </div>
  )
}
