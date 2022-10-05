import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

type HeaderOptionValue = (string & {}) | 'true' | 'false'
type HeaderOption = StrictDropdownItemProps & { value: HeaderOptionValue }

export const AllowedRequestHeadersEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  const value = useMemo(() => {
    if (isNil(data.allowedRequestHeaders)) {
      return []
    }
    if (typeof data.allowedRequestHeaders === 'boolean') {
      return [data.allowedRequestHeaders.toString()]
    }
    return data.allowedRequestHeaders
  }, [data.allowedRequestHeaders])
  const options = useMemo((): HeaderOption[] => {
    return [
      { value: 'true', text: 'Allow all request headers' },
      { value: 'false', text: "Don't allow any request headers" },
      ...(Array.isArray(data.allowedRequestHeaders)
        ? data.allowedRequestHeaders.map((origin): HeaderOption => ({ value: origin, text: origin }))
        : []),
    ]
  }, [data.allowedRequestHeaders])
  return (
    <Form.Field>
      <label>
        Allowed request headers (CORS)
        <br />
        <MutedLabel>
          Sets allowed HTTP request headers for CORS. Influences the <b>Access-Control-Allow-Headers</b> CORS header.
        </MutedLabel>
      </label>
      <Dropdown
        placeholder="Allowed request headers"
        fluid
        multiple
        search
        selection
        clearable
        options={options}
        allowAdditions
        additionLabel="Add request header: "
        onAddItem={(_, { value }: DropdownProps) => {
          const origin = value as string
          const { allowedRequestHeaders } = data
          if (typeof allowedRequestHeaders === 'boolean') {
            return onChange({ ...data, allowedRequestHeaders: [origin] })
          }
          return onChange({ ...data, allowedRequestHeaders: [...(allowedRequestHeaders ?? []), origin] })
        }}
        onChange={(_, props) => {
          const values = props.value! as HeaderOptionValue[]
          if (values.length === 0) {
            return onChange({ ...data, allowedRequestHeaders: undefined })
          } else if (values.includes('true') && data.allowedRequestHeaders !== true) {
            return onChange({ ...data, allowedRequestHeaders: true })
          } else if (values.includes('false') && data.allowedRequestHeaders !== false) {
            return onChange({ ...data, allowedRequestHeaders: false })
          }
          return onChange({
            ...data,
            allowedRequestHeaders: values.filter((value) => value !== 'true' && value !== 'false'),
          })
        }}
        value={value}
      />
    </Form.Field>
  )
}
