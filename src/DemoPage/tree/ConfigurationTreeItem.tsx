import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type InputTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

export const InputTreeItem: FC<InputTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name="file code outline" /> generate.ts
    </div>
  )
}
