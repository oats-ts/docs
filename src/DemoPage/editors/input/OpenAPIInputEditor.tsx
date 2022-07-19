import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { Dropdown, Menu, Segment } from 'semantic-ui-react'
import { OpenAPIInputNode, SourceLanguage } from '../../../types'
import { darkBottomMenuStyle, darkSegmentStyle, segmentStyle } from '../../commonStyles'
import { InlineInputEditor } from './InlineInputEditor'
import { RemoteInputEditor } from './RemoteInputEditor'

type OpenAPIInputEditorProps = {
  isDark: boolean
  input: OpenAPIInputNode
  samples: string[]
  onChange: (node: OpenAPIInputNode) => void
  onSourceTypeChange: (type: OpenAPIInputNode['type']) => void
  onInlineInputLanguageChange: (type: SourceLanguage) => void
}

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

export const OpenAPIInputEditor: FC<OpenAPIInputEditorProps> = ({
  input,
  samples,
  isDark,
  onChange,
  onSourceTypeChange,
  onInlineInputLanguageChange,
}) => {
  const fullSegmentStyle = cx(segmentStyle, oaSegmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <div className={containerStyle}>
      <Segment inverted={isDark} className={fullSegmentStyle} attached="top">
        {input.type === 'inline-openapi' ? (
          <InlineInputEditor input={input} isDark={isDark} onChange={onChange} />
        ) : (
          <RemoteInputEditor input={input} isDark={isDark} onChange={onChange} samples={samples} />
        )}
      </Segment>
      <Menu attached="bottom" inverted={isDark} className={isDark ? darkBottomMenuStyle : undefined}>
        <Menu.Item
          name="Inline"
          icon="file code outline"
          active={input.type === 'inline-openapi'}
          onClick={() => onSourceTypeChange('inline-openapi')}
        />
        <Menu.Item
          name="Remote"
          icon="globe"
          active={input.type === 'remote-openapi'}
          onClick={() => onSourceTypeChange('remote-openapi')}
        />
        {input.type === 'inline-openapi' ? (
          <Menu.Menu position="right">
            <Dropdown item text={input.language === 'json' ? 'JSON' : 'YAML'}>
              <Dropdown.Menu>
                <Dropdown.Item
                  value="json"
                  active={input.language === 'json'}
                  onClick={() => onInlineInputLanguageChange('json')}
                >
                  JSON
                </Dropdown.Item>
                <Dropdown.Item
                  value="yaml"
                  active={input.language === 'yaml'}
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
