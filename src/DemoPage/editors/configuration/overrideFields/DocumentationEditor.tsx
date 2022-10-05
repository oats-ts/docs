import React, { FC } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

export const DocumentationEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <Form.Field>
      <label>
        Documentation
        <br />
        <MutedLabel>
          When enabled, the <b>description</b>, <b>summary</b> and <b>deprecated</b> fields will be used to generate
          JSDoc.
        </MutedLabel>
      </label>
      <Checkbox
        onChange={(_, props) => onChange({ ...data, documentation: Boolean(props.checked) })}
        checked={data.documentation ?? true}
      />
    </Form.Field>
  )
}
