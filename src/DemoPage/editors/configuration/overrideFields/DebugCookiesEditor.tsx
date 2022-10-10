import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const DebugCookiesEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Debug cookies
        <br />
        <MutedLabel>
          When enabled, client side code will attempt to serialize and send the <b>Cookie</b> header, and parse the{' '}
          <b>Set-Cookie</b> response headers. <b>This only works on Node.js, and should only be used for testing.</b>
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, debugCookies: Boolean(props.checked) })}
        checked={data.debugCookies ?? false}
      />
    </Form.Field>
  )
}
