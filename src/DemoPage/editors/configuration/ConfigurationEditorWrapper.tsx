import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
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
          <Menu.Item
            disabled={isRemoteSampleLoading}
            active={active === 'reader'}
            onClick={() => setConfiguration({ ...configuration, active: 'reader' })}
          >
            <Icon name="book" /> Reader
          </Menu.Item>
          <Menu.Item
            disabled={isRemoteSampleLoading}
            active={active === 'validator'}
            onClick={() => setConfiguration({ ...configuration, active: 'validator' })}
          >
            <Icon name="search" /> Validator
          </Menu.Item>
          <Menu.Item
            disabled={isRemoteSampleLoading}
            active={active === 'generator'}
            onClick={() => setConfiguration({ ...configuration, active: 'generator' })}
          >
            <Icon name="rocket" /> Generator
          </Menu.Item>

          <Menu.Item
            disabled={isRemoteSampleLoading}
            active={active === 'writer'}
            onClick={() => setConfiguration({ ...configuration, active: 'writer' })}
          >
            <Icon name="write" /> Writer
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}
