import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type FolderTreeItemProps = {
  name: string
  isDark: boolean
  isActive: boolean
  isInline: boolean
  onClick: () => void
}

export const OpenAPIInputTreeItem: FC<FolderTreeItemProps> = ({ name, isInline, isDark, isActive, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name={isInline ? 'file code outline' : 'globe'} /> {name}
    </div>
  )
}
