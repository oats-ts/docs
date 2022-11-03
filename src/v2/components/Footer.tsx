import { css } from '@emotion/css'
import React, { FC } from 'react'
import { SvgLogo } from './SvgLogo'
import { theme } from '../theme'
import { Link } from './Link'
import { links } from '../links'

const footerStyle = css`
  label: footer;
  background-color: ${theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.m};
  gap: ${theme.spacing.m};
`

const copyrightLabel = css`
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.muted};
`

const licenseLabel = css`
  font-size: ${theme.fontSize.s};
  color: ${theme.colors.muted};
`

const logoContainerStyle = css`
  display: flex;
  gap: ${theme.spacing.s};
  align-items: center;
  text-decoration: none;
  margin-bottom: ${theme.spacing.xxm};
`

const oatsLabelStyle = css`
  font-weight: 700;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
  font-size: ${theme.fontSize.l};
  color: ${theme.colors.muted};
`

export const Footer: FC = () => {
  return (
    <footer className={footerStyle}>
      <a className={logoContainerStyle} href={links.index()}>
        <SvgLogo width={60} color={theme.colors.muted} />
        <h1 className={oatsLabelStyle}>Oats</h1>
      </a>
      <span className={copyrightLabel}>Copyright &#169; 2022 Balázs Édes</span>
      <span className={licenseLabel}>
        All Oats modules under the <Link href="https://opensource.org/licenses/MIT">MIT license</Link>
      </span>
    </footer>
  )
}
