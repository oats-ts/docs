import React, { FC } from 'react'
import { useGeneratorContext } from '../model/useGenerator'
import { EditorInput } from '../../types'
import { useColorMode } from '../../useColorMode'
import { FileTreeItem } from './FileTreeItem'
import { FolderTreeItem } from './FolderTreeItem'
import { ConfigurationTreeItem } from './ConfigurationTreeItem'
import { IssuesTreeItem } from './IssuesTreeItem'
import { isOk } from '@oats-ts/validators'
import { GeneratorSourceTreeItem } from './GeneratorSourceTreeItem'
import { PackageJsonTreeItem } from './PackageJsonTreeItem'

export type TreeItemProps = {
  node: EditorInput
}

export const TreeItem: FC<TreeItemProps> = ({ node }) => {
  const { explorerTreeState, editorInput, setEditorInput, setExplorerTreeState } = useGeneratorContext()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const defaultOnClick = () => setEditorInput(node)

  switch (node.type) {
    case 'file': {
      const isActive = Boolean(editorInput && editorInput.type === 'file' && editorInput.path === node.path)
      return <FileTreeItem isDark={isDark} name={node.name} isActive={isActive} onClick={defaultOnClick} />
    }
    case 'folder': {
      const isOpen = Boolean(explorerTreeState[node.path])
      const onClick = () => setExplorerTreeState({ ...explorerTreeState, [node.path]: !isOpen })
      return <FolderTreeItem isDark={isDark} name={node.name} isOpen={isOpen} onClick={onClick} />
    }
    case 'configuration': {
      const isActive = Boolean(editorInput && editorInput.type === 'configuration')
      return <ConfigurationTreeItem onClick={defaultOnClick} isDark={isDark} isActive={isActive} />
    }
    case 'generator-source': {
      const isActive = Boolean(editorInput && editorInput.type === 'generator-source')
      return <GeneratorSourceTreeItem onClick={defaultOnClick} isDark={isDark} isActive={isActive} />
    }
    case 'package-json': {
      const isActive = Boolean(editorInput && editorInput.type === 'package-json')
      return <PackageJsonTreeItem onClick={defaultOnClick} isDark={isDark} isActive={isActive} />
    }
    case 'issues': {
      const isActive = Boolean(editorInput && editorInput.type === 'issues')
      const _isOk = isOk(node.issues, ['error'])
      const name = `issues (${node.issues.length})`
      return <IssuesTreeItem onClick={defaultOnClick} isDark={isDark} isActive={isActive} isOk={_isOk} name={name} />
    }
  }
}
