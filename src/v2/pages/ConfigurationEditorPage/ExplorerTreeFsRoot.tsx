import React, { FC, useContext } from 'react'
import { FsNode } from '../../../types'
import { GeneratorContext } from '../../model/GeneratorContext'
import { TreeNode } from '../../components/TreeNode'

export type ExplorerTreeFsRootProps = {
  node: FsNode
}

export const ExplorerTreeFsRoot: FC<ExplorerTreeFsRootProps> = ({ node }) => {
  const { explorerTreeState, editorInput, setEditorInput, setExplorerTreeState } = useContext(GeneratorContext)
  const isOpen = (n: FsNode) => n.type === 'folder' && Boolean(explorerTreeState[node.path])
  const isActive = (n: FsNode) => editorInput?.type === 'file' && editorInput?.path === n.path
  const isContainer = (n: FsNode) => n.type === 'folder'
  const getChildren = (n: FsNode) => (n.type === 'folder' ? n.children : [])
  const getLabel = (n: FsNode) => n.name
  const onClick = (n: FsNode, isOpen: boolean) => {
    switch (n.type) {
      case 'file':
        return setEditorInput(`file::${n.path}`)
      case 'folder':
        return setExplorerTreeState({ ...explorerTreeState, [n.path]: !isOpen })
    }
  }

  return (
    <TreeNode
      value={node}
      level={0}
      getLabel={getLabel}
      isOpen={isOpen}
      isContainer={isContainer}
      getChildren={getChildren}
      isActive={isActive}
      onClick={onClick}
    />
  )
}
