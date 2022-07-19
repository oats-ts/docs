import { css } from '@emotion/css'
import React, { FC, useMemo } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { ReaderNode, RemoteProtocol, SourceLanguage } from '../../../types'

type RemoteReaderEditorProps = {
  isDark: boolean
  input: ReaderNode
  samples: string[]
  onChange: (node: ReaderNode) => void
}

const languageOptions: StrictDropdownItemProps[] = [
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

const protocolOption: StrictDropdownItemProps[] = [
  {
    text: 'HTTPS',
    value: 'https',
  },
  {
    text: 'HTTP',
    value: 'http',
  },
  {
    text: 'Mixed',
    value: 'mixed',
  },
]

const formStyle = css`
  padding: 16px;
`

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
    <Form inverted={isDark} className={formStyle}>
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
  )
}
