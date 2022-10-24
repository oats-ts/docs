import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { ReaderConfiguration } from '../../../../types'
import { Autocomplete } from '../../../components/Autocomplete'
import { dd, DropdownItem } from '../../../components/dropdownDefaults'
import { FormSection } from '../../../components/FormSection'
import { Select } from '../../../components/Select'
import { RemoteProtocol, SourceLanguage } from '../../../model/types'

const languageOptions: DropdownItem<SourceLanguage>[] = [
  {
    value: 'json',
    key: 'json',
    label: 'JSON',
    description: 'Parses JSON documents for root and references',
  },
  {
    value: 'yaml',
    key: 'yaml',
    label: 'YAML',
    description: 'Parses YAML documents for root and references',
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
    description: 'Resolves documents remotely or from the file system',
  },
]

type RemoteReaderEditorProps = {
  input: ReaderConfiguration
  samples: string[]
  onChange: (node: ReaderConfiguration) => void
  onLoadRemote: () => void
}

export const RemoteReaderEditor: FC<RemoteReaderEditorProps> = ({ input, samples, onChange }) => {
  const handleLanguageChange = ({ value }: DropdownItem<SourceLanguage>) => {
    onChange({ ...input, remoteLanguage: value })
  }

  const handleProtocolChange = ({ value }: DropdownItem<RemoteProtocol>) => {
    onChange({ ...input, remoteProtocol: value })
  }

  const handlePathChange = (remotePath: string) => {
    onChange({ ...input, remotePath })
  }

  const protocol = useMemo((): DropdownItem<RemoteProtocol> | undefined => {
    return isNil(input.remoteProtocol) ? undefined : protocolOptions.find((p) => p.value === input.remoteProtocol)
  }, [input.remoteProtocol])

  const language = useMemo((): DropdownItem<SourceLanguage> | undefined => {
    return isNil(input.remoteLanguage) ? undefined : languageOptions.find((p) => p.value === input.remoteLanguage)
  }, [input.remoteLanguage])

  return (
    <>
      <FormSection name="Protocol">
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
      <FormSection name="Language">
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
      <FormSection name="OpenAPI document URI">
        <Autocomplete
          placeholder="OpenAPI document URI"
          items={samples}
          value={input.remotePath}
          customLabel="Custom document URI"
          onChange={handlePathChange}
        />
        {/* <Button className={loadButtonStyle} onClick={onLoadRemote}>
          <Icon name="cloud download" /> Load as inline
        </Button> */}
      </FormSection>
    </>
  )
}
