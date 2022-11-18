import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Switch } from '../../../../components/Switch'
import { OverrideEditorProps } from './OverrideEditorProps'

export const DebugCookiesEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Debug cookies"
      description={
        <>
          When enabled, the SDK will serialize and send the <b>Cookie</b> header, and parse the <b>Set-Cookie</b>{' '}
          response headers. <b>Does not work in the browser, use for tests only!</b>
        </>
      }
    >
      <Switch onChange={(debugCookies) => onChange({ ...data, debugCookies })} value={data.debugCookies ?? false} />
    </FormSection>
  )
}
