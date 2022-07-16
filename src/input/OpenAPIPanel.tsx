import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import debounce from 'lodash/debounce'

import { codeEditorSegmentStyle } from '../commonCss'
import { SourceType } from '../types'
import { ConfigureModal } from './ConfigureModal'

export type OpenAPIPanelProps = {
  source: string
  onSourceChange: (source: string) => void
  sourceType: SourceType
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
}

export const OpenAPIPanel: FC<OpenAPIPanelProps> = ({ source, sourceType, onSourceChange }) => {
  const handleChange = debounce((value: string | undefined) => {
    onSourceChange(value ?? '')
  }, 1000)
  const [isModalOpen, setModalOpen] = useState(false)
  const onModalClose = () => setModalOpen(false)

  return (
    <>
      <Menu attached="top" secondary>
        <Menu.Item header>OpenAPI input</Menu.Item>
        <Menu.Menu position="right">
          <ConfigureModal isOpen={isModalOpen} onChange={setModalOpen} onComplete={onModalClose} />
        </Menu.Menu>
      </Menu>
      <Segment raised attached="bottom" className={codeEditorSegmentStyle}>
        <Editor
          height="calc(100vh - 117px)"
          theme="light"
          defaultPath={`input.${sourceType}`}
          language={sourceType}
          value={source}
          onChange={handleChange}
          options={editorConfig}
        />
      </Segment>
    </>
  )
}
