import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type GeneratorSourceTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

export const GeneratorSourceTreeItem: FC<GeneratorSourceTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name="file outline" /> generate.ts
    </div>
  )
}
