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
  const { source, language, samples, isLoading, setSource, setLanguage, setSourceBySample } =
    useContext(GeneratorContext)
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
        <Menu.Menu position="right">
          <Dropdown item text="Samples">
            <Dropdown.Menu>
              {samples.map((sample) => (
                <Dropdown.Item value={sample.uri} key={sample.uri} onClick={() => setSourceBySample(sample.uri)}>
                  {sample.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <ConfigureModal isOpen={isModalOpen} onChange={setModalOpen} />
        </Menu.Menu>
      </Menu>
      <Segment raised attached="bottom" loading={isLoading} className={codeEditorSegmentStyle}>
        <Editor
          loading={isLoading}
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
