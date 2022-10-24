import React, { FC } from 'react'
import { FormGroup } from '../../../components/FormGroup'
import { FormSection } from '../../../components/FormSection'
import { Switch } from '../../../components/Switch'
import { ValidatorConfiguration } from '../../../model/types'

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
  return (
    <FormGroup name="Validator">
      <FormSection name="Validate" description={hints.validate}>
        <Switch value={input.enabled} onChange={onEnabledChange} />
      </FormSection>
    </FormGroup>
  )
}
