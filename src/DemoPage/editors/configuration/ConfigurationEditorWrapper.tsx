import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { Dropdown, Icon, Menu, Popup, Segment } from 'semantic-ui-react'
import YAML from 'yamljs'
import { SourceLanguage } from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { darkBottomMenuStyle, darkSegmentStyle, segmentStyle } from '../../commonStyles'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor'

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

const tooltips = {
  generateTs:
    'You can use this source code to generate the result seen in the file explorer on the left. You can configure it on the rest of the tabs.',
  reader:
    'You can configure how files are being read. On the right you can select if you want to use an inline (in memory) document or a remote one. You can also configure further details, like what protocols, and languages should be accepted.',
  generator:
    'You can configure what generator outputs do you want. You can either use presets (pre-determined set of generators) or individual generators. You can also influence the output file paths here.',
  writer:
    'You can configure how output files should be formatted, and optionally what extra comments should they have.',
  readerMode: 'You can configure if you want to use an in-memory document, or a remote one as the generator input.',
  readerLanguage:
    'You can configure the language of the in-memory generator input here. Valid documents will be automatically converted between the 2 possible languages.',
}

export const ConfigurationEditorWrapper: FC = () => {
  const { colorMode } = useColorMode()
  const { editorInput, configuration, setConfiguration } = useGeneratorContext()
  const isDark = colorMode === 'dark'
  const fullSegmentStyle = cx(segmentStyle, oaSegmentStyle, isDark ? darkSegmentStyle : undefined)
  const { reader, active } = configuration

  if (isNil(editorInput) || editorInput.type !== 'configuration') {
    return null
  }

  const onInlineInputLanguageChange = (language: SourceLanguage) => {
    if (reader.readerType !== 'inline') {
      return
    }
    if (language !== reader.inlineLanguage) {
      if (language === 'json') {
        try {
          setConfiguration({
            ...configuration,
            reader: {
              ...reader,
              readerType: 'inline',
              inlineContent: JSON.stringify(YAML.parse(reader.inlineContent), null, 2),
              inlineLanguage: 'json',
            },
          })
        } catch (e) {}
      } else if (language === 'yaml') {
        try {
          setConfiguration({
            ...configuration,
            reader: {
              ...reader,
              readerType: 'inline',
              inlineContent: YAML.stringify(JSON.parse(reader.inlineContent), 10000, 2),
              inlineLanguage: 'yaml',
            },
          })
        } catch (e) {}
      }
    }
  }

  return (
    <div className={containerStyle}>
      <Segment inverted={isDark} className={fullSegmentStyle} attached="top">
        <ConfigurationEditor />
      </Segment>
      <Menu attached="bottom" inverted={isDark} className={isDark ? darkBottomMenuStyle : undefined}>
        <Menu.Menu position="left">
          <Popup
            content={tooltips.reader}
            trigger={
              <Menu.Item
                active={active === 'reader'}
                onClick={() => setConfiguration({ ...configuration, active: 'reader' })}
              >
                <Icon name="book" /> Reader
              </Menu.Item>
            }
          />

          <Popup
            content={tooltips.generator}
            trigger={
              <Menu.Item
                active={active === 'generator'}
                onClick={() => setConfiguration({ ...configuration, active: 'generator' })}
              >
                <Icon name="rocket" /> Generator
              </Menu.Item>
            }
          />

          <Popup
            content={tooltips.writer}
            trigger={
              <Menu.Item
                active={active === 'writer'}
                onClick={() => setConfiguration({ ...configuration, active: 'writer' })}
              >
                <Icon name="write" /> Writer
              </Menu.Item>
            }
          />
        </Menu.Menu>
        {active === 'reader' && (
          <Menu.Menu position="right">
            {reader.readerType === 'inline' && (
              <Popup
                content={tooltips.readerLanguage}
                trigger={
                  <Dropdown item text={reader.inlineLanguage === 'json' ? 'JSON' : 'YAML'}>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        value="json"
                        active={reader.inlineLanguage === 'json'}
                        onClick={() => onInlineInputLanguageChange('json')}
                      >
                        JSON
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="yaml"
                        active={reader.inlineLanguage === 'yaml'}
                        onClick={() => onInlineInputLanguageChange('yaml')}
                      >
                        YAML
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />
            )}
            <Popup
              content={tooltips.readerMode}
              trigger={
                <Dropdown item text={reader.readerType === 'inline' ? 'Inline' : 'Remote'}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={reader.readerType === 'inline'}
                      onClick={() =>
                        setConfiguration({
                          ...configuration,
                          reader: { ...reader, readerType: 'inline' },
                          active: 'reader',
                        })
                      }
                    >
                      Inline
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={reader.readerType === 'remote'}
                      onClick={() =>
                        setConfiguration({
                          ...configuration,
                          reader: { ...reader, readerType: 'remote' },
                          active: 'reader',
                        })
                      }
                    >
                      Remote
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }
            />
          </Menu.Menu>
        )}
      </Menu>
    </div>
  )
}
