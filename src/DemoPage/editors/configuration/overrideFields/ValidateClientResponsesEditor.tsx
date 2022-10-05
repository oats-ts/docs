import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const ValidateClientResponsesEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Validate responses
        <br />
        <MutedLabel>
          When enabled, client side code will validate the structure of responses, and throw if a response is invalid.
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, validateClientResponses: Boolean(props.checked) })}
        checked={data.validateClientResponses ?? false}
      />
    </Form.Field>
  )
}
