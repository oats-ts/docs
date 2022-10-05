import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const ParseSetCookieHeaderEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Parse <b>Set-Cookie</b> headers
        <br />
        <MutedLabel>
          When enabled, client side code will attempt to parse the <b>Set-Cookie</b> response headers.{' '}
          <b>This only works on Node.js, and should only be used for testing.</b>
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, parseSetCookieHeaders: Boolean(props.checked) })}
        checked={data.parseSetCookieHeaders ?? false}
      />
    </Form.Field>
  )
}
