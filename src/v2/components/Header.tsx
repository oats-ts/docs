import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { MenuItem } from './MenuItem'
import { MenuLogo } from './MenuLogo'
import { MenuBar } from './MenuBar'
import { containerStyle } from './containerStyle'
import { theme } from '../theme'

const headerStyle = css`
  label: header;
  width: 100%;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.zero};
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
        <MenuLogo />
        <MenuBar>
          <MenuItem label="Home" icon={HiHome} href="#/" active={true} />
          <MenuItem label="Documentation" icon={HiDocument} href="#/documentation" />
          <MenuItem label="Editor" icon={HiCog6Tooth} href="#/editor" />
        </MenuBar>
      </div>
    </header>
  )
}
