import React, { FC, useMemo } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { ReaderConfiguration, RemoteProtocol, SourceLanguage } from '../../../types'
import { wrapperStyle } from '../commonStyles'

type RemoteReaderEditorProps = {
  isDark: boolean
  input: ReaderConfiguration
  samples: string[]
  onChange: (node: ReaderConfiguration) => void
}

type JsonDropdownItemProps = StrictDropdownItemProps & { value: SourceLanguage }
type ProtocolDropdownItemProps = StrictDropdownItemProps & { value: RemoteProtocol }

const languageOptions: JsonDropdownItemProps[] = [
  {
    text: 'JSON',
    value: 'json',
  },
  {
    text: 'YAML',
    value: 'yaml',
  },
  {
    text: 'Mixed',
    value: 'mixed',
  },
]

const protocolOption: ProtocolDropdownItemProps[] = [
  {
    text: 'HTTPS',
    value: 'https',
  },
  {
    text: 'HTTP',
    value: 'http',
  },
  {
    text: "File (won't work in the browser)",
    value: 'file',
  },
  {
    text: 'Mixed',
    value: 'mixed',
  },
]

export const RemoteReaderEditor: FC<RemoteReaderEditorProps> = ({ input, isDark, samples, onChange }) => {
  const sampleOptions = useMemo<StrictDropdownItemProps[]>(
    () => samples.map((path): StrictDropdownItemProps => ({ text: path, value: path })),
    [samples],
  )

  const pathOptions = samples.includes(input.remotePath)
    ? sampleOptions
    : [{ text: input.remotePath, value: input.remotePath }, ...sampleOptions]

  const handleLanguageChange = (_: any, data: DropdownProps) => {
    const remoteLanguage = data.value! as SourceLanguage
    onChange({ ...input, remoteLanguage })
  }

  const handlePathChange = (_: any, { value }: DropdownProps) => {
    const remotePath = value! as string
    onChange({ ...input, remotePath })
  }

  const handleProtocolChange = (_: any, { value }: DropdownProps) => {
    const remoteProtocol = value! as RemoteProtocol
    onChange({ ...input, remoteProtocol })
  }

  return (
    <div className={wrapperStyle}>
      <Form inverted={isDark}>
        <Form.Field>
          <label>Language</label>
          <Dropdown
            options={languageOptions}
            placeholder="Choose language"
            search
            selection
            fluid
            value={input.remoteLanguage}
            onChange={handleLanguageChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Protocol</label>
          <Dropdown
            options={protocolOption}
            placeholder="Choose protocol"
            search
            selection
            fluid
            value={input.remoteProtocol}
            onChange={handleProtocolChange}
          />
        </Form.Field>
        <Form.Field>
          <label>OpenAPI document URI</label>
          <Dropdown
            options={pathOptions}
            placeholder="OpenAPI document URI"
            search
            selection
            fluid
            allowAdditions
            additionLabel="Custom URI: "
            onAddItem={handlePathChange}
            value={input.remotePath}
            onChange={handlePathChange}
          />
        </Form.Field>
      </Form>
    </div>
  )
}
