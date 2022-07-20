import { cx } from '@emotion/css'
import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { FileNode } from '../../types'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

type ReadonlyTypescriptEditorProps = {
  isLoading: boolean
  isDark: boolean
  input: FileNode
}

export const ReadonlyTypescriptEditor: FC<ReadonlyTypescriptEditorProps> = ({ input, isLoading, isDark }) => {
  const fullSegmentStyle = cx(segmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment loading={isLoading} inverted={isDark} className={fullSegmentStyle}>
      <ReadonlyTypescriptMonaco height="100%" isDark={isDark} path={input.path} value={input.content} />
    </Segment>
  )
}
