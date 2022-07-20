import React, { FC } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type IssuesTreeItemProps = {
  name: string
  isActive: boolean
  isDark: boolean
  isOk: boolean
  onClick: () => void
}

const tooltip = 'You can find all issues that happened during code generation here.'

export const IssuesTreeItem: FC<IssuesTreeItemProps> = ({ name, isActive, isDark, isOk, onClick }) => {
  return (
    <Popup
      content={tooltip}
      position="right center"
      trigger={
        <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
          <Icon name={isOk ? 'check circle outline' : 'exclamation triangle'} /> {name}
        </div>
      }
    />
  )
}
