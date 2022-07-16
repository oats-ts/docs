import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useContext, useState } from 'react'
import { Dropdown, Menu, Segment } from 'semantic-ui-react'

import { codeEditorSegmentStyle } from '../commonCss'
import { SourceType } from '../../types'
import { ConfigureModal } from './ConfigureModal'
import { ConfigurationContext } from '../ConfigurationContext'
import YAML from 'yamljs'

export type OpenAPIPanelProps = {
  source: string
  onSourceChange: (source: string) => void
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
}

export const OpenAPIPanel: FC<OpenAPIPanelProps> = ({ source, onSourceChange }) => {
  const { setSourceType, sourceType } = useContext(ConfigurationContext)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleSourceChange = (value: string | undefined) => {
    onSourceChange(value ?? '')
  }
  const handleSourceTypeChange = (type: SourceType) => () => {
    if (type === sourceType) {
      return
    } else if (type === 'json') {
      try {
        onSourceChange(JSON.stringify(YAML.parse(source), null, 2))
      } catch (e) {}
    } else if (type === 'yaml') {
      try {
        onSourceChange(YAML.stringify(JSON.parse(source), 10000, 2))
      } catch (e) {}
    }
    setSourceType(type)
  }

  return (
    <>
      <Menu attached="top" secondary>
        <Menu.Item header>OpenAPI input</Menu.Item>
        <Dropdown item text="Language">
          <Dropdown.Menu>
            <Dropdown.Item value="json" active={sourceType === 'json'} onClick={handleSourceTypeChange('json')}>
              JSON
            </Dropdown.Item>
            <Dropdown.Item value="yaml" active={sourceType === 'yaml'} onClick={handleSourceTypeChange('yaml')}>
              YAML
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <ConfigureModal isOpen={isModalOpen} onChange={setModalOpen} />
        </Menu.Menu>
      </Menu>
      <Segment raised attached="bottom" className={codeEditorSegmentStyle}>
        <Editor
          height="calc(100vh - 117px)"
          theme="light"
          defaultPath={`input.${sourceType}`}
          language={sourceType}
          value={source}
          onChange={handleSourceChange}
          options={editorConfig}
        />
      </Segment>
    </>
  )
}
