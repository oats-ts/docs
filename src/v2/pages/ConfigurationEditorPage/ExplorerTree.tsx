import React, { FC, useContext } from 'react'
import { SideBarSection } from '../../components/SideBarSection'
import { GeneratorContext } from '../../model/GeneratorContext'
import { ExplorerTreeFsRoot } from './ExplorerTreeFsRoot'

export const ExplorerTree: FC = () => {
  const { output } = useContext(GeneratorContext)
  return (
    <>
      <SideBarSection title="Input">
        {/* <ExplorerTreeNode key="configuration" node={configuration} level={0} />
        <ExplorerTreeNode key="source" node={generatorSource} level={0} />
        <ExplorerTreeNode key="package.json" node={packageJson} level={0} /> */}
      </SideBarSection>
      <SideBarSection title="Output">
        {/* {issues.issues.length > 0 && <ExplorerTreeNode key="issues" node={issues} level={0} />} */}
        {output.children.map((node) => (
          <ExplorerTreeFsRoot key={node.path} node={node} />
        ))}
      </SideBarSection>
    </>
  )
}
