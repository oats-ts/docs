import React, { FC } from 'react'
import { BooleanOrStringListEditor, BooleanOrStringArrayOption } from './BooleanOrStringListEditor'
import { OverrideEditorProps } from './OverrideEditorProps'

const getLabel = (v: BooleanOrStringArrayOption): string => {
  switch (v) {
    case 'true':
      return 'All origins'
    case 'false':
      return 'No origins'
    default:
      return v
  }
}

const getDescription = (v: BooleanOrStringArrayOption): string => {
  switch (v) {
    case 'true':
      return 'All origins will be allowed'
    case 'false':
      return '(default) No origins will be allowed, CORS is effectively off'
    default:
      return 'User defined origin'
  }
}

export const AllowedOriginsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <BooleanOrStringListEditor
      data={data.allowedOrigins}
      name="Allowed origins (CORS)"
      description={
        <>
          Sets allowed HTTP origins for CORS. Influences the <b>Access-Control-Allow-Origin</b> CORS header
        </>
      }
      getDescription={getDescription}
      getLabel={getLabel}
      placeholder="Allowed origins"
      onChange={(allowedOrigins) => onChange({ ...data, allowedOrigins })}
    />
  )
}
