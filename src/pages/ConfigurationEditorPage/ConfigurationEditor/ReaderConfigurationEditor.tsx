import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { HiArrowUturnLeft, HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { Autocomplete } from '../../../components/Autocomplete'
import { dd, DropdownItem } from '../../../components/dropdownDefaults'
import { ConfigurationFormGroup } from '../../../components/ConfigurationFormGroup'
import { FormSection } from '../../../components/FormSection'
import { Select } from '../../../components/Select'
import { ReaderConfiguration, RemoteProtocol, SourceLanguage } from '../../../types'
import { defaults } from '../../../model/defaults'
import { Link } from '../../../components/Link'

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

const hints = {
  path: (
    <>
      The URI or file path where your source OpenAPI document will be read from. You can pick from{' '}
      <Link href="https://github.com/oats-ts/oats-schemas" target="_blank">
        Oats test documents
      </Link>
      , or check out{' '}
      <Link href="https://apis.guru" target="_blank">
        https://apis.guru
      </Link>{' '}
      for examples.
    </>
  ),
  language: 'The language used by your OpenAPI document',
  protocol: 'The protocol used to read your OpenAPI document',
}

type ReaderConfigurationEditorProps = {
  input: ReaderConfiguration
  isAdvancedOpen: boolean
  samples: string[]
  setAdvancedOpen: (isOpen: boolean) => void
  onChange: (node: ReaderConfiguration) => void
}

export const ReaderConfigurationEditor: FC<ReaderConfigurationEditorProps> = ({
  input,
  isAdvancedOpen,
  setAdvancedOpen,
  samples,
  onChange,
}) => {
  const toggleAdvanced = () => setAdvancedOpen(!isAdvancedOpen)

  const handleLanguageChange = ({ value }: DropdownItem<SourceLanguage>) => {
    onChange({ ...input, remoteLanguage: value })
  }

  const handleProtocolChange = ({ value }: DropdownItem<RemoteProtocol>) => {
    onChange({ ...input, remoteProtocol: value })
  }

  const handlePathChange = (remotePath: string) => {
    onChange({ ...input, remotePath })
  }

  const onReset = () => onChange(defaults.readerConfiguration)

  const protocol = useMemo((): DropdownItem<RemoteProtocol> | undefined => {
    return isNil(input.remoteProtocol) ? undefined : protocolOptions.find((p) => p.value === input.remoteProtocol)
  }, [input.remoteProtocol])

  const language = useMemo((): DropdownItem<SourceLanguage> | undefined => {
    return isNil(input.remoteLanguage) ? undefined : languageOptions.find((p) => p.value === input.remoteLanguage)
  }, [input.remoteLanguage])

  return (
    <ConfigurationFormGroup
      name="Reader"
      bottomAttachmentLabel={isAdvancedOpen ? 'Hide advanced' : 'Show advanced'}
      bottomAttachmentIcon={isAdvancedOpen ? HiChevronUp : HiChevronDown}
      onAttachmentClick={toggleAdvanced}
      titleButtonLabel="Reset"
      titleButtonIcon={HiArrowUturnLeft}
      onTitleButtonClick={onReset}
    >
      <FormSection name="URI" description={hints.path}>
        <Autocomplete
          placeholder="OpenAPI document URI"
          items={samples}
          value={input.remotePath}
          customLabel="Custom document URI"
          onChange={handlePathChange}
        />
      </FormSection>
      {isAdvancedOpen && (
        <>
          <FormSection name="Protocol" description={hints.protocol}>
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
          <FormSection name="Language" description={hints.language}>
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
      )}
    </ConfigurationFormGroup>
  )
}
