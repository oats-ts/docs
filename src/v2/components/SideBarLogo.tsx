import { css } from '@emotion/css'
import { version } from '@oats-ts/oats-ts'
import React, { FC } from 'react'
import { breakpoints } from '../breakpoints'
import { theme } from '../theme'
import { Logo } from './Logo'

export type SideBarLogoProps = {
  name: string
}

const logoContainerStyle = css`
  label: side-bar-logo;
  display: flex;
  gap: ${theme.spacing.m};
  align-items: center;
  text-decoration: none;
  margin: ${theme.spacing.m} ${theme.spacing.m} 40px ${theme.spacing.m};
  @media ${breakpoints.phone} {
    margin: ${theme.spacing.m};
  }
`

const labelWrapperStyle = css`
  display: flex;
  flex-direction: column;
`

const oatsLabelStyle = css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
  font-size: ${theme.fontSize.l};
  color: ${theme.colors.text};
`

const docLabelStyle = css`
  color: ${theme.colors.muted};
`

const versionLabelStyle = css`
  font-size: ${theme.fontSize.s};
  color: ${theme.colors.muted};
`

export const SideBarLogo: FC<SideBarLogoProps> = ({ name }) => {
  return (
    <a className={logoContainerStyle} href="#">
      <Logo width={60} />
      <div className={labelWrapperStyle}>
        <h1 className={oatsLabelStyle}>
          Oats <span className={docLabelStyle}>{name}</span>
        </h1>
        <span className={versionLabelStyle}>v{version}</span>
      </div>
    </a>
  )
}
