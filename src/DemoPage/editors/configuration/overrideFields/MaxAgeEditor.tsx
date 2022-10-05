import React, { FC } from 'react'
import { Form, Input } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const MaxAgeEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Max age (CORS)
        <br />
        <MutedLabel>
          Sets the maximum time in seconds, the preflight request can be cached. Influences the{' '}
          <b>Access-Control-Max-Age</b> CORS header.
        </MutedLabel>
      </label>
      <Input
        placeholder="Max age"
        fluid
        type="number"
        onChange={(_, props) =>
          onChange({ ...data, maxAge: Number.isNaN(Number(props.value)) ? undefined : Number(props.value) })
        }
        value={data.maxAge ?? ''}
      />
    </Form.Field>
  )
}
