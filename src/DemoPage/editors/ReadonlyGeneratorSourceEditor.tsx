import { cx } from '@emotion/css'
import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

const HeightSub = 130

type ReadonlyGeneratorSourceEditorProps = {
  isDark: boolean
  source: string
}

export const ReadonlyGeneratorSourceEditor: FC<ReadonlyGeneratorSourceEditorProps> = ({
  source,
  isDark,
}) => {
  const fullSegmentStyle = cx(segmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment inverted={isDark} className={fullSegmentStyle}>
      <ReadonlyTypescriptMonaco
        height={`calc(100vh - ${HeightSub}px)`}
        isDark={isDark}
        path={'generate.ts'}
        value={source}
      />
    </Segment>
  )
}
