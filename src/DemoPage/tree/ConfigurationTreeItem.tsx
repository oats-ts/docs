import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type ConfigurationTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

export const ConfigurationTreeItem: FC<ConfigurationTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name="cog" /> configuration
    </div>
  )
}
