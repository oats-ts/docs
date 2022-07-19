import React, { FC } from 'react'
import { useGenerator } from '../model/useGenerator'
import { EditorInput } from '../../types'
import { useColorMode } from '../../useColorMode'
import { FileTreeItem } from './FileTreeItem'
import { FolderTreeItem } from './FolderTreeItem'
import { OpenAPIInputTreeItem } from './OpenAPIInputTreeItem'
import { IssuesTreeItem } from './IssuesTreeItem'
import { isOk } from '@oats-ts/validators'

export type TreeItemProps = {
  node: EditorInput
}

function computeNameForUri(uri: string) {
  const parts = uri.split('/')
  if (uri.length === 0) {
    return 'unknown'
  }
  if (parts.length < 2) {
    return uri
  }
  return `/${parts[parts.length - 1]}`
}

export const TreeItem: FC<TreeItemProps> = ({ node }) => {
  const { explorerTreeState, editorInput, setEditorInput, setExplorerTreeState } = useGenerator()
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
    case 'inline-openapi': {
      const isActive = Boolean(editorInput && editorInput.type === 'inline-openapi')
      const name = `openapi.${node.language}`
      return (
        <OpenAPIInputTreeItem
          onClick={defaultOnClick}
          isDark={isDark}
          isInline={true}
          isActive={isActive}
          name={name}
        />
      )
    }
    case 'remote-openapi': {
      const isActive = Boolean(editorInput && editorInput.type === 'remote-openapi')
      const name = computeNameForUri(node.path)
      return (
        <OpenAPIInputTreeItem
          onClick={defaultOnClick}
          isDark={isDark}
          isInline={false}
          isActive={isActive}
          name={name}
        />
      )
    }
    case 'issues': {
      const isActive = Boolean(editorInput && editorInput.type === 'issues')
      const _isOk = isOk(node.issues, ['error'])
      const name = `issues (${node.issues.length})`
      return <IssuesTreeItem onClick={defaultOnClick} isDark={isDark} isActive={isActive} isOk={_isOk} name={name} />
    }
  }
}
