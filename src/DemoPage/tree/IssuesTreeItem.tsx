import React, { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import { treeItemStyle } from './commonStyles'

export type IssuesTreeItemProps = {
  name: string
  isActive: boolean
  isDark: boolean
  isOk: boolean
  onClick: () => void
}

export const IssuesTreeItem: FC<IssuesTreeItemProps> = ({ name, isActive, isDark, isOk, onClick }) => {
  return (
    <div className={treeItemStyle(isActive, isDark)} onClick={onClick}>
      <Icon name={isOk ? 'check circle outline' : 'exclamation triangle'} /> {name}
    </div>
  )
}
