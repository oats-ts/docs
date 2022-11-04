import React, { FC, useContext } from 'react'
import { HomeTreeRoot } from '../../components/HomeTreeRoot'
import { SideBarSection } from '../../components/SideBarSection'
import { GeneratorContext } from '../../model/GeneratorContext'
import { ExplorerTreeItem } from './ExplorerTreeItem'

export const ExplorerTree: FC = () => {
  const { output, configuration, generatorSource, packageJson, issues } = useContext(GeneratorContext)
  return (
    <>
      <SideBarSection>
        <HomeTreeRoot />
      </SideBarSection>
      <SideBarSection title="Input">
        <ExplorerTreeItem key="configuration" value={configuration} />
        <ExplorerTreeItem key="source" value={generatorSource} />
        <ExplorerTreeItem key="package.json" value={packageJson} />
      </SideBarSection>
      <SideBarSection title="Output">
        <ExplorerTreeItem key="issues" value={issues} />
        {output.children.map((node) => (
          <ExplorerTreeItem key={node.path} value={node} />
        ))}
      </SideBarSection>
    </>
  )
}
