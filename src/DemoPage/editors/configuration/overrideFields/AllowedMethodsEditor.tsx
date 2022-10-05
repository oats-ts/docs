import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { Dropdown, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { MutedLabel } from '../MutedLabel'
import { OverrideEditorProps } from './OverrideEditorProps'
import { HttpMethod } from '@oats-ts/openapi-http'

type HttpMethodOptionValue = HttpMethod | 'true' | 'false'
type HttpMethodsOption = StrictDropdownItemProps & { value: HttpMethodOptionValue }
const HttpMethods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'trace', 'head']

const HttpMethodsOptions: HttpMethodsOption[] = [
  { text: 'All methods allowed (default)', value: 'true' },
  { text: 'No methods allowed', value: 'false' },
  ...HttpMethods.map((method): HttpMethodsOption => ({ text: method, value: method })),
]

export const AllowedMethodsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  const value = useMemo(() => {
    if (isNil(data.allowedMethods)) {
      return []
    }
    if (typeof data.allowedMethods === 'boolean') {
      return [data.allowedMethods.toString()]
    }
    return data.allowedMethods
  }, [data.allowedMethods])
  return (
    <Form.Field>
      <label>
        Allowed methods (CORS)
        <br />
        <MutedLabel>
          Sets allowed HTTP methods for CORS. Influences the <b>Access-Control-Allow-Methods</b> CORS header.
        </MutedLabel>
      </label>
      <Dropdown
        placeholder="Allowed methods"
        fluid
        multiple
        search
        selection
        clearable
        options={HttpMethodsOptions}
        onChange={(_, props) => {
          const values = props.value! as HttpMethodOptionValue[]
          if (values.length === 0) {
            return onChange({ ...data, allowedMethods: undefined })
          } else if (values.includes('true') && data.allowedMethods !== true) {
            return onChange({ ...data, allowedMethods: true })
          } else if (values.includes('false') && data.allowedMethods !== false) {
            return onChange({ ...data, allowedMethods: false })
          }
          return onChange({
            ...data,
            allowedMethods: values.filter((value) => value !== 'true' && value !== 'false') as HttpMethod[],
          })
        }}
        value={value}
      />
    </Form.Field>
  )
}
