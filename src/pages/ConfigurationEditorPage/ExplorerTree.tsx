import React, { FC, useContext } from 'react'
import { Button } from '../../components/Button'
import { MenuTreeItem } from '../../components/MenuTreeItem'
import { SideBarSection } from '../../components/SideBarSection'
import { GeneratorContext } from '../../model/GeneratorContext'
import { FsNode } from '../../types'
import { ExplorerTreeItem } from './ExplorerTreeItem'

function getExpandedTreeState(node: FsNode, state: Record<string, boolean>): Record<string, boolean> {
  if (node.type === 'folder') {
    state[node.path] = true
    node.children.forEach((child) => getExpandedTreeState(child, state))
  }
  return state
}

export const ExplorerTree: FC = () => {
  const { output, configuration, generatorSource, packageJson, issues, setExplorerTreeState } =
    useContext(GeneratorContext)

  const onCollapse = () => setExplorerTreeState({})
  const onExpand = () => setExplorerTreeState(getExpandedTreeState(output, {}))

  return (
    <>
      <SideBarSection>
        <MenuTreeItem link="index" />
        <MenuTreeItem link="docs" />
      </SideBarSection>
      <SideBarSection title="Input">
        <ExplorerTreeItem key="configuration" value={configuration} />
        <ExplorerTreeItem key="source" value={generatorSource} />
        <ExplorerTreeItem key="package.json" value={packageJson} />
      </SideBarSection>
      <SideBarSection
        title="Output"
        attachment={
          <>
            <Button variant="secondary" size="mini" onClick={onCollapse} title="Collapse all">
              Collapse
            </Button>
            <Button variant="secondary" size="mini" onClick={onExpand} title="Expand all">
              Expand
            </Button>
          </>
        }
      >
        <ExplorerTreeItem key="issues" value={issues} />
        {output.children.map((node) => (
          <ExplorerTreeItem key={node.path} value={node} />
        ))}
      </SideBarSection>
    </>
  )
}
