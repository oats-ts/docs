import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { Icon, Menu, Popup, Segment } from 'semantic-ui-react'
import { useColorMode } from '../../../useColorMode'
import { darkSegmentStyle, segmentStyle } from '../../commonStyles'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor'
import { SourceMenu } from './SourceMenu'

const containerStyle = css`
  position: relative;
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

const menuStyle = css`
  border-top: 1px solid #383738 !important;
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
  const { editorInput, configuration, isRemoteSampleLoading, setConfiguration } = useGeneratorContext()
  const isDark = colorMode === 'dark'
  const fullSegmentStyle = cx(segmentStyle, oaSegmentStyle, isDark ? darkSegmentStyle : undefined)
  const { active } = configuration

  if (isNil(editorInput) || editorInput.type !== 'configuration') {
    return null
  }

  return (
    <div className={containerStyle}>
      <SourceMenu />
      <Segment inverted={isDark} className={fullSegmentStyle} loading={isRemoteSampleLoading} attached>
        <ConfigurationEditor />
      </Segment>
      <Menu attached="bottom" inverted={isDark} className={isDark ? menuStyle : undefined}>
        <Menu.Menu position="left">
          <Popup
            content={tooltips.reader}
            trigger={
              <Menu.Item
                disabled={isRemoteSampleLoading}
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
                disabled={isRemoteSampleLoading}
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
                disabled={isRemoteSampleLoading}
                active={active === 'writer'}
                onClick={() => setConfiguration({ ...configuration, active: 'writer' })}
              >
                <Icon name="write" /> Writer
              </Menu.Item>
            }
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
}
