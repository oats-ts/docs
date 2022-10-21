import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Logo } from '../../Logo'
import { theme } from '../theme'
import { Link } from './Link'

const footerStyle = css`
  background-color: ${theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 10px;
`

const copyrightLabel = css`
  font-size: ${theme.font.m};
  color: ${theme.colors.muted};
`

const licenseLabel = css`
  font-size: ${theme.font.s};
  color: ${theme.colors.muted};
`

const logoContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`

const oatsLabelStyle = css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${theme.font.l};
  color: ${theme.colors.muted};
`

export const Footer: FC = () => {
  return (
    <footer className={footerStyle}>
      <a className={logoContainerStyle} href="#">
        <Logo width={60} color={theme.colors.muted} />
        <h1 className={oatsLabelStyle}>Oats</h1>
      </a>
      <span className={copyrightLabel}>Copyright &#169; 2022 Balázs Édes</span>
      <span className={licenseLabel}>
        All Oats modules under the <Link href="https://opensource.org/licenses/MIT">MIT license</Link>
      </span>
    </footer>
  )
}
