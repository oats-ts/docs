import React, { FC } from 'react'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { MenuBar } from '../../components/MenuBar'
import { MenuItem } from '../../components/MenuItem'

export const LandingPageMenu: FC = () => {
  return (
    <MenuBar>
      <MenuItem label="Home" icon={HiHome} href="#/" active={true} />
      <MenuItem label="Documentation" icon={HiDocument} href="#/documentation" />
      <MenuItem label="Editor" icon={HiCog6Tooth} href="#/editor" />
    </MenuBar>
  )
}
