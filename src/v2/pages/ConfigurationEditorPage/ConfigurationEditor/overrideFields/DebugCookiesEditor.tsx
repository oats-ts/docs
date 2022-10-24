import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Switch } from '../../../../components/Switch'
import { OverrideEditorProps } from './OverrideEditorProps'

export const DebugCookiesEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Debug cookies"
      description="When enabled, the SDK will serialize and send the Cookie header, and parse the Set-Cookie response headers. Does not work in the browser."
    >
      <Switch onChange={(debugCookies) => onChange({ ...data, debugCookies })} value={data.debugCookies ?? false} />
    </FormSection>
  )
}
