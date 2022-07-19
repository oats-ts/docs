import { css, cx } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { Segment } from 'semantic-ui-react'
import { GeneratorContext } from '../../DemoPage/GeneratorContext'
import { useColorMode } from '../../useColorMode'
import { darkSegmentStyle } from '../commonStyles'
import { ExplorerTreeNode } from './ExplorerTreeNode'

const baseStyle = css`
  min-width: 250px !important;
  max-width: 250px !important;
  width: 250px !important;
  height: 100%;
  overflow: auto;
`

export const ExplorerTree: FC = () => {
  const { results } = useContext(GeneratorContext)
  const { colorMode } = useColorMode()
  const explorerTreeStyle = cx(baseStyle, colorMode === 'dark' ? darkSegmentStyle : undefined)
  return (
    <Segment loading={results.status === 'working'} inverted={colorMode === 'dark'} className={explorerTreeStyle}>
      {results.data.children.map((node) => (
        <ExplorerTreeNode key={node.path} node={node} level={0} />
      ))}
    </Segment>
  )
}
