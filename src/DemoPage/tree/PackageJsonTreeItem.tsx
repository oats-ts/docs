import React, { FC } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type PackageJsonTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

const tooltip = 'This sample package.json file shows what you need to install to make this example work'

export const PackageJsonTreeItem: FC<PackageJsonTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <Popup
      content={tooltip}
      position="right center"
      trigger={
        <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
          <Icon name="file outline" /> package.json
        </div>
      }
    />
  )
}
