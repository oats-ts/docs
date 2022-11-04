import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Switch } from '../../../../components/Switch'
import { OverrideEditorProps } from './OverrideEditorProps'

export const DocumentationEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Documentation"
      description="When enabled, the description, summary and deprecated fields will be used to generate JSDoc."
    >
      <Switch onChange={(documentation) => onChange({ ...data, documentation })} value={data.documentation ?? true} />
    </FormSection>
  )
}
