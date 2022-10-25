import React, { FC } from 'react'
import { BooleanOrStringArrayOption, BooleanOrStringListEditor } from './BooleanOrStringListEditor'
import { OverrideEditorProps } from './OverrideEditorProps'

const getDescription = (v: BooleanOrStringArrayOption): string => {
  switch (v) {
    case 'true':
      return '(default) All response headers the OpenAPI document describes will be allowed'
    case 'false':
      return 'No response headers will be allowed'
    default:
      return 'User defined response header'
  }
}

const getLabel = (v: BooleanOrStringArrayOption): string => {
  switch (v) {
    case 'true':
      return 'All headers'
    case 'false':
      return 'No headers'
    default:
      return v
  }
}

export const AllowedResponseHeadersEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <BooleanOrStringListEditor
      data={data.allowedResponseHeaders}
      name="Allowed response headers (CORS)"
      description="Sets allowed HTTP response headers for CORS. Influences the Access-Control-Expose-Headers CORS header."
      getDescription={getDescription}
      getLabel={getLabel}
      placeholder="Allowed response headers"
      onChange={(allowedResponseHeaders) => onChange({ ...data, allowedResponseHeaders })}
    />
  )
}
