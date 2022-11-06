import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Switch } from '../../../../components/Switch'
import { OverrideEditorProps } from './OverrideEditorProps'

export const AllowCredentialsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Allow Credentials (CORS)"
      description={
        <>
          When enabled, cookies and authorization headers will be exposed. Influences the{' '}
          <b>Access-Control-Allow-Credentials</b> CORS header
        </>
      }
    >
      <Switch
        onChange={(allowCredentials) => onChange({ ...data, allowCredentials })}
        value={data.allowCredentials ?? false}
      />
    </FormSection>
  )
}
