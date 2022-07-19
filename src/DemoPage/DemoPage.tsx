import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { SegmentGroup } from 'semantic-ui-react'
import { GeneratorContext } from './GeneratorContext'
import { useGeneratorContext } from './useGenerator'
import { useColorMode } from '../useColorMode'
import { EditorView } from './editors/EditorView'
import { ExplorerTree } from './tree/ExplorerTree'

const segmentGroupStyle = css`
  height: calc(100vh - 86px);
`

const darkSegmentGroupStyle = css`
  background-color: #1b1c1d !important;
  border: none !important;
  border-radius: 4px !important;
  overflow: hidden !important;
`

export const DemoPage: FC = () => {
  const { colorMode } = useColorMode()
  const context = useGeneratorContext()
  const groupStyle = cx(segmentGroupStyle, colorMode === 'dark' ? darkSegmentGroupStyle : undefined)
  return (
    <GeneratorContext.Provider value={context}>
      <SegmentGroup horizontal className={groupStyle}>
        <ExplorerTree />
        <EditorView />
      </SegmentGroup>
    </GeneratorContext.Provider>
  )
}
