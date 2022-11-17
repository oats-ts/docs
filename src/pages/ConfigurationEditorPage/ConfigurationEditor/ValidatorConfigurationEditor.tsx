import React, { FC } from 'react'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import { ConfigurationFormGroup } from '../../../components/ConfigurationFormGroup'
import { ConfigurationFormGroupTitleButton } from '../../../components/ConfigurationFormGroupTitleButton'
import { FormSection } from '../../../components/FormSection'
import { Switch } from '../../../components/Switch'
import { defaults } from '../../../model/defaults'
import { ValidatorConfiguration } from '../../../types'

export type ValidatorConfigurationEditorProps = {
  input: ValidatorConfiguration
  onChange: (node: ValidatorConfiguration) => void
}

const hints = {
  validate: 'When enabled, the input OpenAPI document will be semantically validated, to catch issues early',
} as const

export const ValidatorConfigurationEditor: FC<ValidatorConfigurationEditorProps> = ({ input, onChange }) => {
  const onEnabledChange = (enabled: boolean) => {
    onChange({ ...input, enabled })
  }

  const onReset = () => onChange(defaults.validatorConfiguration)

  return (
    <ConfigurationFormGroup
      name="Validator"
      titleAttachment={<ConfigurationFormGroupTitleButton label="Reset" icon={HiArrowUturnLeft} onClick={onReset} />}
    >
      <FormSection name="Validate" description={hints.validate}>
        <Switch value={input.enabled} onChange={onEnabledChange} />
      </FormSection>
    </ConfigurationFormGroup>
  )
}
