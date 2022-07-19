import { css } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { GeneratorContext } from '../../DemoPage/GeneratorContext'
import { FileOrFolderNode } from '../../types'
import { TreeItem } from './TreeItem'

const treeItemContainerStyle = (level: number) => css`
  display: flex;
  flex-direction: row;
  padding-left: ${level * 16}px;
`

type ExplorerTreeNodeProps = {
  node: FileOrFolderNode
  level: number
}

export const ExplorerTreeNode: FC<ExplorerTreeNodeProps> = ({ node, level }) => {
  const { explorerTreeState } = useContext(GeneratorContext)
  const isOpen = node.type === 'folder' && Boolean(explorerTreeState[node.path])
  return (
    <>
      <div className={treeItemContainerStyle(level)}>
        <TreeItem node={node} />
      </div>
      {isOpen
        ? node.children.map((child) => <ExplorerTreeNode key={child.path} node={child} level={level + 1} />)
        : null}
    </>
  )
}
