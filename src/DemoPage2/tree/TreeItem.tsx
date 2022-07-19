import React, { FC } from 'react'
import { useGenerator } from '../../DemoPage/useGenerator'
import { FileOrFolderNode } from '../../types'
import { useColorMode } from '../../useColorMode'
import { FileTreeItem } from './FileTreeItem'
import { FolderTreeItem } from './FolderTreeItem'

export type TreeItemProps = {
  node: FileOrFolderNode
}

export const TreeItem: FC<TreeItemProps> = ({ node }) => {
  const { explorerTreeState, editorInput, setEditorInput, setExplorerTreeState } = useGenerator()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  switch (node.type) {
    case 'file': {
      const isActive = Boolean(editorInput && editorInput.path === node.path)
      const onClick = () => setEditorInput(node)
      return <FileTreeItem isDark={isDark} name={node.name} isActive={isActive} onClick={onClick} />
    }
    case 'folder': {
      const isOpen = Boolean(explorerTreeState[node.path])
      const onClick = () => setExplorerTreeState({ ...explorerTreeState, [node.path]: !isOpen })
      return <FolderTreeItem isDark={isDark} name={node.name} isOpen={isOpen} onClick={onClick} />
    }
  }
}
