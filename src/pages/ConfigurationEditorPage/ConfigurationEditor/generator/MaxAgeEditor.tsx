import React, { FC } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { Input } from '../../../../components/Input'
import { OverrideEditorProps } from './OverrideEditorProps'

export const MaxAgeEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <FormSection
      name="Max age (CORS)"
      description={
        <>
          Sets the maximum time in seconds, the preflight request can be cached. Influences the{' '}
          <b>Access-Control-Max-Age</b> CORS header
        </>
      }
    >
      <Input
        placeholder="Max age"
        type="number"
        onChange={(e) =>
          onChange({ ...data, maxAge: Number.isNaN(Number(e.target.value)) ? undefined : Number(e.target.value) })
        }
        value={data.maxAge ?? ''}
      />
    </FormSection>
  )
}
