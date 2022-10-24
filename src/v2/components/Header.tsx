import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { ctnr } from '../css'
import { MenuItem } from './MenuItem'
import { MenuLogo } from './MenuLogo'
import { MenuBar } from './MenuBar'

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
`

export const Header: FC = () => {
  return (
    <header className={headerStyle}>
      <div className={cx(containerStyle, ctnr)}>
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
