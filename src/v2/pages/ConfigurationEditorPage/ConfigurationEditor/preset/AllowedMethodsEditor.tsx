import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { OverrideEditorProps } from './OverrideEditorProps'
import { HttpMethod } from '@oats-ts/openapi-http'
import { FormSection } from '../../../../components/FormSection'
import { dd, DropdownItem } from '../../../../components/dropdownDefaults'
import { MultiSelect } from '../../../../components/MultiSelect'

type HttpMethodOptionValue = HttpMethod | 'true' | 'false'
type HttpMethodsOption = DropdownItem<HttpMethodOptionValue>
const HttpMethods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'trace', 'head']

const trueValue: HttpMethodsOption = {
  value: 'true',
  key: 'true',
  label: 'All methods',
  description: '(default) Allows all methods listed in the source OpenAPI document',
}

const falseValue: HttpMethodsOption = {
  value: 'false',
  key: 'false',
  label: 'No methods',
  description: 'Forbids all methods',
}

const options: HttpMethodsOption[] = [
  trueValue,
  falseValue,
  ...HttpMethods.map(
    (method): HttpMethodsOption => ({
      label: method.toUpperCase(),
      key: method,
      value: method,
    }),
  ),
]

export const AllowedMethodsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
  const value = useMemo((): HttpMethodsOption[] => {
    if (isNil(data.allowedMethods)) {
      return []
    }
    if (typeof data.allowedMethods === 'boolean') {
      return [data.allowedMethods ? trueValue : falseValue]
    }
    return data.allowedMethods.map((method) => options.find(({ value }) => value === method)!)
  }, [data.allowedMethods])
  return (
    <FormSection
      name="Allowed methods (CORS)"
      description="Sets allowed HTTP methods for CORS. Influences the <b>Access-Control-Allow-Methods</b> CORS header."
    >
      <MultiSelect
        placeholder="Allowed methods"
        items={options}
        getDescription={dd.getDescription}
        getKey={dd.getKey}
        getValue={dd.getValue}
        onChange={(values) => {
          if (values.length === 0) {
            return onChange({ ...data, allowedMethods: undefined })
          } else if (values.includes(trueValue) && data.allowedMethods !== true) {
            return onChange({ ...data, allowedMethods: true })
          } else if (values.includes(falseValue) && data.allowedMethods !== false) {
            return onChange({ ...data, allowedMethods: false })
          }
          return onChange({
            ...data,
            allowedMethods: values
              .map(({ value }) => value)
              .filter((value) => value !== 'true' && value !== 'false') as HttpMethod[],
          })
        }}
        value={value}
      />
    </FormSection>
  )
}
