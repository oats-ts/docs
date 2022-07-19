import { css } from '@emotion/css'
import React, { FC, useMemo } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { RemoteOpenAPINode, RemoteProtocol, SourceLanguage } from '../../../types'

type RemoteInputEditorProps = {
  isDark: boolean
  input: RemoteOpenAPINode
  samples: string[]
  onChange: (node: RemoteOpenAPINode) => void
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

export const RemoteInputEditor: FC<RemoteInputEditorProps> = ({ input, isDark, samples, onChange }) => {
  const sampleOptions = useMemo<StrictDropdownItemProps[]>(
    () => samples.map((path): StrictDropdownItemProps => ({ text: path, value: path })),
    [samples],
  )

  const pathOptions = samples.includes(input.path)
    ? sampleOptions
    : [{ text: input.path, value: input.path }, ...sampleOptions]

  const handleLanguageChange = (_: any, data: DropdownProps) => {
    const language = data.value! as SourceLanguage
    onChange({ ...input, language })
  }

  const handlePathChange = (_: any, { value }: DropdownProps) => {
    const path = value! as string
    onChange({ ...input, path })
  }

  const handleProtocolChange = (_: any, { value }: DropdownProps) => {
    const protocol = value! as RemoteProtocol
    onChange({ ...input, protocol })
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
          value={input.language}
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
          value={input.protocol}
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
          value={input.path}
          onChange={handlePathChange}
        />
      </Form.Field>
    </Form>
  )
}
