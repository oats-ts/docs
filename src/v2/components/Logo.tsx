import { css } from '@emotion/css'
import { version as oatsVersion } from '@oats-ts/oats-ts'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { theme } from '../theme'
import { SvgLogo } from './SvgLogo'

export type LogoProps = {
  name?: string
  version: boolean
}

const logoContainerStyle = css`
  label: side-bar-logo;
  display: flex;
  gap: ${theme.spacing.m};
  align-items: center;
  text-decoration: none;
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

export const Logo: FC<LogoProps> = ({ name, version }) => {
  return (
    <a className={logoContainerStyle} href="#">
      <SvgLogo width={60} />
      <div className={labelWrapperStyle}>
        <h1 className={oatsLabelStyle}>Oats {isNil(name) ? null : <span className={docLabelStyle}>{name}</span>}</h1>
        {version && <span className={versionLabelStyle}>v{oatsVersion}</span>}
      </div>
    </a>
  )
}
