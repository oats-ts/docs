import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type FolderTreeItemProps = {
  name: string
  isOpen: boolean
  isDark: boolean
  onClick: () => void
}

export const FolderTreeItem: FC<FolderTreeItemProps> = ({ name, isOpen, isDark, onClick }) => {
  return (
    <div className={treeItemStyle(false, isDark)} onClick={onClick}>
      <Icon name={isOpen ? 'chevron down' : 'chevron right'} /> {name}
    </div>
  )
}
