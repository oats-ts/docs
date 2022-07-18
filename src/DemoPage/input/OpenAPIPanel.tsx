import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useContext } from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

import { codeEditorSegmentStyle, darkCodeContainerSegmentStyle, darkMenuStyle } from '../commonCss'
import { SourceLanguage } from '../../types'
import { ConfigurationPanel } from './ConfigurationPanel'
import { GeneratorContext } from '../GeneratorContext'
import YAML from 'yamljs'
import { useColorMode } from '../../useColorMode'
import { cx } from '@emotion/css'

const HeightSub = 128

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  tabSize: 2,
}

export const OpenAPIPanel: FC = () => {
  const {
    source,
    language,
    samples,
    isLoading,
    setSource,
    setLanguage,
    setSourceBySample,
    isConfigurationPanelOpen,
    setConfigurationPanelOpen,
  } = useContext(GeneratorContext)

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

  const { colorMode } = useColorMode()

  return (
    <>
      <Menu
        attached="top"
        secondary
        inverted={colorMode === 'dark'}
        className={colorMode === 'dark' ? darkMenuStyle : undefined}
      >
        <Menu.Item header>{isConfigurationPanelOpen ? 'Configuration' : 'OpenAPI input'}</Menu.Item>
        {isConfigurationPanelOpen ? (
          <>
            <div style={{ flex: '1 1 1px' }}></div>
            <Menu.Item onClick={() => setConfigurationPanelOpen(false)}>
              <Icon name="close" fitted />
            </Menu.Item>
          </>
        ) : (
          <>
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
              <Menu.Item onClick={() => setConfigurationPanelOpen(!isConfigurationPanelOpen)}>
                <Icon name="cog" /> Configure
              </Menu.Item>
            </Menu.Menu>
          </>
        )}
      </Menu>
      <Segment
        raised
        attached="bottom"
        loading={isLoading}
        className={cx(codeEditorSegmentStyle, colorMode === 'dark' ? darkCodeContainerSegmentStyle : undefined)}
        inverted={colorMode === 'dark'}
      >
        {isConfigurationPanelOpen ? (
          <ConfigurationPanel />
        ) : (
          <Editor
            height={`calc(100vh - ${HeightSub}px)`}
            theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
            defaultPath={`input.${language}`}
            language={language}
            value={source}
            onChange={handleSourceChange}
            options={editorConfig}
          />
        )}
      </Segment>
    </>
  )
}
