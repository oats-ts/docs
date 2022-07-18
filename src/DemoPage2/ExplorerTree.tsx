import { css } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import { GeneratorContext } from '../DemoPage/GeneratorContext'
import { ExplorerTreeState, FileNode, FileOrFolderNode, FolderNode } from '../types'

const treeItemStyle = css`
  display: flex;
  flex-direction: row;
`

const treeContentStyle = (level: number) => css`
  margin-left: ${level * 16}px;
  flex-shrink: 0;
  flex-grow: 0px;
  flex-basis: 1px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`

type ExplorerTreeNodeProps = {
  node: FileOrFolderNode
  explorerTreeState: ExplorerTreeState
  onFileClick: (file: FileNode) => void
  onFolderClick: (folder: FolderNode) => void
  level: number
}

const ExplorerTreeNode: FC<ExplorerTreeNodeProps> = ({
  node,
  level,
  explorerTreeState,
  onFileClick,
  onFolderClick,
}) => {
  const isOpen = Boolean(explorerTreeState[node.path])
  const folderIcon = isOpen ? 'chevron down' : 'chevron right'
  const icon: SemanticICONS = node.type === 'file' ? 'file code outline' : folderIcon
  const onClick = node.type === 'file' ? () => onFileClick(node) : () => onFolderClick(node)
  return (
    <>
      <div className={treeItemStyle}>
        <div className={treeContentStyle(level)} onClick={onClick}>
          <Icon name={icon} /> {node.name}
        </div>
      </div>
      {node.type === 'folder' && isOpen
        ? node.children.map((child) => (
            <ExplorerTreeNode
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
              key={child.path}
              node={child}
              level={level + 1}
              explorerTreeState={explorerTreeState}
            />
          ))
        : null}
    </>
  )
}

export const ExplorerTree: FC = () => {
  const { results, explorerTreeState, setEditorInput, setExplorerTreeState } = useContext(GeneratorContext)
  const onFileClick = (file: FileNode) => setEditorInput(file)
  const onFolderClick = (folder: FolderNode) =>
    setExplorerTreeState({ ...explorerTreeState, [folder.path]: !explorerTreeState[folder.path] })

  return (
    <div>
      {results.data.children.map((node) => (
        <ExplorerTreeNode
          key={node.path}
          node={node}
          level={0}
          onFileClick={onFileClick}
          onFolderClick={onFolderClick}
          explorerTreeState={explorerTreeState}
        />
      ))}
    </div>
  )
}
