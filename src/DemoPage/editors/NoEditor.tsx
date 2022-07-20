import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'

export type NoEditorProps = {
  isDark: boolean
  isLoading: boolean
}

const noEditorStyle = css`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
`

export const NoEditor: FC<NoEditorProps> = ({ isDark, isLoading }) => {
  const fullSegmentStyle = cx(noEditorStyle, segmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment loading={isLoading} inverted={isDark} className={fullSegmentStyle}>
      <Header icon>
        <Icon name="file code outline" />
        No editor open. Use the explorer on the left!
      </Header>
    </Segment>
  )
}
