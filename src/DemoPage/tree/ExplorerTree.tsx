import { css, cx } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { Input, Segment } from 'semantic-ui-react'
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
  margin-right: 1px !important;
`

const darkBorderStyle = css`
  border-right: 1px solid #383738 !important;
`

const searchStyle = css`
  margin-bottom: 16px !important;
`

export const ExplorerTree: FC = () => {
  const { output, configuration, issues, isLoading, generatorSource, packageJson, setTreeFilter } =
    useContext(GeneratorContext)
  const { colorMode } = useColorMode()
  const explorerTreeStyle = cx(baseStyle, ...(colorMode === 'dark' ? [darkSegmentStyle, darkBorderStyle] : []))
  return (
    <Segment loading={isLoading} inverted={colorMode === 'dark'} className={explorerTreeStyle}>
      <TreeSection>
        <TreeHeader label="Input" />
        <ExplorerTreeNode key="configuration" node={configuration} level={0} />
        <ExplorerTreeNode key="source" node={generatorSource} level={0} />
        <ExplorerTreeNode key="package.json" node={packageJson} level={0} />
      </TreeSection>
      <TreeSection>
        <Input
          size="mini"
          icon="search"
          fluid
          className={searchStyle}
          placeholder="Search..."
          onChange={(_: any, { value }) => setTreeFilter(value ?? '')}
        />
        <TreeHeader label="Output" />
        {issues.issues.length > 0 && <ExplorerTreeNode key="issues" node={issues} level={0} />}
        {output.children.map((node) => (
          <ExplorerTreeNode key={node.path} node={node} level={0} />
        ))}
      </TreeSection>
    </Segment>
  )
}
