import { css } from '@emotion/css'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'
import { LogoContainer } from './LogoContainer'
import { Logo } from './Logo'

type MobileHeaderProps = {
  name?: string
  href: string
  version: boolean
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
  font-size: ${theme.fontSize.xxl};
  cursor: pointer;
  margin: ${theme.spacing.m};
  &:hover {
    color: ${theme.colors.text};
  }
`

export const MobileHeader: FC<MobileHeaderProps> = ({ name, version, href, actionIcon: ActionIcon, onAction }) => {
  return (
    <div className={containerStyle}>
      <LogoContainer>
        <Logo name={name} version={version} href={href} />
      </LogoContainer>
      <ActionIcon className={menuButtonStyle} onClick={onAction} />
    </div>
  )
}
