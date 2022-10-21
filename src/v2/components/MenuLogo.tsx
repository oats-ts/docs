import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Logo } from './Logo'
import { theme } from '../theme'

const logoContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`

const oatsLabelStyle = css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${theme.font.l};
  color: ${theme.colors.text};
`

type MenuLogoProps = {
  href: string
}

export const MenuLogo: FC<MenuLogoProps> = ({ href }) => {
  return (
    <a className={logoContainerStyle} href={`#${href}`}>
      <Logo width={60} />
      <h1 className={oatsLabelStyle}>Oats</h1>
    </a>
  )
}
