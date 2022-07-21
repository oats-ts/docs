import React, { FC } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type ConfigurationTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

const tooltip = 'You can find all input configuration here. When opened, check the bottom tabs for more information.'

export const ConfigurationTreeItem: FC<ConfigurationTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <Popup
      content={tooltip}
      position="right center"
      trigger={
        <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
          <Icon name="cog" /> configuration
        </div>
      }
    />
  )
}
