import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { theme } from '../../theme'
import { ctnr } from '../css'
import { MenuItem } from './MenuItem'
import { MenuLogo } from './MenuLogo'

const menuStyle = css`
  width: 100%;
  height: 80px;
  margin: 0px;
  padding: 0px;
`

const menuContentContainerStyle = css`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${theme.font.text};
`

const menuItemsContainerStyle = css`
  display: flex;
  flex-direction: row;
`

export const Menu: FC = () => {
  return (
    <header className={menuStyle}>
      <div className={cx(menuContentContainerStyle, ctnr)}>
        <MenuLogo href="" />
        <ul className={menuItemsContainerStyle}>
          <MenuItem label="Home" icon={HiHome} href="" active={true} />
          <MenuItem label="Documentation" icon={HiDocument} href="" />
          <MenuItem label="Editor" icon={HiCog6Tooth} href="" />
        </ul>
      </div>
    </header>
  )
}
