import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const SetCookieHeaderEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Send <b>Cookie</b> headers
        <br />
        <MutedLabel>
          When enabled, client side code will attempt to serialize and send the <b>Cookie</b> request headers.{' '}
          <b>This only works on Node.js, and should only be used for testing.</b>
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, sendCookieHeader: Boolean(props.checked) })}
        checked={data.sendCookieHeader ?? false}
      />
    </Form.Field>
  )
}
