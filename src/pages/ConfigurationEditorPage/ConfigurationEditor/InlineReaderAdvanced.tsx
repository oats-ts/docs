import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { dd, DropdownItem } from '../../../components/dropdownDefaults'
import { FormSection } from '../../../components/FormSection'
import { Select } from '../../../components/Select'
import { ExactSourceLanguage, ReaderConfiguration } from '../../../types'
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
  const handleLanguageChange = ({ value }: DropdownItem<ExactSourceLanguage>) => {
    onChange({ ...input, inlineLanguage: value })
  }

  const language = useMemo((): DropdownItem<ExactSourceLanguage> | undefined => {
    return isNil(input.inlineLanguage) ? undefined : languageOptions.find((p) => p.value === input.inlineLanguage)
  }, [input.inlineLanguage])
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
