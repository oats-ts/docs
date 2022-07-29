import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type PackageJsonTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

export const PackageJsonTreeItem: FC<PackageJsonTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name="file outline" /> package.json
    </div>
  )
}
