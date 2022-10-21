import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { theme } from '../theme'
import { breakpoints, ctnr } from '../css'
import { MenuItem } from './MenuItem'
import { MenuLogo } from './MenuLogo'

const headerStyle = css`
  label: header;
  width: 100%;
  margin: 0px;
  padding: 0px;
`

const containerStyle = css`
  label: header-content;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${theme.font.m};
`

const menuItemsContainerStyle = css`
  label: header-menu-items-container;
  display: flex;
  flex-direction: row;
  ${breakpoints.phone} {
    /* TODO */
    display: none;
  }
`

export const Header: FC = () => {
  return (
    <header className={headerStyle}>
      <div className={cx(containerStyle, ctnr)}>
        <MenuLogo />
        <ul className={menuItemsContainerStyle}>
          <MenuItem label="Home" icon={HiHome} href="#/" active={true} />
          <MenuItem label="Documentation" icon={HiDocument} href="#/documentation" />
          <MenuItem label="Configuration Editor" icon={HiCog6Tooth} href="#/" />
        </ul>
      </div>
    </header>
  )
}
