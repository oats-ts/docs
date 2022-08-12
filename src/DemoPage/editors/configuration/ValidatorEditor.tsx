import React, { FC } from 'react'
import { Checkbox, CheckboxProps, Form, Header } from 'semantic-ui-react'
import { ValidatorConfiguration } from '../../../types'
import { wrapperStyle } from '../commonStyles'

export type ValidatorEditorProps = {
  isDark: boolean
  input: ValidatorConfiguration
  onChange: (node: ValidatorConfiguration) => void
}

export const ValidatorEditor: FC<ValidatorEditorProps> = ({ isDark, input, onChange }) => {
  const onEnabledChange = (_: any, data: CheckboxProps) => {
    onChange({ ...input, enabled: Boolean(data.checked) })
  }
  return (
    <div className={wrapperStyle}>
      <Header as="h2">Validator settings</Header>
      <Form inverted={isDark}>
        <Form.Field>
          <label>Use validator?</label>
          <Checkbox toggle checked={input.enabled} onChange={onEnabledChange} />
        </Form.Field>
      </Form>
    </div>
  )
}
