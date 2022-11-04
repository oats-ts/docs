import React, { FC } from 'react'
import { BooleanOrStringArrayOption, BooleanOrStringListEditor } from './BooleanOrStringListEditor'
import { OverrideEditorProps } from './OverrideEditorProps'

const getDescription = (v: BooleanOrStringArrayOption): string => {
  switch (v) {
    case 'true':
      return '(default) All request headers the OpenAPI document describes will be allowed'
    case 'false':
      return 'No request headers will be allowed'
    default:
      return 'User defined request header'
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

export const AllowedRequestHeadersEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  return (
    <BooleanOrStringListEditor
      data={data.allowedRequestHeaders}
      name="Allowed request headers (CORS)"
      description="Sets allowed HTTP request headers for CORS. Influences the Access-Control-Allow-Headers CORS header."
      getDescription={getDescription}
      getLabel={getLabel}
      placeholder="Allowed request headers"
      onChange={(allowedRequestHeaders) => onChange({ ...data, allowedRequestHeaders })}
    />
  )
}
