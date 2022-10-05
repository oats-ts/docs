import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'

type HeaderOptionValue = (string & {}) | 'true' | 'false'
type HeaderOption = StrictDropdownItemProps & { value: HeaderOptionValue }

export const AllowedResponseHeadersEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  const value = useMemo(() => {
    if (isNil(data.allowedResponseHeaders)) {
      return []
    }
    if (typeof data.allowedResponseHeaders === 'boolean') {
      return [data.allowedResponseHeaders.toString()]
    }
    return data.allowedResponseHeaders
  }, [data.allowedResponseHeaders])
  const options = useMemo((): HeaderOption[] => {
    return [
      { value: 'true', text: 'Allow all response headers' },
      { value: 'false', text: "Don't allow any response headers" },
      ...(Array.isArray(data.allowedResponseHeaders)
        ? data.allowedResponseHeaders.map((origin): HeaderOption => ({ value: origin, text: origin }))
        : []),
    ]
  }, [data.allowedResponseHeaders])
  return (
    <Form.Field>
      <label>
        Allowed response headers (CORS)
        <br />
        <MutedLabel>
          Sets allowed HTTP response headers for CORS. Influences the <b>Access-Control-Expose-Headers</b> CORS header.
        </MutedLabel>
      </label>
      <Dropdown
        placeholder="Allowed response headers"
        fluid
        multiple
        search
        selection
        clearable
        options={options}
        allowAdditions
        additionLabel="Add response header: "
        onAddItem={(_, { value }: DropdownProps) => {
          const origin = value as string
          const { allowedResponseHeaders } = data
          if (typeof allowedResponseHeaders === 'boolean') {
            return onChange({ ...data, allowedResponseHeaders: [origin] })
          }
          return onChange({ ...data, allowedResponseHeaders: [...(allowedResponseHeaders ?? []), origin] })
        }}
        onChange={(_, props) => {
          const values = props.value! as HeaderOptionValue[]
          if (values.length === 0) {
            return onChange({ ...data, allowedResponseHeaders: undefined })
          } else if (values.includes('true') && data.allowedResponseHeaders !== true) {
            return onChange({ ...data, allowedResponseHeaders: true })
          } else if (values.includes('false') && data.allowedResponseHeaders !== false) {
            return onChange({ ...data, allowedResponseHeaders: false })
          }
          return onChange({
            ...data,
            allowedResponseHeaders: values.filter((value) => value !== 'true' && value !== 'false'),
          })
        }}
        value={value}
      />
    </Form.Field>
  )
}
