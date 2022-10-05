import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const AllowCredentialsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Allow Credentials (CORS)
        <br />
        <MutedLabel>
          When enabled, cookies and authorization headers should be exposed.Influences the{' '}
          <b>Access-Control-Allow-Credentials</b> CORS header.
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, allowCredentials: Boolean(props.checked) })}
        checked={data.allowCredentials ?? false}
      />
    </Form.Field>
  )
}
