import { css, cx } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { Segment } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'
import { useColorMode } from '../../useColorMode'
import { darkSegmentStyle } from '../commonStyles'
import { ExplorerTreeNode } from './ExplorerTreeNode'
import { TreeHeader } from './TreeHeader'
import { TreeSection } from './TreeSection'

const baseStyle = css`
  min-width: 250px !important;
  max-width: 250px !important;
  width: 250px !important;
  padding: 0px !important;
  height: 100%;
  overflow: auto;
`

export const ExplorerTree: FC = () => {
  const { output, configuration, issues, isLoading } = useContext(GeneratorContext)
  const { colorMode } = useColorMode()
  const explorerTreeStyle = cx(baseStyle, colorMode === 'dark' ? darkSegmentStyle : undefined)
  return (
    <Segment loading={isLoading} inverted={colorMode === 'dark'} className={explorerTreeStyle}>
      <TreeSection>
        <TreeHeader label="Input" />
        <ExplorerTreeNode key="configuration" node={configuration} level={0} />
        <ExplorerTreeNode key="issues" node={issues} level={0} />
      </TreeSection>
      <TreeSection>
        <TreeHeader label="Output" />
        {output.children.map((node) => (
          <ExplorerTreeNode key={node.path} node={node} level={0} />
        ))}
      </TreeSection>
    </Segment>
  )
}
