import React, { FC } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type GeneratorSourceTreeItemProps = {
  isDark: boolean
  isActive: boolean
  onClick: () => void
}

const tooltip = 'You can use this source code to generate the same result, as what you see in the file explorer'

export const GeneratorSourceTreeItem: FC<GeneratorSourceTreeItemProps> = ({ isDark, isActive, onClick }) => {
  return (
    <Popup
      content={tooltip}
      position="right center"
      trigger={
        <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
          <Icon name="file code outline" /> generate.ts
        </div>
      }
    />
  )
}
