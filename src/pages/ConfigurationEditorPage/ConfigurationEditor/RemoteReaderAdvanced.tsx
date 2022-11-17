import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { dd, DropdownItem } from '../../../components/dropdownDefaults'
import { FormSection } from '../../../components/FormSection'
import { Select } from '../../../components/Select'
import { ReaderConfiguration, RemoteProtocol, SourceLanguage } from '../../../types'
import { readerHints } from './readerHints'

const languageOptions: DropdownItem<SourceLanguage>[] = [
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
  {
    value: 'mixed',
    key: 'mixed',
    label: 'Mixed',
    description: 'Parses both JSON and YAML documents',
  },
]

const protocolOptions: DropdownItem<RemoteProtocol>[] = [
  {
    label: 'HTTPS',
    key: 'https',
    value: 'https',
    description: 'Resolves documents using HTTPS',
  },
  {
    label: 'HTTP',
    key: 'http',
    value: 'http',
    description: 'Resolves documents using HTTPS',
  },
  {
    label: 'File',
    key: 'file',
    value: 'file',
    description: "Resolves documents from the local file system (won't work in the browser)",
  },
  {
    label: 'Mixed',
    key: 'mixed',
    value: 'mixed',
    description: 'Resolves documents remotely (HTTP or HTTPS) or from the file system',
  },
]

type RemoteReaderAdvancedProps = {
  input: ReaderConfiguration
  onChange: (node: ReaderConfiguration) => void
}

export const RemoteReaderAdvanced: FC<RemoteReaderAdvancedProps> = ({ input, onChange }) => {
  const handleLanguageChange = ({ value }: DropdownItem<SourceLanguage>) => {
    onChange({ ...input, remoteLanguage: value })
  }

  const handleProtocolChange = ({ value }: DropdownItem<RemoteProtocol>) => {
    onChange({ ...input, remoteProtocol: value })
  }

  const language = useMemo((): DropdownItem<SourceLanguage> | undefined => {
    return isNil(input.remoteLanguage) ? undefined : languageOptions.find((p) => p.value === input.remoteLanguage)
  }, [input.remoteLanguage])

  const protocol = useMemo((): DropdownItem<RemoteProtocol> | undefined => {
    return isNil(input.remoteProtocol) ? undefined : protocolOptions.find((p) => p.value === input.remoteProtocol)
  }, [input.remoteProtocol])

  return (
    <>
      <FormSection name="Protocol" description={readerHints.protocol}>
        <Select
          items={protocolOptions}
          placeholder="Choose protocol"
          value={protocol}
          getDescription={dd.getDescription}
          getKey={dd.getKey}
          getValue={dd.getValue}
          onChange={handleProtocolChange}
        />
      </FormSection>
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
