import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Switch } from '../../../../components/Switch'
import { OverrideEditorProps } from './OverrideEditorProps'

export const ValidateResponsesEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Validate responses"
      description="When enabled, client side code will validate the structure of responses, and throw if a response is invalid."
    >
      <Switch
        onChange={(validateResponses) => onChange({ ...data, validateResponses })}
        value={data.validateResponses ?? false}
      />
    </FormSection>
  )
}
