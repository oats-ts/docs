import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { Dropdown, Menu, Segment } from 'semantic-ui-react'
import YAML from 'yamljs'
import { SourceLanguage } from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { darkBottomMenuStyle, darkSegmentStyle, segmentStyle } from '../../commonStyles'
import { useGenerator } from '../../model/useGenerator'
import { InputEditor } from './InputEditor'

const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
`

const oaSegmentStyle = css`
  flex: 1 1 1px;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-top-width: 0px !important;
`

export const InputEditorWrapper: FC = () => {
  const { colorMode } = useColorMode()
  const { editorInput, reader, setReader } = useGenerator()
  const isDark = colorMode === 'dark'
  const fullSegmentStyle = cx(segmentStyle, oaSegmentStyle, isDark ? darkSegmentStyle : undefined)

  if (isNil(editorInput)) {
    return null
  }

  const onInlineInputLanguageChange = (language: SourceLanguage) => {
    if (reader.readerType !== 'inline') {
      return
    }
    if (language !== reader.inlineLanguage) {
      if (language === 'json') {
        try {
          setReader({
            ...reader,
            readerType: 'inline',
            inlineContent: JSON.stringify(YAML.parse(reader.inlineContent), null, 2),
            inlineLanguage: 'json',
          })
        } catch (e) {}
      } else if (language === 'yaml') {
        try {
          setReader({
            ...reader,
            readerType: 'inline',
            inlineContent: YAML.stringify(JSON.parse(reader.inlineContent), 10000, 2),
            inlineLanguage: 'yaml',
          })
        } catch (e) {}
      }
    }
  }

  return (
    <div className={containerStyle}>
      <Segment inverted={isDark} className={fullSegmentStyle} attached="top">
        <InputEditor />
      </Segment>
      <Menu attached="bottom" inverted={isDark} className={isDark ? darkBottomMenuStyle : undefined}>
        <Menu.Menu position="left">
          <Dropdown item text={`Reader (${reader.readerType === 'inline' ? 'Inline' : 'Remote'})`}>
            <Dropdown.Menu>
              <Dropdown.Item
                icon="file code outline"
                active={reader.readerType === 'inline'}
                onClick={() => setReader({ ...reader, readerType: 'inline' })}
              >
                Inline
              </Dropdown.Item>
              <Dropdown.Item
                icon="globe"
                active={reader.readerType === 'remote'}
                onClick={() => setReader({ ...reader, readerType: 'remote' })}
              >
                Remote
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>Generators</Menu.Item>
          <Menu.Item>Writer</Menu.Item>
        </Menu.Menu>
        {editorInput.type === 'reader' && editorInput.readerType === 'inline' ? (
          <Menu.Menu position="right">
            <Dropdown item text={editorInput.inlineLanguage === 'json' ? 'JSON' : 'YAML'}>
              <Dropdown.Menu>
                <Dropdown.Item
                  value="json"
                  active={editorInput.inlineLanguage === 'json'}
                  onClick={() => onInlineInputLanguageChange('json')}
                >
                  JSON
                </Dropdown.Item>
                <Dropdown.Item
                  value="yaml"
                  active={editorInput.inlineLanguage === 'yaml'}
                  onClick={() => onInlineInputLanguageChange('yaml')}
                >
                  YAML
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        ) : null}
      </Menu>
    </div>
  )
}
