import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useContext, useState } from 'react'
import { Dropdown, Menu, Segment } from 'semantic-ui-react'

import { codeEditorSegmentStyle } from '../commonCss'
import { SourceLanguage } from '../../types'
import { ConfigureModal } from './ConfigureModal'
import { GeneratorContext } from '../GeneratorContext'
import YAML from 'yamljs'

const HeightSub = 128

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  tabSize: 2,
}

export const OpenAPIPanel: FC = () => {
  const { source, language, setSource, setLanguage } = useContext(GeneratorContext)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleSourceChange = (value: string | undefined) => {
    setSource(value ?? '')
  }

  const handleLanguageChange = (type: SourceLanguage) => () => {
    if (type === language) {
      return
    } else if (type === 'json') {
      try {
        setSource(JSON.stringify(YAML.parse(source), null, 2))
      } catch (e) {}
    } else if (type === 'yaml') {
      try {
        setSource(YAML.stringify(JSON.parse(source), 10000, 2))
      } catch (e) {}
    }
    setLanguage(type)
  }

  return (
    <>
      <Menu attached="top" secondary>
        <Menu.Item header>OpenAPI input</Menu.Item>

        <Menu.Menu position="right">
          <Dropdown item text={language === 'json' ? 'JSON' : 'YAML'}>
            <Dropdown.Menu>
              <Dropdown.Item value="json" active={language === 'json'} onClick={handleLanguageChange('json')}>
                JSON
              </Dropdown.Item>
              <Dropdown.Item value="yaml" active={language === 'yaml'} onClick={handleLanguageChange('yaml')}>
                YAML
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ConfigureModal isOpen={isModalOpen} onChange={setModalOpen} />
        </Menu.Menu>
      </Menu>
      <Segment raised attached="bottom" className={codeEditorSegmentStyle}>
        <Editor
          height={`calc(100vh - ${HeightSub}px)`}
          theme="light"
          defaultPath={`input.${language}`}
          language={language}
          value={source}
          onChange={handleSourceChange}
          options={editorConfig}
        />
      </Segment>
    </>
  )
}
