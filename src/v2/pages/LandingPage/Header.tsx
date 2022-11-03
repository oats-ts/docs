import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { containerStyle } from '../../components/containerStyle'
import { theme } from '../../theme'
import { breakpoints } from '../../breakpoints'
import { Logo } from '../../components/Logo'
import { LandingPageMenu } from './LandingPageMenu'
import { links } from '../../links'

const headerStyle = css`
  label: header;
  width: 100%;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
  @media ${breakpoints.phone} {
    display: none;
  }
`

const headerContentStyle = css`
  label: header-content;
  height: ${theme.spacing.xxh};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Header: FC = () => {
  return (
    <header className={headerStyle}>
      <div className={cx(headerContentStyle, containerStyle)}>
        <Logo version={false} href={links.index()} />
        <LandingPageMenu />
      </div>
    </header>
  )
}
