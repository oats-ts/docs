import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { FormSection } from '../../../../components/FormSection'
import { MultiAutocomplete } from '../../../../components/MultiAutocomplete'

export type BooleanOrStringArrayOption = (string & {}) | 'true' | 'false'

export type BooleanOrStringListEditorProps = {
  data?: boolean | string[]
  name: string
  description: string
  placeholder: string
  getLabel: (value: BooleanOrStringArrayOption) => string
  getDescription: (value: BooleanOrStringArrayOption) => string
  onChange: (value?: boolean | string[]) => void
}

const TRUE = 'true'
const FALSE = 'false'

export const BooleanOrStringListEditor: FC<BooleanOrStringListEditorProps> = ({
  data,
  name,
  description,
  placeholder,
  onChange,
  getLabel,
  getDescription,
}) => {
  const value = useMemo(() => {
    if (isNil(data)) {
      return []
    }
    if (typeof data === 'boolean') {
      return [data.toString()]
    }
    return data
  }, [data])

  const options = useMemo((): BooleanOrStringArrayOption[] => {
    return [TRUE, FALSE, ...(Array.isArray(data) ? data : [])]
  }, [data])

  return (
    <FormSection name={name} description={description}>
      <MultiAutocomplete
        placeholder={placeholder}
        items={options}
        onChange={(values) => {
          if (values.length === 0) {
            return onChange(undefined)
          } else if (values.includes(TRUE) && data !== true) {
            return onChange(true)
          } else if (values.includes(FALSE) && data !== false) {
            return onChange(false)
          }
          return onChange(values.filter((value) => value !== TRUE && value !== FALSE))
        }}
        getValue={getLabel}
        getDescription={getDescription}
        value={value}
      />
    </FormSection>
  )
}
