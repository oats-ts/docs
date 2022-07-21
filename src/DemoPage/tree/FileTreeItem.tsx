import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type FileTreeItemProps = {
  name: string
  isActive: boolean
  isDark: boolean
  onClick: () => void
}

export const FileTreeItem: FC<FileTreeItemProps> = ({ name, isActive, isDark, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name="file outline" /> {name}
    </div>
  )
}
