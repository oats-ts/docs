import { css } from '@emotion/css'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'
import { SideBarLogo } from './SideBarLogo'

type MobileHeaderProps = {
  name: string
  actionIcon: IconType
  onAction: () => void
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const menuButtonStyle = css`
  color: ${theme.colors.muted};
  font-size: 40px;
  cursor: pointer;
  margin: 14px;
  &:hover {
    color: ${theme.colors.text};
  }
`

export const MobileHeader: FC<MobileHeaderProps> = ({ name, actionIcon: ActionIcon, onAction }) => {
  return (
    <div className={containerStyle}>
      <SideBarLogo name={name} />
      <ActionIcon className={menuButtonStyle} onClick={onAction} />
    </div>
  )
}
