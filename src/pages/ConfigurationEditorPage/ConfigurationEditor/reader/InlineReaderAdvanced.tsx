import { isNil } from 'lodash'
import React, { FC, useEffect } from 'react'
import { dd, DropdownItem } from '../../../../components/dropdownDefaults'
import { FormSection } from '../../../../components/FormSection'
import { Select } from '../../../../components/Select'
import { tryTransformSource } from '../../../../model/tryTransformSource'
import { ExactSourceLanguage, ReaderConfiguration } from '../../../../types'
import { readerHints } from './readerHints'

const languageOptions: DropdownItem<ExactSourceLanguage>[] = [
  {
    value: 'json',
    key: 'json',
    label: 'JSON',
    description: 'Parses only JSON documents',
  },
  {
    value: 'yaml',
    key: 'yaml',
    label: 'YAML',
    description: 'Parses only YAML documents',
  },
]

type InlineReaderAdvancedProps = {
  input: ReaderConfiguration
  onChange: (node: ReaderConfiguration) => void
}

export const InlineReaderAdvanced: FC<InlineReaderAdvancedProps> = ({ input, onChange }) => {
  const handleLanguageChange = ({ value: inlineLanguage }: DropdownItem<ExactSourceLanguage>) => {
    onChange({
      ...input,
      inlineLanguage,
    })
  }

  useEffect(() => {
    onChange({ ...input, inlineSource: tryTransformSource(input.inlineLanguage, input.inlineSource) })
  }, [input.inlineLanguage])

  const language = isNil(input.inlineLanguage)
    ? undefined
    : languageOptions.find((p) => p.value === input.inlineLanguage)

  return (
    <>
      <FormSection name="Language" description={readerHints.language}>
        <Select
          items={languageOptions}
          placeholder="Choose language"
          value={language}
          getDescription={dd.getDescription}
          getKey={dd.getKey}
          getValue={dd.getValue}
          onChange={handleLanguageChange}
        />
      </FormSection>
    </>
  )
}
